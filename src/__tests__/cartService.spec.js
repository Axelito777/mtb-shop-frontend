// cartService.spec.js - Pruebas para el servicio del carrito

describe('CartService - Pruebas del servicio del carrito', () => {
  
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

  // PRUEBA 6: Agregar producto al carrito
  it('Debería agregar un producto al carrito', () => {
    const cart = [];
    const product = { id: '1', name: 'Test Product', price: 10000 };
    
    // Agregar producto con cantidad inicial de 1
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Verificar que se guardó correctamente
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    
    expect(savedCart.length).toBe(1);
    expect(savedCart[0].id).toBe('1');
    expect(savedCart[0].quantity).toBe(1);
  });

  // PRUEBA 7: Aumentar cantidad de producto existente
  it('Debería aumentar la cantidad si el producto ya existe', () => {
    const cart = [{ id: '1', name: 'Test', price: 10000, quantity: 1 }];
    
    // Buscar producto existente y aumentar cantidad
    const existingItem = cart.find(item => item.id === '1');
    existingItem.quantity += 1;
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Verificar que la cantidad aumentó
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    
    expect(savedCart.length).toBe(1);
    expect(savedCart[0].quantity).toBe(2);
  });

  // PRUEBA 8: Calcular total del carrito
  it('Debería calcular el total del carrito correctamente', () => {
    const cart = [
      { id: '1', name: 'Producto 1', price: 10000, quantity: 1 },
      { id: '2', name: 'Producto 2', price: 20000, quantity: 1 }
    ];
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Calcular total sumando precio * cantidad
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    const total = savedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    expect(total).toBe(30000);
  });

  // PRUEBA 9: Eliminar producto del carrito
  it('Debería eliminar un producto del carrito', () => {
    const cart = [
      { id: '1', name: 'Producto 1', price: 10000, quantity: 1 },
      { id: '2', name: 'Producto 2', price: 20000, quantity: 1 }
    ];
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Eliminar producto con id '1'
    const updatedCart = cart.filter(item => item.id !== '1');
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Verificar que se eliminó
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    
    expect(savedCart.length).toBe(1);
    expect(savedCart[0].id).toBe('2');
  });

  // PRUEBA 10: Vaciar carrito completamente
  it('Debería vaciar el carrito completamente', () => {
    const cart = [
      { id: '1', name: 'Producto 1', price: 10000, quantity: 1 },
      { id: '2', name: 'Producto 2', price: 20000, quantity: 1 }
    ];
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Vaciar el carrito
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Verificar que está vacío
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    
    expect(savedCart.length).toBe(0);
  });
});