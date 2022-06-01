'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 27;
let fullPrice;
let allServicePrices;
let servicePercentPrice;
let service1;
let service2;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Как называется ваш проект?", "Калькулятор верстки");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");

  do {
    screenPrice = Number(screenPrice = prompt("Сколько будет стоить данная работа?"));
    // Number() обрезает пробелы, а так же преобразует NULL в 0
  }
  while (!isNumber(screenPrice));

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

//Сумма всех доп услуг
const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?");
    }

    do {
      sum = Number(sum = prompt("Сколько это будет стоить?"));
    }
    while (!isNumber(sum));
    sum += sum;
  }
  return sum;
};

//Общая стоимость верстки и доп услуг
function getFullPrice() {
  return screenPrice + allServicePrices;
}

//Изменение Title
function getTitle(name) {
  name = name.trim();
  return name[0].toUpperCase() + name.substring(1).toLowerCase();
}

//Итоговая стоимость за вычетом отката
function getServicePercentPrices(fPrice, manyback) {
  return Math.ceil(fPrice - (fPrice * (manyback / 100)));
}

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price < 15000 && price >= 0) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
title = getTitle(title);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

//вызовы функции showTypeOf
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(allServicePrices);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(screens.toLowerCase().split(' ')); //вывод строки с типами экранов для разработки screens
console.log(servicePercentPrice); //стоимость за вычетом процента отката
console.log(getRollbackMessage(servicePercentPrice)); //сообщение о скидке пользователю