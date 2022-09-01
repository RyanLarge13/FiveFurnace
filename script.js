const form = document.querySelector('form');
const targetTechTime = document.getElementById('target');
const techTime = document.getElementById('tech-time');
const currentTemp = document.getElementById('current-temp');
const futureTemp = document.getElementById('future-temp');
const submit = document.querySelector('form button');
const output = document.querySelector('.output p');
const clear = document.querySelector('.clear');
const hearthCount = 4;

//need to convert times to seconds it is always the target techtime from your last tech time
// divid by 5 and then add that result to tempeture

class Seconds {
    constructor (elem) {
        this.elem = elem
    }

    getValue() {
        return this.elem.value;
    }

    before() {
        return this.elem.substring(0, this.elem.indexOf(':'));
    }

    after() {
        return this.elem.substring(this.elem.indexOf(':') + 1);
    }

    toSeconds() {
        return this.elem * 60;
    }
};


const calc = (e) => {
    e.preventDefault();
    const minuteValue = new Seconds(targetTechTime).getValue();
    const secondsBefore = new Seconds(minuteValue).before();
    const minutesToSeconds = new Seconds(Number(secondsBefore)).toSeconds();
    const secondsValue = new Seconds(minuteValue).after();
    const totalSeconds = Number(secondsValue) + minutesToSeconds;
    calcCurrentTechTime(totalSeconds);
};

const calcCurrentTechTime = (target) => {
    const minuteValue = new Seconds(techTime).getValue();
    const secondsBefore = new Seconds(minuteValue).before();
    const minutesToSeconds = new Seconds(Number(secondsBefore)).toSeconds();
    const secondsValue = new Seconds(minuteValue).after();
    const totalSeconds = Number(secondsValue) + minutesToSeconds;
    const tempDiff = getTemp();
    convertToDegrees(target, totalSeconds, tempDiff);
};

const getTemp = () => {
    const current = new Seconds(currentTemp).getValue();
    const future = new Seconds(futureTemp).getValue();
    return Number(future) - Number(current);
};

const convertToDegrees = (target, current, temp) => {
    const result = Number((((target - current) / 5).toFixed())) + Number(temp);
    displayResult(result);
};

const displayResult = (result) => {
    if (result >= 0) output.innerHTML = `Increase the furnace by ${result} degrees.`;
    if (result < 0) output.innerHTML = `Decrease the furnace by ${result * -1} degrees`;
};

form.addEventListener('submit', calc);
clear.addEventListener('click', () => {
    form.reset();
    output.innerHTML = '';
});