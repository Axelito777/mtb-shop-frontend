// cartService.js - Maneja el carrito de compras

// Obtener el carrito
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Guardar el carrito
export const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Agregar producto al carrito
export const addToCart = (product) => {
  const cart = getCart();
  
  // Buscar si el producto ya existe en el carrito
  const existingProduct = cart.find(item => item.id === product.id);
  
  if (existingProduct) {
    // Si existe, aumentar cantidad
    existingProduct.quantity += 1;
  } else {
    // Si no existe, agregarlo con cantidad 1
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || null
    });
  }
  
  saveCart(cart);
  return cart;
};

// Cambiar cantidad de un producto
export const updateQuantity = (productId, change) => {
  const cart = getCart();
  const product = cart.find(item => item.id === productId);
  
  if (product) {
    product.quantity += change;
    
    // Si la cantidad es 0 o menos, eliminar del carrito
    if (product.quantity <= 0) {
      return removeFromCart(productId);
    }
    
    saveCart(cart);
  }
  
  return cart;
};

// Eliminar producto del carrito
export const removeFromCart = (productId) => {
  const cart = getCart();
  const newCart = cart.filter(item => item.id !== productId);
  saveCart(newCart);
  return newCart;
};

// Calcular total del carrito
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Contar items totales en el carrito
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Limpiar carrito (después de comprar)
export const clearCart = () => {
  localStorage.removeItem('cart');
  return [];
};