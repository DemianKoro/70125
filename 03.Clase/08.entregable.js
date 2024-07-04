class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Validar que todos los campos sean obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        // Validar que no se repita el campo "code"
        if (this.products.some(product => product.code === code)) {
            console.error(`El código ${code} ya existe.`);
            return;
        }

        // Crear el producto con id autoincrementable
        const id = this.products.length + 1;
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error("Not found");
            return null;
        }
    }
}

// Ejemplo de uso
const productManager = new ProductManager();

productManager.addProduct("Producto 1", "Descripción del Producto 1", 100, "ruta/imagen1.jpg", "abc123", 10);
productManager.addProduct("Producto 2", "Descripción del Producto 2", 200, "ruta/imagen2.jpg", "def456", 20);

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(3)); // Esto debería mostrar "Not found"
