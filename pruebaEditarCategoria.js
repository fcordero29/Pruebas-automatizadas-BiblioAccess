const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function pruebaEditarCategoria() {
    let driver = await new Builder().forBrowser('chrome').build();

    async function tomarCaptura(nombre) {
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync(`./${nombre}.png`, screenshot, 'base64');
        console.log(`Captura tomada: ${nombre}.png`);
    }

    try {
        // Navegar al listado de categorías
        await driver.get('http://localhost:3000/categorias'); // Cambia la URL según tu servidor
        await driver.wait(until.elementLocated(By.css('.table')), 10000);
        await tomarCaptura('01_listado_categorias');

        // Hacer clic en el botón "Editar" de la primera categoría
        let editarCategoriaButton = await driver.findElement(By.css('a.btn-warning'));
        await editarCategoriaButton.click();

        // Esperar a que cargue el formulario de edición
        await driver.wait(until.urlContains('/categorias/editar'), 10000);
        await tomarCaptura('02_formulario_editar_categoria');

        // Modificar los datos en el formulario
        let nombreInput = await driver.findElement(By.id('nombre'));
        await nombreInput.clear();
        await nombreInput.sendKeys('Categoría Editada Automáticamente');

        let descripcionTextarea = await driver.findElement(By.id('descripcion'));
        await descripcionTextarea.clear();
        await descripcionTextarea.sendKeys('Descripción actualizada automáticamente durante una prueba.');

        await tomarCaptura('03_formulario_rellenado_editar_categoria');

        // Enviar el formulario
        let submitButton = await driver.findElement(By.css('button[type="submit"]'));
        await submitButton.click();

        // Esperar redirección al listado de categorías
        await driver.wait(until.urlIs('http://localhost:3000/categorias'), 10000);
        await tomarCaptura('04_categoria_editada');

        console.log('Prueba exitosa: Categoría editada correctamente.');
    } catch (error) {
        console.error('Prueba fallida:', error);
        await tomarCaptura('error');
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
