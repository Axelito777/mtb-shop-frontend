# 📋 ERS V2 - Especificación de Requisitos de Software

## MTB Shop React - Tienda de Productos para Mountain Bike

**Versión:** 2.0  
**Fecha:** Octubre 2025  
**Estado:** Implementado ✅

---

## 1. INTRODUCCIÓN

### 1.1 Propósito del Documento

Este documento especifica los requisitos funcionales y no funcionales de la aplicación web **MTB Shop React**, una plataforma de comercio electrónico especializada en productos para ciclismo de montaña.

### 1.2 Alcance del Sistema

**MTB Shop React** es una aplicación web que permite:
- A los usuarios finales: navegar productos, gestionar un carrito de compras y realizar compras
- A los administradores: gestionar el catálogo completo de productos (CRUD)

### 1.3 Definiciones y Acrónimos

| Término | Definición |
|---------|------------|
| CRUD | Create, Read, Update, Delete (Crear, Leer, Actualizar, Eliminar) |
| SPA | Single Page Application |
| localStorage | API del navegador para almacenamiento local |
| Admin | Usuario administrador con permisos especiales |
| MTB | Mountain Bike (Bicicleta de Montaña) |

---

## 2. DESCRIPCIÓN GENERAL

### 2.1 Perspectiva del Producto

MTB Shop React es una aplicación web independiente construida como SPA (Single Page Application) que funciona completamente en el navegador del cliente, sin necesidad de un backend tradicional.

### 2.2 Funcionalidades Principales

1. **Sistema de Autenticación**
   - Registro de nuevos usuarios
   - Inicio de sesión
   - Cierre de sesión
   - Roles: Usuario estándar y Administrador

2. **Catálogo de Productos**
   - Visualización de productos con imágenes
   - Filtrado por categorías
   - Información detallada (nombre, precio, categoría)

3. **Carrito de Compras**
   - Agregar productos
   - Modificar cantidades
   - Eliminar productos
   - Cálculo automático del total
   - Persistencia de datos

4. **Panel de Administración**
   - Crear nuevos productos
   - Editar productos existentes
   - Eliminar productos
   - Subir imágenes de productos

### 2.3 Usuarios del Sistema

| Tipo de Usuario | Descripción | Permisos |
|-----------------|-------------|----------|
| **Visitante** | Usuario no registrado | Solo visualización |
| **Usuario Registrado** | Usuario con cuenta activa | Catálogo + Carrito |
| **Administrador** | Usuario con privilegios | Todas las funciones + CRUD |

### 2.4 Restricciones

- Requiere navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript debe estar habilitado
- localStorage debe estar disponible
- Conexión a internet solo necesaria para carga inicial

---

## 3. REQUISITOS FUNCIONALES

### RF-01: Registro de Usuario
**Prioridad:** Alta  
**Descripción:** El sistema debe permitir el registro de nuevos usuarios.

**Criterios de Aceptación:**
- El usuario proporciona nombre, email y contraseña
- El email debe ser único en el sistema
- La contraseña debe tener mínimo 6 caracteres
- Los datos se almacenan en localStorage
- Mensaje de confirmación al completar el registro

---

### RF-02: Inicio de Sesión
**Prioridad:** Alta  
**Descripción:** El sistema debe autenticar usuarios registrados.

**Criterios de Aceptación:**
- Usuario ingresa email y contraseña
- El sistema valida las credenciales
- Si son correctas, se crea una sesión
- Usuario administrador accede al panel admin
- Usuario estándar accede al catálogo

**Usuario Admin por Defecto:**
- Email: `admin@mtbshop.com`
- Contraseña: `admin123`

---

### RF-03: Visualización de Productos
**Prioridad:** Alta  
**Descripción:** El sistema debe mostrar el catálogo de productos.

**Criterios de Aceptación:**
- Cada producto muestra: imagen, nombre, precio, categoría
- Diseño responsive (cards con Bootstrap)
- Productos se cargan desde localStorage
- Botón "Agregar al Carrito" visible

---

### RF-04: Filtrado por Categoría
**Prioridad:** Media  
**Descripción:** El sistema debe permitir filtrar productos por categoría.

