require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');

let driver;

(async () => {
	driver = await new Builder().forBrowser('chrome').build();
	await driver.get('https://moskva.beeline.ru/shop/');
	await driver.wait(
		until.elementLocated(
			By.css('a[href="/shop/catalog/telefony/smartfony/"]')
		),
		10000
	);
	let link = await driver.findElement(
		By.css('a[href="/shop/catalog/telefony/smartfony/"]')
	);

	console.log('\nLink : \n', await link.getAttribute('outerHTML'));

	await driver.get(
		'https://moskva.beeline.ru/shop/catalog/telefony/smartfony/'
	);
	let priceFilterContainer = await driver.findElement(
		By.css('div[class^="RangeFilter"]')
	);
	let inputs = await priceFilterContainer.findElements(By.css('input'));
	let inputsHTML = await Promise.all(
		inputs.map(async item => item.getAttribute('outerHTML'))
	);
	console.log('\nInputs : \n', inputsHTML);

	let showAllButton = await driver.findElement(
		By.xpath(
			'//span[starts-with(@class,"FiltersHeader_name")][text()="Производитель"]/../../div[starts-with(@class, "ShowAllButton_wrapper")]'
		)
	);
	console.log(
		'\nShow All : \n',
		await showAllButton.getAttribute('outerHTML')
	);

	let brend = await driver.findElement(
		By.xpath('//input[@id="checkbox__proizvoditel_proizvoditel-apple"]')
	);
	console.log('\nApple Checkbox : \n', await brend.getAttribute('outerHTML'));

	let priceFilter = await driver.findElement(
		By.xpath(
			'//span[starts-with(@class, "FilterTabs_conten")][text()=" Цене"]/..'
		)
	);
	console.log(
		'\nPrice Filter : \n',
		await priceFilter.getAttribute('outerHTML')
	);

	let productCardHeaders = await driver.findElements(
		By.xpath('//div[starts-with(@class, "ProductCard_header")]')
	);
	let productCardHeadersHTML = await Promise.all(
		productCardHeaders.map(async item => item.getAttribute('outerHTML'))
	);
	console.log('\nProduct Card Headers : \n', productCardHeadersHTML);

	let productCardPrice = await driver.findElements(
		By.xpath(
			'//div[starts-with(@class, "ProductCard_component")]//div[contains(@class, "Heading_h3")]/div[starts-with(@class, "InlineSet_container")]/div[starts-with(@class, "InlineSet_item")][1]'
		)
	);
	let productCardPriceHTML = await Promise.all(
		productCardPrice.map(async item => item.getText())
	);
	console.log('\nProduct Card Price : \n', productCardPriceHTML);

	let buyButton = await driver.findElement(
		By.xpath('//div[starts-with(@class, "BuyButtonLayout_wrapper")]')
	);
	console.log('\nBuy Button : \n', await buyButton.getAttribute('outerHTML'));

	await buyButton.click();

	let removeItemButton = await driver.findElement(
		By.xpath('//span[starts-with(@class, "modify-link")]')
	);
	console.log(
		'\nRemove Button : \n',
		await removeItemButton.getAttribute('outerHTML')
	);
	await driver.wait(until.elementIsVisible(removeItemButton), 10000);

	await removeItemButton.click();

	let serviceNote = await driver.findElement(
		By.xpath('//div[starts-with(@class, "shop-basket-item-service-note")]')
	);
	console.log(
		'\nNote Element : \n',
		await serviceNote.getAttribute('outerHTML')
	);

	let restoreButton = await serviceNote.findElement(
		By.xpath(
			'//div[starts-with(@class, "shop-basket-item-repair-link-wrap")]'
		)
	);
	console.log(
		'\nRestore Link : \n',
		await restoreButton.getAttribute('outerHTML')
	);

	await driver.quit();
})();
