'use strict';

const title = document.getElementsByTagName('h1')[0];
const btnPlus = document.querySelector('.screen-btn');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback > .main-controls__range > [type=range]');
const inputRangeValue = document.querySelector('.rollback > .main-controls__range > .range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

const cms = document.getElementById('cms-open');

let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  fullPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  totalCount: 0,
  err: false,
  init: function () {
    this.addTitle();

    startBtn.addEventListener('click', this.checkBtn);
    btnPlus.addEventListener('click', this.addScreenBlock);
    inputRange.addEventListener('input', this.addRollback);
    resetBtn.addEventListener('click', this.reset);
    cms.addEventListener('click', this.cms);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    this.addServices();
    this.addScreens();
    this.addPrices();
    this.showResult();
    this.logger();
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalCount.value = this.totalCount;
  },
  checkBtn: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      if (selectName == select.options[0].textContent) {
        appData.err = true;
      } else if (input.value == 0) {
        appData.err = true;
      } else {
        appData.err = false;
      }
    });

    // НАДО ПОПРАВИТЬ
    if (appData.err !== true) {
      appData.start();
      appData.block();
    }
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value
      });

    });
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }

    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }

    });

  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },
  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }

    for (let screen of this.screens) {
      this.totalCount += +screen.count;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
  },
  addRollback: function () {
    inputRange.addEventListener('input', () => {
      inputRangeValue.textContent = inputRange.value + '%';
      this.rollback = +inputRange.value;

      //Сумма пересчитываеться с учетом реального значения процента отката
      if (totalCountRollback.value != 0) {
        totalCountRollback.value = this.fullPrice - (this.fullPrice * (this.rollback / 100));
      }
    });
  },
  cms: function () {
    const cmsBlock = document.querySelector('.hidden-cms-variants');
    cmsBlock.style.display = 'flex';

    // console.dir(cmsBlock);
    // cmsBlock.forEach((screen, index) => {
    //   const select = screen.querySelector('select');
    //   const input = screen.querySelector('input');
    //   const selectName = select.options[select.selectedIndex].textContent;

    //   console.log(select);
    //   console.log(input);
    //   console.log(selectName);
    // this.screens.push({
    //   id: index,
    //   name: selectName,
    //   price: +select.value * +input.value,
    //   count: +input.value

  },
  block: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      check.disabled = true;

    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      check.disabled = true;
    });
    screens.forEach((item) => {
      const input = item.querySelectorAll('input[type=text]');
      const select = item.childNodes[1].querySelector('select');

      input[0].disabled = true;
      select.disabled = true;
    });

    startBtn.style.display = 'none';
    resetBtn.style.display = 'flex';
  },
  reset: function () {
    appData.unBlock();
    appData.resetValue();
    appData.removeScreens();

  },
  unBlock: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      check.removeAttribute('disabled');

    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      check.removeAttribute('disabled');
    });
    screens.forEach((item) => {
      const input = item.querySelectorAll('input[type=text]');
      const select = item.childNodes[1].querySelector('select');

      input[0].removeAttribute('disabled');
      select.removeAttribute('disabled');
    });

    startBtn.style.display = 'flex';
    resetBtn.style.display = 'none';
  },
  resetValue: function () {
    total.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totalCountRollback.value = 0;
    totalCount.value = 0;
    appData.screens = [];
    appData.screenPrice = 0;
    appData.adaptive = true;
    appData.rollback = 0;
    appData.fullPrice = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
    appData.servicePercentPrice = 0;
    appData.servicesPercent = {};
    appData.servicesNumber = {};
    appData.totalCount = 0;

    console.log(this);
  },
  removeScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      if (selectName !== select.options[0].textContent) {
        select.value = '';
      }
      input.value = 0;
    });

    screens.forEach(function (screen, index) {
      if (index !== 0) {
        screen.remove();
      }
    });
  },
  logger: function () {
    console.log(this);
  }
};

appData.init();