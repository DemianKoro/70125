const ProductManager = require('./ProductManager');
const manager = new ProductManager('./products.json');

async function testProductManager() {
  console.log('Añadiendo libros de ciencia ficción...');
  await manager.addProduct({ title: 'Dune', description: 'Epic science fiction novel by Frank Herbert', price: 20, thumbnail: 'dune.jpg', code: 'scifi001', stock: 100 });
  await manager.addProduct({ title: 'Neuromancer', description: 'Cyberpunk novel by William Gibson', price: 15, thumbnail: 'neuromancer.jpg', code: 'scifi002', stock: 80 });
  await manager.addProduct({ title: 'Foundation', description: 'Science fiction series by Isaac Asimov', price: 25, thumbnail: 'foundation.jpg', code: 'scifi003', stock: 50 });
  await manager.addProduct({ title: 'Snow Crash', description: 'Science fiction novel by Neal Stephenson', price: 18, thumbnail: 'snowcrash.jpg', code: 'scifi004', stock: 70 });
  await manager.addProduct({ title: 'The Left Hand of Darkness', description: 'Science fiction novel by Ursula K. Le Guin', price: 22, thumbnail: 'lefthand.jpg', code: 'scifi005', stock: 60 });
  await manager.addProduct({ title: 'Hyperion', description: 'Science fiction novel by Dan Simmons', price: 20, thumbnail: 'hyperion.jpg', code: 'scifi006', stock: 90 });

  console.log('Libros añadidos.');

  console.log('Obteniendo todos los libros...');
  const products = await manager.getProducts();
  console.log(products);

  console.log('Obteniendo libro por ID...');
  const product = await manager.getProductById(1);
  console.log(product);

  console.log('Actualizando libro...');
  await manager.updateProduct(1, { price: 30 });
  const updatedProduct = await manager.getProductById(1);
  console.log(updatedProduct);

  console.log('Eliminando libro...');
  await manager.deleteProduct(2);
  const remainingProducts = await manager.getProducts();
  console.log(remainingProducts);
}

testProductManager();

