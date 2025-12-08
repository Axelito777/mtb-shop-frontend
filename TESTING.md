# 🧪 Documentación de Testing - MTB Shop React

## 📋 Información General

**Proyecto:** MTB Shop React  
**Framework de Testing:** Jasmine 5.4.0  
**Test Runner:** Karma 6.4.4  
**Fecha:** Octubre 2025

---

## 🛠️ Configuración del Entorno de Testing

### Dependencias Instaladas

```json
{
  "jasmine-core": "^5.4.0",
  "karma": "^6.4.4",
  "karma-jasmine": "^5.1.0",
  "karma-chrome-launcher": "^3.2.0"
}
```

### Instalación

Para instalar las dependencias de testing:

```bash
npm install --save-dev jasmine-core karma karma-jasmine karma-chrome-launcher
```

---

## ⚙️ Configuración de Karma

**Archivo:** `karma.conf.cjs`

- **Frameworks:** Jasmine
- **Navegador:** Chrome Headless (sin interfaz gráfica)
- **Archivos de test:** `src/__tests__/**/*.spec.js`
- **Modo:** Single run (ejecuta una vez y termina)
- **Puerto:** 9876

---

## 🧪 Pruebas Implementadas

### Total de Pruebas: 10

#### 1. ProductService (5 pruebas)

| # | Nombre de la Prueba | Descripción |
|---|---------------------|-------------|
| 1 | Debería obtener productos desde localStorage | Verifica que se puedan recuperar productos almacenados |
| 2 | Debería agregar un nuevo producto correctamente | Prueba la creación de nuevos productos |
| 3 | Debería eliminar un producto correctamente | Valida la eliminación de productos por ID |
| 4 | Debería filtrar productos por categoría correctamente | Verifica el filtrado por categorías (cascos, pedales, etc.) |
| 5 | Debería crear productos con la estructura correcta | Valida que los productos tengan todas las propiedades necesarias |

#### 2. CartService (5 pruebas)

| # | Nombre de la Prueba | Descripción |
|---|---------------------|-------------|
| 6 | Debería agregar un producto al carrito | Verifica que se puedan agregar productos al carrito |
| 7 | Debería aumentar la cantidad si el producto ya existe | Prueba el incremento de cantidad de productos duplicados |
| 8 | Debería calcular el total del carrito correctamente | Valida el cálculo matemático del total |
| 9 | Debería eliminar un producto del carrito | Verifica la eliminación de items del carrito |
| 10 | Debería vaciar el carrito completamente | Prueba la limpieza total del carrito |

---

## 🚀 Ejecución de Tests

### Comando Principal

```bash
npm test
```

### Resultado Esperado

```
Chrome Headless 141.0.0.0 (Windows 10): Executed 10 of 10 SUCCESS
TOTAL: 10 SUCCESS
```

---

## 📊 Cobertura de Testing

### Servicios Testeados

- ✅ **productService.js** - CRUD de productos
- ✅ **cartService.js** - Gestión del carrito de compras

### Funcionalidades Cubiertas

1. **Operaciones CRUD:** Crear, Leer, Actualizar, Eliminar
2. **Validación de datos:** Estructura y tipos de datos
3. **Persistencia:** Almacenamiento en localStorage
4. **Lógica de negocio:** Cálculos, filtros, operaciones matemáticas

### Tasa de Éxito

- **Tests ejecutados:** 10
- **Tests exitosos:** 10
- **Tests fallidos:** 0
- **Tasa de éxito:** 100%

---

## 🔧 Estrategia de Testing

### Mock de localStorage

Debido a que los tests se ejecutan en un entorno Node.js (donde `localStorage` no existe), se implementó un **mock** (simulación) de localStorage:

```javascript
beforeEach(() => {
  localStorageMock = {};
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
```

### Aislamiento de Pruebas

- Cada prueba es independiente
- `beforeEach()` reinicia el estado antes de cada test
- No hay dependencias entre tests

---

## 📁 Estructura de Archivos

```
mtb-shop-react/
├── src/
│   ├── __tests__/              # Carpeta de tests
│   │   ├── productService.spec.js
│   │   └── cartService.spec.js
│   └── services/               # Servicios testeados
│       ├── productService.js
│       └── cartService.js
├── karma.conf.cjs              # Configuración de Karma
└── package.json                # Scripts y dependencias
```

---

## 🎯 Criterios de Aceptación

Todas las pruebas cumplen con:

✅ **Claridad:** Nombres descriptivos y auto-explicativos  
✅ **Independencia:** No dependen de otras pruebas  
✅ **Repetibilidad:** Resultados consistentes en cada ejecución  
✅ **Velocidad:** Ejecución rápida (< 1 segundo)  
✅ **Mantenibilidad:** Código limpio y bien documentado

---

## 🐛 Resolución de Problemas Comunes

### Error: "Cannot find module karma.conf.js"
**Solución:** Renombrar a `karma.conf.cjs` por conflicto con ES Modules

### Error: "global is not defined"
**Solución:** Usar `window.localStorage` en lugar de `global.localStorage`

### Error: "toHaveProperty is not a function"
**Solución:** Usar `.toBeDefined()` (Jasmine) en lugar de `.toHaveProperty()` (Jest)

---

## 📚 Tecnologías Utilizadas

- **Jasmine:** Framework BDD para escribir tests
- **Karma:** Test runner que ejecuta tests en navegadores reales
- **Chrome Headless:** Navegador sin interfaz gráfica para CI/CD

---

## 👨‍💻 Mantenimiento

Para agregar nuevas pruebas:

1. Crear archivo `*.spec.js` en `src/__tests__/`
2. Seguir el patrón `describe()` e `it()`
3. Ejecutar `npm test` para validar

---

## 📝 Notas Adicionales

- Los tests NO requieren servidor corriendo
- Se ejecutan en entorno aislado
- Compatible con integración continua (CI/CD)
- No afectan el código de producción

---

**Última actualización:** Octubre 18, 2025  
**Estado:** ✅ Todos los tests pasando