let title = "Учебный проект Glo_JS";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 30000;
let rollback = 27;
let fullPrice = 50000;
let adaptive = true;

console.log(typeof (title));
console.log(typeof (fullPrice));
console.log(typeof (adaptive));
console.log("Длина строки в переменно screens:", screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей / долларов / гривен / юани ");
console.log("Стоимость разработки сайта " + fullPrice + " рублей / долларов / гривен / юани ");
console.log(screens.toLowerCase().split(" "));
console.log("Процент отката:", fullPrice * (rollback / 100));