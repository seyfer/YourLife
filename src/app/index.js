'use strict';

import '../style/app.scss';

class YourLifeManager {
    constructor() {
        this.birthDate = null;
        this.weekOfLife = 0;
        this.pastWeeks = 0;
        this.lifeBlock = document.querySelector('#life');

        this.events();
    }

    events() {
        const self = this;

        document.addEventListener('DOMContentLoaded', function() {
            self.redraw();
            window.onhashchange = self.redraw;
        });
    }

    _setAppName() {
        if (typeof APP_NAME !== 'undefined') {
            document.querySelector('title').innerHTML = APP_NAME;
            document.querySelector('.title').innerHTML = APP_NAME;
        }
    }

    _initBirthDate() {
        const now = new Date();
        const matches = window.location.hash.match(/#(\d{4})\.(\d{1,2})\.(\d{1,2})/);

        let birthYear, birthMonth, birthDay;
        if (matches && matches.length > 0) {
            birthYear = parseInt(matches[1], 10);
            birthMonth = parseInt(matches[2], 10);
            birthDay = parseInt(matches[3], 10);
        } else {
            birthYear = prompt('What year were you born in?', 1980);
            birthMonth = prompt('What month(number) were you born in?', 1);
            birthDay = prompt('What day were you born in?', 1);
        }

        if (birthYear < 1900 || birthYear > now.getFullYear()) {
            alert('Wrong year!');
            return;
        }

        if (birthMonth < 1 || birthMonth > 12) {
            alert('Wrong month!');
            return;
        }

        if (birthDay < 1 || birthDay > 31) {
            alert('Wrong day!');
            return;
        }

        this.birthDate = Date.UTC(birthYear, birthMonth, birthDay);
    }

    _initPastWeeks() {
        const now = new Date();
        const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
        this.pastWeeks = (today - this.birthDate) / (1000 * 60 * 60 * 24 * 7);
    }

    redraw() {
        this._setAppName();

        this.lifeBlock.innerHTML = '';

        this._initBirthDate();
        this._initPastWeeks();

        for (let yearIndex = 0; yearIndex <= 80; yearIndex++) {
            const yearContainer = this._fillYear(yearIndex);

            this.lifeBlock.appendChild(yearContainer);
        }
    }

    _fillYear(yearIndex) {
        const yearContainer = document.createElement('div');
        yearContainer.setAttribute('id', 'year_' + yearIndex);
        yearContainer.setAttribute('class', 'year');
        const yearNumber = document.createElement('div');
        yearNumber.setAttribute('class', 'yearNumber');
        yearNumber.innerHTML = yearIndex.toString();
        yearContainer.appendChild(yearNumber);

        for (let weekIndex = 1; weekIndex <= 52; weekIndex++) {
            this.weekOfLife++;
            const weekFilled = this._fillYearWeek(yearIndex, weekIndex);
            yearContainer.appendChild(weekFilled);
        }

        return yearContainer;
    }

    _fillYearWeek(yearIndex, weekIndex) {
        let weekClass;

        const week = document.createElement('div');
        week.setAttribute('id', 'week_' + this.weekOfLife);

        weekClass = '';
        if (this.weekOfLife <= this.pastWeeks) {
            weekClass += ' ended';
        }
        if (this.weekOfLife === Math.ceil(this.pastWeeks)) {
            weekClass += ' current';
        }
        week.setAttribute('title', this.weekOfLife + ' week of life and ' + weekIndex + ' week of ' + yearIndex + ' year.');
        if (weekClass.length > 0) week.setAttribute('class', weekClass);

        return week;
    }
}

new YourLifeManager();
