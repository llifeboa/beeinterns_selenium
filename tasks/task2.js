require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver;

(async () => {
	let options = new chrome.Options().addArguments('--disable-notifications');
	driver = await new Builder()
		.forBrowser('chrome')
		.setChromeOptions(options)
		.build();

	await driver.get(
		'https://moskva.beeline.ru/shop/catalog/telefony/smartfony/'
	);

	let showAllButton = await driver.findElement(
		By.xpath(
			'//span[starts-with(@class,"FiltersHeader_name")][text()="Производитель"]/../../div[starts-with(@class, "ShowAllButton_wrapper")]'
		)
	);
	await showAllButton.click();

	let brend = await driver.findElement(
		By.xpath('//input[@id="checkbox__proizvoditel_proizvoditel-apple"]')
	);
	await brend.click();

	let priceFilter = await driver.findElement(
		By.xpath(
			'//span[starts-with(@class, "FilterTabs_conten")][text()=" Цене"]/..'
		)
	);

	await priceFilter.click();
	await driver.wait(until.urlContains('sort=1'), 10000);

	let buyButtons = await driver.findElements(
		By.xpath(
			'//div[starts-with(@class, "BuyButtonLayout_wrapper")]//button'
		)
	);

	await driver.wait(
		until.elementIsVisible(buyButtons[buyButtons.length / 2]),
		10000
	);
	await buyButtons[buyButtons.length / 2].click();

	let removeItemButton = await driver.findElement(
		By.xpath('//span[starts-with(@class, "modify-link")]')
	);

	await driver.wait(until.elementIsVisible(removeItemButton), 10000);
	await removeItemButton.click();

	let serviceNote = await driver.findElement(
		By.xpath('//div[starts-with(@class, "shop-basket-item-service-note")]')
	);

	await driver.wait(
		until.elementLocated(
			By.xpath(
				'//div[starts-with(@class, "shop-basket-item-repair-link-wrap")]'
			)
		),
		10000
	);

	let restoreButton = await serviceNote.findElement(
		By.xpath(
			'//div[starts-with(@class, "shop-basket-item-repair-link-wrap")]//span'
		)
	);

	await restoreButton.click();

	await driver.quit();
})();
