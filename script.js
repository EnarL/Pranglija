const display = document.getElementById('vastus');

function jsDisplay(input){
    vastus.value += input;
}

function clearDisplay(){
  vastus.value = "";
}

function calculate(){
    vastus.value = eval(display.value);
}
let punktid = 0;
const punktidElement = document.getElementById('punktid');
punktidElement.textContent = punktid;
function suurendaPunkte(tasemeNumber) {

    punktid+= juhuslikArv(4,7) * tasemeNumber;
    punktidElement.textContent = punktid;
}

let tasemeNumber = 1;
const taseElement = document.getElementById('tasemeNumber');
taseElement.textContent = tasemeNumber;
let oigeVastus = genereeriTehe(tasemeNumber);
let oigeteVastusteArv = 0;
const oigeteVastusteArvElement = document.getElementById('oigeteVastusteArv');

function suurendaTaset() {
    if (oigeteVastusteArv === 5){
        tasemeNumber+=1;
        taseElement.textContent = tasemeNumber;
        oigeteVastusteArv = 0;
    }
}
function juhuslikArv(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function minMax(tasemeNumber){
    let min, max;
    let url = document.URL;
    let filename = url.substring(url.lastIndexOf('/')+1);
    switch(filename){
        default :
            switch(tasemeNumber){
                case 1:
                    min = 1;
                    max = 10;
                    break;
                case 2:
                    min = 30;
                    max = 50;
                    break;
                case 3:
                    min = 50;
                    max = 100;
                    break;
                case 4:
                    min = 200;
                    max = 500;
                    break;
                case 5:
                    min = 500;
                    max = 1000;
                    break;
                case 6:
                    min = 1000;
                    max = 2000;
                    break;
                case 7:
                    min = 2000;
                    max = 5000;
                    break;
            }
            break;
    case 'jagamine.html':
        switch(tasemeNumber){
            case 1:
                min = 1;
                max = 10;
                break;
            case 2:
                min = 10;
                max = 30;
                break;
            case 3:
                min = 20;
                max = 70;
                break;
            case 4:
                min = 50;
                max = 150;
                break;
            case 5:
                min = 50;
                max = 300;
                break;
            case 6:
                min = 100;
                max = 700;
                break;
            case 7:
                min = 400;
                max = 2500;
                break;
        }
        break;
        case 'korrutamine.html':
            switch(tasemeNumber){

                case 1:
                    min = 1;
                    max = 10;
                    break;
                case 2:
                    min = 5;
                    max = 20;
                    break;
                case 3:
                    min = 7;
                    max = 25;
                    break;
                case 4:
                    min = 10;
                    max = 50;
                    break;
                case 5:
                    min = 25;
                    max = 80;
                    break;
                case 6:
                    min = 50;
                    max = 125;
                    break;
                case 7:
                    min = 100;
                    max = 250;
                    break;
            }
            break;
}
    return [min, max];
}

function genereeriTehe(tasemeNumber){
    let arv1 = juhuslikArv(minMax(tasemeNumber)[0], minMax(tasemeNumber)[1]);
    let arv2 = juhuslikArv(minMax(tasemeNumber)[0], minMax(tasemeNumber)[1]);
    let arv3 = juhuslikArv(minMax(tasemeNumber)[0], minMax(tasemeNumber)[1]);
    let vastus1 = arv1+arv2;
    let vastus2 = arv1+arv2+arv3;
    let operation;
    let url = document.URL;
    let filename = url.substring(url.lastIndexOf('/')+1);
    switch(filename){
        case 'jagamine.html':
            operation = 4;
            break;
        case 'lahutamine.html':
            operation = 2;
            break;
        case 'korrutamine.html':
            operation = 3;
            break;
        case 'liitmine.html':
            operation = 1;
            break;
        default:
            operation = 5;
            break;

    }
    switch(operation) {
        case 1: // Addition
            document.getElementById('tehe').innerText = `${arv1} + ${arv2} = `;
            return arv1 + arv2;
        case 2: // Subtraction
            document.getElementById('tehe').innerText = `${arv1} - ${arv2} = `;
            return arv1 - arv2;
        case 3: // Multiplication
            document.getElementById('tehe').innerText = `${arv1} * ${arv2} = `;
            return arv1 * arv2;
        case 4:// Division
            arv2 = juhuslikArv(minMax(tasemeNumber)[0], minMax(tasemeNumber)[1]);
            arv1 = arv2 * juhuslikArv(1 * tasemeNumber, 10 + tasemeNumber * tasemeNumber - 1); // arv1 is a multiple of arv2
            document.getElementById('tehe').innerText = `${arv1} / ${arv2} = `;
            return arv1 / arv2;



        case 5: // filling the gap
            if (tasemeNumber === 1) {
               document.getElementById('tehe').innerText = `${arv1} + ___ = ${vastus1}`;

                return arv2;

            }
            else{

                let random = juhuslikArv(1,2);
                if (random === 1){
                    document.getElementById('tehe').innerText = `${arv1} + ${arv2}  + ___ = ${vastus2}`;
                    return arv3;
                }
                else{

                    document.getElementById('tehe').innerText = `${arv1} + ___ + ${arv3} = ${vastus2}`;

                    return arv2;
                }

            }


    }
}

function kontrolliVastust() {
    const kasutajaVastus = parseInt(document.getElementById('vastus').value);

    if (kasutajaVastus === oigeVastus) {
        oigeteVastusteArv++;
        suurendaPunkte(tasemeNumber);

        if (tasemeNumber === 7 && oigeteVastusteArv === 5) {
            document.getElementById('vastus').value = '';
            alert("Harjutus edukalt läbitud!")
            alert("Sinu punktisumma on: " + punktid);
            reset();
        }
        suurendaTaset();
        oigeVastus = genereeriTehe(tasemeNumber);
        document.getElementById('vastus').value = '';
        document.getElementById('vastus').focus();
    } else {
        oigeteVastusteArv--;
        clearDisplay();
    }
}

let aeg = 150;
const countdownElement = document.getElementById('ajanaitaja');
countdownElement.textContent = aeg;
function updateCountdown() {
    countdownElement.textContent = aeg;
    if (aeg > 0) {
        aeg--;}
    else {
        alert("Aeg on otsas!");
        clearInterval(countdownInterval);
        reset();
    }
}
countdownInterval = setInterval(updateCountdown, 1000);


function reset(){
    punktid =0;
    punktidElement.textContent = punktid;
    tasemeNumber = 1;
    taseElement.textContent = tasemeNumber;
    aeg = 150;
    countdownElement.textContent = aeg;
    oigeVastus = genereeriTehe(tasemeNumber);
    document.getElementById('vastus').value = '';
    oigeteVastusteArv = 0;
    clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
}

function login(event) {
    event.preventDefault();
    const user = document.getElementById('username').value;
    const parool = document.getElementById('password').value;
    if (user === 'test' && parool === 'parool') {
        alert("Sisselogimine õnnestus!");
        window.location.href = 'games.html';
    }
    else{
        alert("Vale kasutajanimi või parool!");
    }
}
document.getElementById('vastus').addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        kontrolliVastust();
    }
});


document.getElementById('vastus').focus();