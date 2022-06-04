'use strict';

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 27,
  fullPrice: 0,
  allServicePrices: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");

    do {
      appData.screenPrice = Number(appData.screenPrice = prompt("Сколько будет стоить данная работа?"));
      // Number() обрезает пробелы, а так же преобразует NULL в 0
    }
    while (!appData.isNumber(appData.screenPrice));

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }

      do {
        sum = Number(sum = prompt("Сколько это будет стоить?"));
      }
      while (!appData.isNumber(sum));
      sum += sum;
    }
    return sum;
  },
  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function (name) {
    name = name.trim();
    return name[0].toUpperCase() + name.substring(1).toLowerCase();
  },
  getServicePercentPrices: function (fPrice, manyback) {
    return Math.ceil(fPrice - (fPrice * (manyback / 100)));
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
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.title = appData.getTitle(appData.title);
    appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);

    appData.logger();
  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    for (let key in appData) {
      console.log("Ключ: " + key + " " + "Значение: " + appData[key]);
    }
  }
};

appData.start();