**Categorías Disponibles:**
- Todos (sin filtro)
- Cascos
- Pedales
- Frenos
- Componentes
- Ropa
- Accesorios

**Criterios de Aceptación:**
- Botones de categoría visibles en la página de productos
- Al hacer clic, solo muestra productos de esa categoría
- Opción "Todos" muestra el catálogo completo

---

### RF-05: Carrito de Compras - Agregar Producto
**Prioridad:** Alta  
**Descripción:** Los usuarios deben poder agregar productos al carrito.

**Criterios de Aceptación:**
- Botón "Agregar al Carrito" en cada producto
- Si el producto ya existe, aumenta la cantidad
- Si es nuevo, se agrega con cantidad 1
- Contador del navbar se actualiza automáticamente
- Datos persisten en localStorage

---

### RF-06: Carrito de Compras - Modificar Cantidad
**Prioridad:** Alta  
**Descripción:** Los usuarios deben poder cambiar la cantidad de productos.

**Criterios de Aceptación:**
- Botones (+) y (-) para cada producto
- Cantidad mínima: 1
- Al llegar a 0, se elimina el producto
- Total se recalcula automáticamente

---

### RF-07: Carrito de Compras - Eliminar Producto
**Prioridad:** Alta  
**Descripción:** Los usuarios deben poder eliminar productos del carrito.

**Criterios de Aceptación:**
- Botón "Eliminar" visible en cada item
- Confirmación antes de eliminar (opcional)
- Producto se elimina inmediatamente
- Total se actualiza
- Cambios persisten en localStorage

---

### RF-08: Carrito de Compras - Vaciar Carrito
**Prioridad:** Media  
**Descripción:** Los usuarios deben poder vaciar el carrito completamente.

**Criterios de Aceptación:**
- Botón "Vaciar Carrito" visible
- Elimina todos los productos
- Muestra mensaje de carrito vacío
- localStorage se actualiza

---

### RF-09: Carrito de Compras - Cálculo de Total
**Prioridad:** Alta  
**Descripción:** El sistema debe calcular el total automáticamente.

**Criterios de Aceptación:**
- Total = Suma de (precio × cantidad) de cada producto
- Se actualiza en tiempo real
- Formato en pesos chilenos (CLP)
- Visible en la página del carrito

---

### RF-10: Panel Admin - Crear Producto
**Prioridad:** Alta  
**Descripción:** Los administradores deben poder crear nuevos productos.

**Criterios de Aceptación:**
- Formulario con campos: nombre, precio, categoría, imagen
- Validación de campos obligatorios
- Precio debe ser numérico y positivo
- ID único generado automáticamente
- Producto se guarda en localStorage
- Mensaje de confirmación

---

### RF-11: Panel Admin - Editar Producto
**Prioridad:** Alta  
**Descripción:** Los administradores deben poder editar productos existentes.

**Criterios de Aceptación:**
- Botón "Editar" en cada producto
- Formulario pre-llenado con datos actuales
- Permite modificar todos los campos
- Validación de datos
- Cambios se guardan en localStorage

---

### RF-12: Panel Admin - Eliminar Producto
**Prioridad:** Alta  
**Descripción:** Los administradores deben poder eliminar productos.

**Criterios de Aceptación:**
- Botón "Eliminar" visible en cada producto
- Confirmación antes de eliminar
- Producto se elimina de localStorage
- Lista se actualiza automáticamente

---

### RF-13: Navegación entre Páginas
**Prioridad:** Alta  
**Descripción:** El sistema debe permitir navegación fluida sin recargas.

**Rutas Implementadas:**
- `/` - Home (página de inicio)
- `/auth` - Login/Registro
- `/products` - Catálogo de productos
- `/cart` - Carrito de compras
- `/admin` - Panel de administración (protegido)

**Criterios de Aceptación:**
- Navegación con React Router
- Sin recargas de página (SPA)
- Rutas protegidas validan autenticación
- Redirección automática si no está autenticado

---

### RF-14: Persistencia de Datos
**Prioridad:** Alta  
**Descripción:** Los datos deben persistir entre sesiones.

**Datos Persistidos:**
- Usuarios registrados
- Productos del catálogo
- Carrito de compras del usuario actual
- Sesión de usuario (currentUser)

