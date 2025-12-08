# 🚴 MTB Shop - Tienda Online de Componentes MTB

Sistema completo de e-commerce para componentes de Mountain Bike desarrollado con Spring Boot y React.

## 📋 Descripción

Plataforma web para la venta de componentes de bicicletas MTB que incluye:
- 🛒 Carrito de compras
- 👤 Autenticación de usuarios (JWT)
- 🔐 Panel de administración
- 📦 Gestión de productos y categorías
- 💰 Sistema de ofertas y descuentos
- 📱 Diseño responsive

## 🛠️ Tecnologías

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security + JWT
- Spring Data JPA
- H2 Database
- Maven

### Frontend
- React 18
- React Router DOM
- JavaScript ES6+
- CSS3
- Vite

## 📦 Instalación

### Requisitos previos
- Java JDK 17+
- Maven 3.8+
- Node.js 18+
- npm 9+

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/mtb-shop-fullstack.git
cd mtb-shop-fullstack
```

### 2️⃣ Configurar y ejecutar el Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### 3️⃣ Configurar y ejecutar el Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 🗄️ Base de Datos

El proyecto usa **H2 Database** en modo persistente.

### Acceder a la consola H2:
1. Ir a: `http://localhost:8080/h2-console`
2. Configuración:
   - JDBC URL: `jdbc:h2:file:./data/mtbshop`
   - User: `sa`
   - Password: `password`

### Datos de prueba

Al iniciar el backend, se crea automáticamente:

**Usuario Admin:**
- Email: `superadmin@mtb.com`
- Password: `admin123`

**Productos de ejemplo:**
- SRAM Code RSC - $129,990
- DT Swiss XM 1700 - $449,990
- RockShox Pike Ultimate - $899,990
- Hope Tech 3 E4 - $159,990

## 🔑 Endpoints API

### Autenticación
```
POST /api/auth/register - Registrar usuario
POST /api/auth/login    - Iniciar sesión
```

### Productos
```
GET    /api/products     - Listar productos
GET    /api/products/:id - Obtener producto
POST   /api/products     - Crear producto (Admin)
PUT    /api/products/:id - Actualizar producto (Admin)
DELETE /api/products/:id - Eliminar producto (Admin)
```

### Categorías
```
GET    /api/categories     - Listar categorías
GET    /api/categories/:id - Obtener categoría
POST   /api/categories     - Crear categoría (Admin)
PUT    /api/categories/:id - Actualizar categoría (Admin)
DELETE /api/categories/:id - Eliminar categoría (Admin)
```

### Órdenes
```
GET  /api/orders          - Listar órdenes (Admin)
GET  /api/orders/my-orders - Mis órdenes (Usuario)
GET  /api/orders/:id      - Obtener orden
POST /api/orders          - Crear orden
```

## 👤 Roles de Usuario

### USER (Cliente)
- Ver productos y ofertas
- Agregar productos al carrito
- Realizar compras
- Ver historial de compras
- Gestionar perfil

### ADMIN (Administrador)
- Todo lo de USER +
- Crear/Editar/Eliminar productos
- Crear/Editar/Eliminar categorías
- Ver todas las órdenes
- Gestionar usuarios

## 🎨 Características del Frontend

### Páginas principales
- **Home** - Página de inicio
- **Productos** - Catálogo con filtros por categoría y búsqueda
- **Ofertas** - Productos con descuentos especiales
- **Detalle de Producto** - Información completa y agregar al carrito
- **Carrito** - Gestión de productos seleccionados
- **Checkout** - Proceso de compra
- **Perfil** - Datos del usuario
- **Mis Compras** - Historial de órdenes
- **Admin Panel** - Gestión de productos (solo Admin)

### Funcionalidades
- ✅ Autenticación persistente (localStorage)
- ✅ Carrito de compras persistente
- ✅ Filtrado por categoría
- ✅ Búsqueda de productos
- ✅ Diseño responsive
- ✅ Animaciones CSS
- ✅ Protección de rutas

## 🔒 Seguridad

- Autenticación mediante JWT (JSON Web Tokens)
- Contraseñas encriptadas con BCrypt
- Validación de roles en endpoints protegidos
- CORS configurado para desarrollo
- Protección de rutas en frontend

## 📱 Capturas de Pantalla

*Agrega aquí capturas de tu aplicación*

## 🚀 Despliegue

### Backend
Para generar el JAR ejecutable:
```bash
cd backend
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### Frontend
Para generar build de producción:
```bash
cd frontend
npm run build
```

Los archivos estarán en `frontend/dist/`

## 👨‍💻 Autor

**[Tu Nombre]**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

## 📝 Licencia

Este proyecto es parte de una evaluación académica.

## 🙏 Agradecimientos

- Instituto/Universidad: [Nombre]
- Profesor: [Nombre del profesor]
- Curso: Desarrollo Full Stack

---

⭐ Si te gustó el proyecto, dale una estrella en GitHub!