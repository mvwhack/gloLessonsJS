'use strict';

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  fullPrice: 0,
  allServicePrices: 0,
  servicePercentPrice: 0,
  services: {},
  asking: function () {

    do {
      appData.title = prompt("Как называется ваш проект?");
    }
    while (appData.isNumber(appData.title));

    for (let i = 0; i < 2; i++) {
      let name = '';
      let price = 0;

      do {
        name = prompt("Какие типы экранов нужно разработать?");
      }
      while (appData.isNumber(name));

      do {
        price = Number(price = prompt("Сколько будет стоить данная работа?"));
      }
      while (!appData.isNumber(price));

      appData.screens.push({
        id: i,
        name: name,
        price: price
      });

    }

    for (let i = 0; i < 2; i++) {
      let name = '';
      let price = 0;

      do {
        name = i + prompt("Какой дополнительный тип услуги нужен?");
      }
      while (appData.isNumber(name));

      do {
        price = Number(price = prompt("Сколько это будет стоить?"));
      }
      while (!appData.isNumber(price));

      appData.services[name] = +price;

    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function () {
    let initialValue = 0;
    appData.screenPrice = appData.screens.reduce(function (sum, velue) {
      return sum + velue.price;
    }, initialValue);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function (name) {
    name = name.trim();
    appData.title = name[0].toUpperCase() + name.substring(1).toLowerCase();
  },
  getServicePercentPrices: function (fPrice, manyback) {
    appData.servicePercentPrice = Math.ceil(fPrice - (fPrice * (manyback / 100)));
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price < 15000 && price >= 0) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getTitle(appData.title);
    appData.getServicePercentPrices(appData.fullPrice, appData.rollback);

    appData.logger();
  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.services);
    console.log(appData.screens);

    console.log(appData.screenPrice);

    for (let key in appData) {
      console.log("Ключ: " + key + " " + "Значение: " + appData[key]);
    }
  }
};

appData.start();