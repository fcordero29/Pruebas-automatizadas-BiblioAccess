const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function pruebaCrearCategoria() {
    let driver = await new Builder().forBrowser('chrome').build();

    async function tomarCaptura(nombre) {
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync(`./${nombre}.png`, screenshot, 'base64');
        console.log(`Captura tomada: ${nombre}.png`);
    }

    try {
        // Navegar al listado de categorías
        await driver.get('http://localhost:3000/categorias'); // Cambia la URL según tu servidor
        await driver.wait(until.elementLocated(By.css('a.btn-primary')), 10000);
        await tomarCaptura('01_listado_categorias');

        // Hacer clic en el botón "Crear Nueva Categoría"
        let crearCategoriaButton = await driver.findElement(By.css('a.btn-primary'));
        await crearCategoriaButton.click();

        // Esperar a que cargue el formulario de creación
        await driver.wait(until.urlContains('/categorias/nueva'), 10000);
        await tomarCaptura('02_formulario_crear_categoria');

        // Llenar el formulario
        let nombreInput = await driver.findElement(By.id('nombre'));
        await nombreInput.sendKeys('Nueva Categoría Automática');

        let descripcionInput = await driver.findElement(By.id('descripcion'));
        await descripcionInput.sendKeys('Esta es una categoría creada automáticamente para pruebas.');
        await tomarCaptura('03_formulario_rellenado');

        // Enviar el formulario
        let submitButton = await driver.findElement(By.css('button[type="submit"]'));
        await submitButton.click();

        // Esperar redirección al listado de categorías
        await driver.wait(until.urlIs('http://localhost:3000/categorias'), 10000);
        await tomarCaptura('04_categoria_creada');

        console.log('Prueba exitosa: Categoría creada correctamente.');
    } catch (error) {
        console.error('Prueba fallida:', error);
        await tomarCaptura('error');
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
