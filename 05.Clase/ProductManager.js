const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(product) {
    const products = await this.getProducts();
    product.id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push(product);
    await this.saveProducts(products);
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(product => product.id === id);
  }

  async updateProduct(id, updatedProduct) {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      await this.saveProducts(products);
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    await this.saveProducts(updatedProducts);
  }

  async saveProducts(products) {
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
  }
}

module.exports = ProductManager;
