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
    if (oigeteVastusteArv == 5){
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
    switch(tasemeNumber){
        case 1: 
            min = 1;
            max = 10;
            break;
        case 2:
            min =10;
            max = 30;
            break;
        case 3:
            min = 30;
            max = 50;
            break;
        case 4:
            min = 50;
            max = 100;
            break;
        case 5:
            min = 100;
            max = 200;
            break;
    }
    return [min, max];
}

function genereeriTehe(tasemeNumber){
    const arv1 = juhuslikArv(minMax(tasemeNumber)[0], minMax(tasemeNumber)[1]);
    const arv2 = juhuslikArv(minMax(tasemeNumber)[0], minMax(tasemeNumber)[1]);
    document.getElementById('tehe').innerText = `${arv1} + ${arv2} = `;
    return arv1+arv2;
}
function kontrolliVastust() {
    const kasutajaVastus = parseInt(document.getElementById('vastus').value);
    
    if (kasutajaVastus == oigeVastus) {
        suurendaPunkte(tasemeNumber)
        oigeteVastusteArv++;
        if (tasemeNumber == 5 && oigeteVastusteArv == 5) {
            alert("Harjutus edukalt läbitud!")
            reset();
            
        }

        suurendaTaset();
        oigeVastus = genereeriTehe(tasemeNumber);
        document.getElementById('vastus').value = '';
        
    }
     else {
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
        clearInterval(countdownInterval);
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