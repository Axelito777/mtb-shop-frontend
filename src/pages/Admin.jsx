import { useState, useEffect } from 'react';
import { getCurrentUser, isAdmin } from '../services/authService';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';
import { getCategories } from '../services/categoryService';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    brand: '',
    model: '',
    imageUrl: ''
  });

  useEffect(() => {
    // Verificar si es admin
    if (!isAdmin()) {
      alert('No tienes permisos de administrador');
      navigate('/');
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const productsData = await getProducts();
      const categoriesData = await getCategories();
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        categoryId: parseInt(formData.categoryId)
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        alert('Producto actualizado');
      } else {
        await addProduct(productData);
        alert('Producto creado');
      }

      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        categoryId: '',
        brand: '',
        model: '',
        imageUrl: ''
      });
      loadData();
    } catch (error) {
      alert('Error al guardar producto');
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      categoryId: product.category?.id?.toString() || '',
      brand: product.brand || '',
      model: product.model || '',
      imageUrl: product.imageUrl || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return;

    try {
      await deleteProduct(id);
      alert('Producto eliminado');
      loadData();
    } catch (error) {
      alert('Error al eliminar producto');
      console.error(error);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="admin-page">
      <h1>Panel de Administración</h1>

      <button 
        onClick={() => setShowForm(!showForm)} 
        className="btn-primary"
        style={{ marginBottom: '20px' }}
      >
        {showForm ? 'Cancelar' : '+ Nuevo Producto'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="product-form">
          <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>

          <input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />

          <textarea
            placeholder="Descripción"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />

          <input
            type="number"
            placeholder="Precio"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            required
          />

          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Marca"
            value={formData.brand}
            onChange={(e) => setFormData({...formData, brand: e.target.value})}
          />

          <input
            type="text"
            placeholder="Modelo"
            value={formData.model}
            onChange={(e) => setFormData({...formData, model: e.target.value})}
          />

          <input
            type="url"
            placeholder="URL de imagen"
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
          />

          <button type="submit" className="btn-success">
            {editingProduct ? 'Actualizar' : 'Crear'}
          </button>
        </form>
      )}

      <h2>Productos ({products.length})</h2>
      
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Marca</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price?.toLocaleString('es-CL')}</td>
              <td>{product.stock}</td>
              <td>{product.brand}</td>
              <td>
                <button onClick={() => handleEdit(product)} className="btn-edit">
                  ✏️ Editar
                </button>
                <button onClick={() => handleDelete(product.id)} className="btn-delete">
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;