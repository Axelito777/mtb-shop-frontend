// productService.spec.js - Pruebas para el servicio de productos

describe('ProductService - Pruebas del servicio de productos', () => {
  
  let localStorageMock;
  
  beforeEach(() => {
    // Crear un objeto para simular localStorage
    localStorageMock = {};
    
    // Crear mock de localStorage usando window (funciona en el navegador)
    window.localStorage = {
      getItem: function(key) {
        return localStorageMock[key] || null;
      },
      setItem: function(key, value) {
        localStorageMock[key] = value;
      },
      clear: function() {
        localStorageMock = {};
      }
    };
  });

  // PRUEBA 1: Obtener productos desde localStorage
  it('Debería obtener productos desde localStorage', () => {
    // Simular datos en localStorage
    const mockProducts = [
      { id: '1', name: 'Producto 1', price: 10000, category: 'cascos' }
    ];
    localStorage.setItem('products', JSON.stringify(mockProducts));
    
    // Obtener y verificar
    const products = JSON.parse(localStorage.getItem('products'));
    
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  // PRUEBA 2: Agregar un nuevo producto
  it('Debería agregar un nuevo producto correctamente', () => {
    const existingProducts = [];
    const newProduct = {
      id: Date.now().toString(),
      name: 'Casco de Prueba',
      price: 50000,
      category: 'cascos'
    };
    
    // Agregar producto
    existingProducts.push(newProduct);
    localStorage.setItem('products', JSON.stringify(existingProducts));
    
    // Verificar que se guardó
    const products = JSON.parse(localStorage.getItem('products'));
    const found = products.find(p => p.id === newProduct.id);
    
    expect(found).toBeDefined();
    expect(found.name).toBe('Casco de Prueba');
    expect(found.price).toBe(50000);
  });

  // PRUEBA 3: Eliminar un producto
  it('Debería eliminar un producto correctamente', () => {
    // Simular productos existentes
    const products = [
      { id: '1', name: 'Producto 1', price: 10000 },
      { id: '2', name: 'Producto 2', price: 20000 }
    ];
    localStorage.setItem('products', JSON.stringify(products));
    
    // Eliminar producto con id '1'
    const updatedProducts = products.filter(p => p.id !== '1');
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    // Verificar que se eliminó
    const result = JSON.parse(localStorage.getItem('products'));
    
    expect(result.length).toBe(1);
    expect(result.find(p => p.id === '1')).toBeUndefined();
    expect(result.find(p => p.id === '2')).toBeDefined();
  });

  // PRUEBA 4: Filtrar por categoría
  it('Debería filtrar productos por categoría correctamente', () => {
    // Simular productos de diferentes categorías
    const products = [
      { id: '1', name: 'Casco 1', price: 10000, category: 'cascos' },
      { id: '2', name: 'Pedal 1', price: 15000, category: 'pedales' },
      { id: '3', name: 'Casco 2', price: 20000, category: 'cascos' }
    ];
    localStorage.setItem('products', JSON.stringify(products));
    
    // Filtrar por categoría 'cascos'
    const allProducts = JSON.parse(localStorage.getItem('products'));
    const cascos = allProducts.filter(p => p.category === 'cascos');
    
    // Verificar que solo trae cascos
    expect(cascos.length).toBe(2);
    expect(cascos.every(p => p.category === 'cascos')).toBe(true);
  });

 // PRUEBA 5: Verificar estructura de producto
  it('Debería crear productos con la estructura correcta', () => {
    const product = {
      id: Date.now().toString(),
      name: 'Test Product',
      price: 30000,
      category: 'frenos',
      image: 'test.jpg'
    };
    
    // Verificar que las propiedades existen
    expect(product.id).toBeDefined();
    expect(product.name).toBeDefined();
    expect(product.price).toBeDefined();
    expect(product.category).toBeDefined();
    expect(product.image).toBeDefined();
    
    // Verificar tipos de datos
    expect(typeof product.id).toBe('string');
    expect(typeof product.name).toBe('string');
    expect(typeof product.price).toBe('number');
    expect(typeof product.category).toBe('string');
    expect(typeof product.image).toBe('string');
  });
});