**Criterios de Aceptación:**
- Uso de localStorage para almacenamiento
- Datos sobreviven al cerrar el navegador
- Sincronización automática
- Formato JSON

---

## 4. REQUISITOS NO FUNCIONALES

### RNF-01: Usabilidad
**Descripción:** La interfaz debe ser intuitiva y fácil de usar.

**Criterios:**
- Diseño responsive para móviles, tablets y desktop
- Bootstrap 5 para consistencia visual
- Mensajes claros y descriptivos
- Navegación evidente
- Tiempo de aprendizaje < 10 minutos

---

### RNF-02: Rendimiento
**Descripción:** La aplicación debe ser rápida y eficiente.

**Criterios:**
- Tiempo de carga inicial < 3 segundos
- Operaciones CRUD < 500ms
- Sin lag en interacciones
- Optimización de imágenes
- Build optimizado con Vite

---

### RNF-03: Compatibilidad
**Descripción:** La aplicación debe funcionar en navegadores modernos.

**Navegadores Soportados:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Resoluciones:**
- ✅ Mobile: 320px - 768px
- ✅ Tablet: 768px - 1024px
- ✅ Desktop: 1024px+

---

### RNF-04: Seguridad
**Descripción:** Protección básica de datos y funcionalidades.

**Medidas Implementadas:**
- Validación de roles (admin/usuario)
- Rutas protegidas
- Almacenamiento local de datos sensibles
- No exposición de APIs externas

**Limitaciones:**
- localStorage no es seguro para producción real
- Sin encriptación de contraseñas
- Sin HTTPS requerido (ambiente de desarrollo)

---

### RNF-05: Mantenibilidad
**Descripción:** Código limpio y documentado.

**Características:**
- Componentes React reutilizables
- Separación de lógica (services)
- Nombres descriptivos
- Estructura de carpetas clara
- Comentarios en código complejo

---

### RNF-06: Escalabilidad
**Descripción:** Preparado para crecimiento futuro.

**Consideraciones:**
- Arquitectura modular
- Fácil agregar nuevas categorías
- Fácil agregar nuevas páginas
- Servicios desacoplados
- Posibilidad de migrar a backend real

---

### RNF-07: Testing
**Descripción:** Código verificado con pruebas unitarias.

**Cobertura:**
- 10 pruebas unitarias implementadas
- Framework: Jasmine + Karma
- Servicios críticos testeados:
  - productService (5 pruebas)
  - cartService (5 pruebas)
- Tasa de éxito: 100%

---

## 5. CASOS DE USO

### CU-01: Usuario Registra Cuenta

**Actor:** Usuario no registrado

**Flujo Principal:**
1. Usuario accede a la página de autenticación
2. Selecciona la pestaña "Registro"
3. Ingresa nombre, email y contraseña
4. Hace clic en "Registrarse"
5. Sistema valida los datos
6. Sistema crea la cuenta
7. Sistema muestra mensaje de éxito
8. Usuario es redirigido al catálogo

**Flujo Alternativo:**
- 5a. Email ya existe → Muestra error
- 5b. Contraseña muy corta → Muestra error
- 5c. Campos vacíos → Muestra error

---

### CU-02: Usuario Inicia Sesión

**Actor:** Usuario registrado

**Flujo Principal:**
1. Usuario accede a la página de autenticación
2. Ingresa email y contraseña
3. Hace clic en "Iniciar Sesión"
4. Sistema valida credenciales
5. Sistema crea sesión
6. Usuario es redirigido según su rol:
   - Admin → Panel de administración
   - Usuario → Catálogo de productos

**Flujo Alternativo:**
- 4a. Credenciales incorrectas → Muestra error
- 4b. Usuario no existe → Muestra error

---

### CU-03: Usuario Compra Productos

**Actor:** Usuario registrado

**Precondiciones:** Usuario debe estar autenticado

**Flujo Principal:**
1. Usuario navega al catálogo de productos
2. Filtra por categoría (opcional)
3. Hace clic en "Agregar al Carrito" en producto deseado
4. Repite pasos 2-3 para más productos
5. Hace clic en el ícono del carrito en el navbar
6. Revisa los productos agregados
7. Modifica cantidades si es necesario
8. Revisa el total
9. Hace clic en "Finalizar Compra"

