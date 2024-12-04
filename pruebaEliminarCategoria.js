const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function pruebaEliminarCategoria() {
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

        // Hacer clic en el botón "Eliminar" de la primera categoría
        let eliminarCategoriaButton = await driver.findElement(By.css('a.btn-danger'));
        await eliminarCategoriaButton.click();

        // Manejar la alerta de confirmación
        await driver.wait(until.alertIsPresent(), 5000);
        let alert = await driver.switchTo().alert();
        console.log(`Texto de la alerta: ${await alert.getText()}`);
        await alert.accept(); // Aceptar la alerta
        await tomarCaptura('02_alerta_aceptada');

        // Esperar redirección al listado de categorías
        await driver.wait(until.urlIs('http://localhost:3000/categorias'), 10000);
        await tomarCaptura('03_categoria_eliminada');

        console.log('Prueba exitosa: Categoría eliminada correctamente.');
    } catch (error) {
        console.error('Prueba fallida:', error);
        await tomarCaptura('error');
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
