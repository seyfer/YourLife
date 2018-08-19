'use strict';

import '../style/app.scss';

function redraw() {

    document.querySelector('title').innerHTML = APP_NAME;
    document.querySelector('.title').innerHTML = APP_NAME;

    const lifeBlock = document.querySelector('#life');
    lifeBlock.innerHTML = '';
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

    const birthDate = Date.UTC(birthYear, birthMonth, birthDay);
    const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const weeks = (today - birthDate) / (1000 * 60 * 60 * 24 * 7);

    let weekOfLife = 0;
    let div, week, yearNumber, weekClass, title;
    for (let i = 0; i <= 80; i++) {
        div = document.createElement('div');
        div.setAttribute('id', 'year_' + i);
        div.setAttribute('class', 'year');
        yearNumber = document.createElement('div');
        yearNumber.setAttribute('class', 'year_number');
        yearNumber.innerHTML = i;
        div.appendChild(yearNumber);
        for (let j = 1; j <= 52; j++) {
            weekOfLife++;
            title = '';
            week = document.createElement('div');
            week.setAttribute('id', 'week_' + weekOfLife);

            weekClass = 'week week_of_year_' + j;
            if (weekOfLife <= weeks) {
                weekClass += ' ended';
            }
            if (weekOfLife === Math.ceil(weeks)) {
                weekClass += ' current';
            }
            week.setAttribute('title', title + weekOfLife + ' week of life and ' + j + ' week of ' + i + ' year.');
            week.setAttribute('class', weekClass);
            div.appendChild(week);
        }

        lifeBlock.appendChild(div);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    redraw();
    window.onhashchange = redraw;
});
