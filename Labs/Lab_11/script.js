'use strict';

let elements = document.querySelectorAll('ul li');

for (let element of elements) {
    element.innerHTML = 'Hello World!'
}

function printError(name) {
    console.error(name)
}