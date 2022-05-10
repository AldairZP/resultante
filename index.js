

let btnSend = document.querySelector('.btn-send');
let select = document.querySelector('select');
let distanciaResultante = document.getElementById('distancia-resultante');
let anguloResultante = document.getElementById('angulo-resultante');
let cuadranteResultante = document.getElementById('cuadrante-resultante')
let form = document.querySelector('.inputs');
let inputD1 = document.createElement('input');
let inputD2 = document.createElement('input');
let inputD3 = document.createElement('input');
let inputD4 = document.createElement('input');
let inputD5 = document.createElement('input');
let inputD6 = document.createElement('input');
let inputD7 = document.createElement('input');
let inputD8 = document.createElement('input');
let inputA1 = document.createElement('input');
let inputA2 = document.createElement('input');
let inputA3 = document.createElement('input');
let inputA4 = document.createElement('input');
let inputA5 = document.createElement('input');
let inputA6 = document.createElement('input');
let inputA7 = document.createElement('input');
let inputA8 = document.createElement('input');


inputD1.classList.add('distancia');
inputA1.classList.add('angulo');
inputD2.classList.add('distancia');
inputA2.classList.add('angulo');
inputD3.classList.add('distancia');
inputA3.classList.add('angulo');
inputD4.classList.add('distancia');
inputA4.classList.add('angulo');
inputD5.classList.add('distancia');
inputA5.classList.add('angulo');
inputD6.classList.add('distancia');
inputA6.classList.add('angulo');
inputD7.classList.add('distancia');
inputA7.classList.add('angulo');
inputD8.classList.add('distancia');
inputA8.classList.add('angulo');
inputD1.type = 'number';
inputA1.type = 'number';
inputD2.type = 'number';
inputA2.type = 'number';
inputD3.type = 'number';
inputA3.type = 'number';
inputD4.type = 'number';
inputA4.type = 'number';
inputD5.type = 'number';
inputA5.type = 'number';
inputD6.type = 'number';
inputA6.type = 'number';
inputD7.type = 'number';
inputA7.type = 'number';
inputD7.type = 'number';
inputA7.type = 'number';

let inputsD = [inputD1, inputD2, inputD3, inputD4, inputD5, inputD6, inputD7, inputD8];
let inputsA = [inputA1, inputA2, inputA3, inputA4, inputA5, inputA6, inputA7, inputA8];
let vects = [];


// CLASE VECTOR

class Vector {
    constructor(angulo, distancia) {
        this.angulo = angulo;
        this.distancia = distancia;
    }
}

// CLASE RESULTANTE

class Resultante {
    constructor() {
        this.sumY = this.sumY();
        this.sumX = this.sumX();
        this.distancia = this.distancia();
        this.angulo = this.angulo();
        this.cuadrante = this.cuadrante();
    }

    sumX() {
        let sumX = 0;
        vects.forEach((val, index) => {
            sumX = sumX + (vects[index].distancia * (Math.cos(vects[index].angulo * (Math.PI / 180))));
        });
        return sumX;
    }

    sumY() {
        let sumY = 0;
        vects.forEach((val, index) => {
            sumY = sumY + (vects[index].distancia * (Math.sin(vects[index].angulo * (Math.PI / 180))));
        });
        return sumY;
    }

    distancia() {
        let D = Math.sqrt((this.sumY ** 2) + (this.sumX ** 2));
        if (D % 1 == 0) {
            return D.toFixed(0);
        } else {
            return D.toFixed(4);
        }
    }

    angulo() {
        let A = Math.atan(this.sumY / this.sumX) * (180 / Math.PI);
        if (A == Math.abs(A)) {
        } else if (this.sumX < 0 && this.sumY > 0) {
            A += 180;
        } else if (this.sumX < 0 && this.sumY < 0) {
            A += 270;
        } else if (this.sumX > 0 && this.sumY < 0) {
            A += 360;
        }
        if (A % 1 == 0) {
            return A.toFixed(0);
        } else {
            return A.toFixed(4);
        }
        
    }

    cuadrante() {
        if (this.angulo < 90) {
            return 'Primer Cuadrante'
        } else if (this.angulo < 180) {
            return 'Segundo Cuadrante'
        } else if (this.angulo < 270) {
            return 'Tercer Cuadrante'
        } else {
            return 'Cuarto Cuadrante'
        }
    }

}


// EVENTO DE ESCUCHA SELECT

select.addEventListener('change', (e) => {
    const valueSelect = select.value;
    let count = form.childElementCount / 2;
    if (valueSelect > count) {
        for (let i = count; i < valueSelect; i++) {
            form.appendChild(inputsD[i]);
            form.appendChild(inputsA[i]);
        }
    } else if (valueSelect < count) {
        for (let i = valueSelect; i < count; i++) {
            form.removeChild(form.lastElementChild);
            form.removeChild(form.lastElementChild);
        }
    }
});


// EVENTO DE ESCUCHA BOTON SEND

btnSend.addEventListener('click', (e) => {
    let valueDistancia = document.querySelectorAll('.distancia');
    let valueAngulo = document.querySelectorAll('.angulo');
    let distancia;
    let angulo;
    vects = [];
    for (let i = 0; i <= select.value - 1; i++) {
        distancia = parseFloat(valueDistancia[i].value);
        angulo = parseFloat(valueAngulo[i].value);
        if (isNaN(angulo)) {
            angulo = 0;
        }
        if (isNaN(distancia)) {
            distancia = 0;
        }
        if (distancia != 0) {
            vects[i] = new Vector(angulo, distancia);
        }
    }
    const resultante = new Resultante;
    distanciaResultante.textContent = `La resultante tiene una magnitud de ${resultante.distancia},`  ;
    anguloResultante.textContent = `Su ángulo es de ${resultante.angulo}°,`;
    cuadranteResultante.textContent = `Y está en el ${resultante.cuadrante}.`;
    resultante.distancia = 0;
    resultante.angulo = 0;
});








