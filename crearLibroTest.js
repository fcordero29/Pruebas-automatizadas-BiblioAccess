const { Builder, By, Key, until } = require('selenium-webdriver');

(async function testCrearLibro() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:3000/libros/nuevo');

        // Esperar a que el campo "titulo" esté presente
        let tituloInput = await driver.wait(until.elementLocated(By.name('titulo')), 5000);
        await tituloInput.sendKeys('El Principito');

        let anoInput = await driver.wait(until.elementLocated(By.name('anoPublicacion')), 5000);
        await anoInput.sendKeys('1943');

        let portadaInput = await driver.wait(until.elementLocated(By.name('portada')), 5000);
        await portadaInput.sendKeys('C:/Users/enman/Desktop/Proyectos/BookApp/images/Principito.png');

        let descripcionInput = await driver.findElement(By.name('descripcion'));
        await descripcionInput.sendKeys('Un libro sobre la amistad, la pérdida y el significado de la vida.');

        let categoriaSelect = await driver.findElement(By.name('categoria'));
        await categoriaSelect.sendKeys(Key.ARROW_DOWN);

        let autorSelect = await driver.findElement(By.name('autor'));
        await autorSelect.sendKeys(Key.ARROW_DOWN);

        let editorialSelect = await driver.findElement(By.name('editorial'));
        await editorialSelect.sendKeys(Key.ARROW_DOWN);

        let submitButton = await driver.findElement(By.css('button[type="submit"]'));
        await submitButton.click();

        console.log('Prueba completada con éxito');
    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        await driver.quit();
    }
})();
