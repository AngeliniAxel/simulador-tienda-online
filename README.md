## 🛒 **Simulador de Tienda Online **  

El objetivo de este ejercicio es desarrollar un simulador de tienda online utilizando únicamente **HTML, CSS y JavaScript**, sin el uso de frameworks ni herramientas externas.  

---

## 📋 **Descripción del Ejercicio**  

### ✅ **Listado de Productos Inicial**  
1. Los productos disponibles en la tienda deben ser definidos en un archivo separado llamado **`data.js`**.  
2. En **`data.js`**, crea un array de objetos que represente los productos, con propiedades como:  
   - `id`  
   - `nombre`  
   - `imagen`  
   - `descripcion`  
   - `precio`  
   - `stock`  
3. Este archivo **`data.js`** debe ser incluido en el **HTML** inicial, cargando los productos de manera dinámica en la tienda al cargar la página.  

**Ejemplo de `data.js`:**  
```javascript
const productos = [
  { id: 1, nombre: "Hamburguesa Clásica", imagen: "img/hamburguesa.jpg", descripcion: "Deliciosa hamburguesa con ingredientes frescos.", precio: 10, stock: 20 },
  { id: 2, nombre: "Patatas Fritas", imagen: "img/patatas.jpg", descripcion: "Crujientes patatas fritas con sal.", precio: 5, stock: 50 },
  // Más productos...
];
```
## 🏪 **Estructura de la Tienda**  
- Los productos del array deben ser mostrados dinámicamente en la página utilizando **JavaScript**.  
- Cada producto debe tener un botón **"Agregar al Carrito"** que permita al usuario añadir el producto seleccionado.  

**Herramientas sugeridas:**  
✔️ `<div>`  
✔️ `<img>`  
✔️ `<h3>`  
✔️ `<p>`  
✔️ `<button>`  

**Tarea:**  
- Usa **JavaScript** para recorrer el array `productos` y generar dinámicamente los elementos **HTML** correspondientes.  

---

## 🛍️ **Carrito de Compras**  
- Al hacer clic en **“Agregar al Carrito”**, el producto debe añadirse a una lista que representa el carrito de compras.  
- El carrito debe mostrar:  
  - Nombre del producto  
  - Cantidad  
  - Precio unitario  
  - Precio total por producto  

- Debe incluir opciones para:  
  ✅ Aumentar o disminuir la cantidad de un producto  
  ✅ Eliminar productos del carrito  

**Herramientas sugeridas:**  
✔️ Uso de **JavaScript** para manipular el DOM y actualizar la visualización del carrito de acuerdo a las acciones del usuario.  
✔️ Gestión de productos mediante un **array** u **objeto** en JavaScript.  

---

## 💰 **Cálculo del Total**  
- El carrito debe mostrar el **total de la compra**, actualizado automáticamente al modificar el carrito.  

**Herramientas sugeridas:**  
✔️ Utiliza **JavaScript** para calcular el total de la compra, actualizando los valores cada vez que se modifique el contenido del carrito.  

---

## 🎯 **Interacción con el Usuario**  
- El carrito de compras debe poder mostrarse y ocultarse mediante un botón o icono.  
- Debe mostrarse un mensaje o alerta cuando se intente proceder a la compra con un carrito vacío.  

**Herramientas sugeridas:**  
✔️ Manejo de **eventos de clic** para abrir/cerrar el carrito y para las interacciones con los productos dentro de él.  

---

## 🛡️ **Validaciones**  
- Implementar validaciones para:  
  ✅ Controlar el stock de productos  
  ✅ Evitar cantidades negativas  

**Herramientas sugeridas:**  
✔️ Uso de **condicionales** en JavaScript para asegurar que los productos no se agreguen más allá del stock disponible.  

---

## 🎨 **Diseño y Estilo**  
- La tienda y el carrito deben tener un diseño atractivo y una buena experiencia de usuario.  

**Herramientas sugeridas:**  
✔️ Utilizar **CSS** para diseñar:  
  ✅ Cuadrícula de productos  
  ✅ Carrito  
  ✅ Estilos de botones  

---

## 📂 **Entregables**  
✅ `index.html` → Con la estructura básica de la tienda y la inclusión de `data.js`.  
✅ `data.js` → Lista inicial de productos en un array.  
✅ `styles.css` → Estilos visuales de la tienda y el carrito.  
✅ `script.js` → Lógica del carrito, manipulación del DOM e interacciones del usuario.  

---

## ⚠️ **Notas Adicionales**  
🚨 Todo el código JavaScript debe estar bien comentado y estructurado para facilitar la comprensión y revisión.  
🚫 **No se permite** el uso de librerías o frameworks externos (como React o Angular).  

