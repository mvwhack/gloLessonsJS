'use strict';

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

let rollback = 27;
let fullPrice;
let allServicePrices;
let servicePercentPrice;

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

//Сумма всех доп услуг
const getAllServicePrices = function (price1, price2) {
  return price1 + price2;
};

//Общая стоимость верстки и доп услуг
function getFullPrice(num) {
  return num + allServicePrices;
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

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice);
title = getTitle(title);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

//вызовы функции showTypeOf
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(' ')); //вывод строки с типами экранов для разработки screens
console.log(servicePercentPrice); //стоимость за вычетом процента отката
console.log(getRollbackMessage(servicePercentPrice)); //сообщение о скидке пользователю