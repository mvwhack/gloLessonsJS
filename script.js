'use strict';

let title = prompt("Как называется ваш проект?");

let screens = prompt("Какие типы экранов нужно разработать?");
if (screens === null) {
  screens = "Пользователь не передал информацию";
}

let screenPrice = +prompt("Сколько будет стоить данная работа?");
if (screenPrice === null) {
  screenPrice = 0;
}

let rollback = 27;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
if (service1 === null) {
  service1 = "Пользователь не передал информацию";
}

let servicePrice1 = +prompt("Сколько это будет стоить?");
if (servicePrice1 === null) {
  servicePrice1 = 0;
}

let service2 = prompt("Какой дополнительный тип услуги нужен?");
if (service2 === null) {
  service2 = "Пользователь не передал информацию";
}

let servicePrice2 = +prompt("Сколько это будет стоить?");
if (servicePrice2 === null) {
  servicePrice2 = 0;
}

let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback / 100)));
console.log(servicePercentPrice);

if (fullPrice >= 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice < 15000 && fullPrice >= 0) {
  console.log("Скидка не предусмотрена");
} else if (fullPrice < 0) {
  console.log("Что то пошло не так");
}


console.log(typeof (title));
console.log(typeof (fullPrice));
console.log(typeof (adaptive));
console.log("Длина строки в переменно screens:", screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей / долларов / гривен / юани ");
console.log("Стоимость разработки сайта " + fullPrice + " рублей / долларов / гривен / юани ");
console.log(screens.toLowerCase().split(" "));
console.log("Процент отката:", fullPrice * (rollback / 100));