**Flujo Alternativo:**
- 7a. Elimina productos no deseados
- 7b. Vacía el carrito completamente

---

### CU-04: Admin Gestiona Productos

**Actor:** Administrador

**Precondiciones:** Usuario debe tener rol de admin

**Flujo Principal - Crear:**
1. Admin inicia sesión
2. Accede al panel de administración
3. Hace clic en "Agregar Nuevo Producto"
4. Completa el formulario (nombre, precio, categoría, imagen)
5. Hace clic en "Guardar"
6. Sistema valida y guarda el producto
7. Producto aparece en la lista

**Flujo Principal - Editar:**
1. Admin visualiza la lista de productos
2. Hace clic en "Editar" en un producto
3. Modifica los campos deseados
4. Hace clic en "Guardar Cambios"
5. Sistema actualiza el producto

**Flujo Principal - Eliminar:**
1. Admin visualiza la lista de productos
2. Hace clic en "Eliminar" en un producto
3. Confirma la eliminación
4. Sistema elimina el producto
5. Lista se actualiza

---

## 6. ARQUITECTURA DEL SISTEMA

### 6.1 Arquitectura General

```
┌─────────────────────────────────────┐
│         NAVEGADOR (Cliente)         │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐ │
│  │      React Components         │ │
│  │  (Pages, Components, UI)      │ │
│  └───────────┬───────────────────┘ │
│              │                      │
│  ┌───────────▼───────────────────┐ │
│  │        Services Layer         │ │
│  │  (authService, cartService,   │ │
│  │   productService)             │ │
│  └───────────┬───────────────────┘ │
│              │                      │
│  ┌───────────▼───────────────────┐ │
│  │       localStorage API        │ │
│  │   (Persistencia de Datos)     │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### 6.2 Componentes del Sistema

#### **Capa de Presentación (Components/Pages)**
- **Navbar:** Navegación y contador de carrito
- **ProductCard:** Tarjeta de producto
- **CartItem:** Item del carrito
- **Home:** Página de inicio
- **Products:** Catálogo de productos
- **Cart:** Carrito de compras
- **Admin:** Panel de administración
- **Auth:** Login y registro

#### **Capa de Lógica (Services)**
- **authService.js:** Gestión de autenticación
- **productService.js:** CRUD de productos
- **cartService.js:** Operaciones del carrito

#### **Capa de Datos (localStorage)**
- Almacenamiento persistente en el navegador

---

## 7. TECNOLOGÍAS UTILIZADAS

### 7.1 Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.3.1 | Framework UI |
| Vite | 5.4.10 | Build tool |
| React Router | 6.28.0 | Navegación |
| Bootstrap | 5.3.3 | Estilos CSS |

### 7.2 Testing

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Jasmine | 5.4.0 | Framework de testing |
| Karma | 6.4.4 | Test runner |
| Chrome Headless | - | Navegador para tests |

### 7.3 Almacenamiento

- **localStorage API:** Persistencia de datos en el navegador

---

## 8. MODELO DE DATOS

### 8.1 Estructura de Datos en localStorage

#### **users (Array)**
```json
[
  {
    "id": "1234567890",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456",
    "role": "user"
  }
]
```

#### **products (Array)**
```json
[
  {
    "id": "1697812345678",
    "name": "Casco Fox Proframe",
    "price": 89990,
    "category": "cascos",
    "image": "/images/casco-fox.jpg"
  }
]
```

#### **cart (Array)**
```json
[
  {
    "id": "1697812345678",
    "name": "Casco Fox Proframe",
    "price": 89990,
    "category": "cascos",
    "image": "/images/casco-fox.jpg",
    "quantity": 2
  }
]
```

#### **currentUser (Object)**
```json
{
  "id": "1234567890",
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "role": "user"
}
```

---

## 9. PRUEBAS Y VALIDACIÓN

### 9.1 Plan de Pruebas

#### **Pruebas Unitarias (Jasmine/Karma)**
- ✅ 10 pruebas implementadas
- ✅ 100% de tests pasando
- ✅ Cobertura de servicios críticos

#### **Pruebas Manuales**
- ✅ Navegación entre páginas
- ✅ Responsividad en diferentes dispositivos
- ✅ Flujos completos de usuario
- ✅ Validación de formularios

### 9.2 Resultados de Testing

```
Chrome Headless 141.0.0.0 (Windows 10): 
Executed 10 of 10 SUCCESS (0.002 secs / 0.002 secs)
TOTAL: 10 SUCCESS ✅
```

**Ver detalles completos en:** [TESTING.md](./TESTING.md)

---

## 10. INSTALACIÓN Y CONFIGURACIÓN

### 10.1 Requisitos del Sistema

- Node.js 18+
- npm 9+
- Navegador web moderno
- 100MB de espacio en disco

### 10.2 Pasos de Instalación

```bash
# 1. Clonar repositorio
git clone [URL_REPOSITORIO]
cd mtb-shop-react

# 2. Instalar dependencias
npm install

# 3. Iniciar desarrollo
npm run dev

# 4. Ejecutar tests
npm test

# 5. Build para producción
npm run build
```

**Ver instrucciones completas en:** [README.md](./README.md)

---

## 11. LIMITACIONES CONOCIDAS

1. **Seguridad:**
   - localStorage no es seguro para datos sensibles en producción
   - Contraseñas no están encriptadas
   - No hay protección CSRF

2. **Escalabilidad:**
   - localStorage tiene límite de ~5-10MB
   - No hay sincronización entre dispositivos
   - Sin backend real para operaciones complejas

3. **Funcionalidades:**
   - No hay procesamiento de pagos real
   - No hay envío de emails
   - No hay gestión de inventario
   - Sin sistema de búsqueda avanzada

---

## 12. FUTURAS MEJORAS

### Fase 2 (Corto Plazo)
- [ ] Integración con backend (API REST)
- [ ] Base de datos real (PostgreSQL/MongoDB)
- [ ] Sistema de búsqueda con filtros avanzados
- [ ] Página de checkout con formulario completo

### Fase 3 (Mediano Plazo)
- [ ] Pasarela de pago (WebPay, MercadoPago)
- [ ] Sistema de envío por email
- [ ] Historial de pedidos
- [ ] Panel de estadísticas para admin

### Fase 4 (Largo Plazo)
- [ ] Sistema de reseñas y calificaciones
- [ ] Wishlist (lista de deseos)
- [ ] Programa de puntos/fidelidad
- [ ] App móvil nativa

---

## 13. CONCLUSIONES

**MTB Shop React** cumple satisfactoriamente con los requisitos establecidos para una aplicación de comercio electrónico educativa. El sistema implementa:

✅ Funcionalidades CRUD completas  
✅ Sistema de autenticación con roles  
✅ Carrito de compras funcional  
✅ Persistencia de datos  
✅ Testing unitario  
✅ Diseño responsivo  
✅ Código mantenible y documentado  

El proyecto demuestra competencias en:
- Desarrollo frontend con React
- Gestión de estado y persistencia
- Testing con Jasmine/Karma
- Diseño de interfaces responsivas
- Arquitectura de software
- Documentación técnica

---

## 14. REFERENCIAS

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Bootstrap 5](https://getbootstrap.com/docs/5.3/)
- [Jasmine Testing Framework](https://jasmine.github.io/)
- [Karma Test Runner](https://karma-runner.github.io/)
- [React Router](https://reactrouter.com/)

---

## 15. ANEXOS

### Anexo A: Credenciales de Prueba

**Usuario Administrador:**
- Email: `admin@mtbshop.com`
- Contraseña: `admin123`

**Usuario de Prueba:**
- Registrarse con cualquier email válido

### Anexo B: Estructura de Carpetas Completa

Ver [README.md - Sección Estructura del Proyecto](./README.md#-estructura-del-proyecto)

### Anexo C: Scripts npm Disponibles

Ver [README.md - Sección Scripts Disponibles](./README.md#-scripts-disponibles)

---

**Documento elaborado por:** [Tu Nombre]  
**Fecha de elaboración:** Octubre 18, 2025  
**Versión del documento:** 2.0  
**Estado:** ✅ Aprobado

---

**FIN DEL DOCUMENTO**