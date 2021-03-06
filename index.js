let spedGameIndex = 1;
let playerAccount = 0;

const n = 100;
const numbOfCell = 9;
const app = document.querySelector('.app');
const h3 = document.querySelector('.app h3');
const cellsBox = document.querySelector('.cells-box');

const config = {
    spedGameIndex,
    n,
    numbOfCell,
    playerAccount,
    app,
    h3,
    cellsBox,
};

class App {
    constructor({ spedGameIndex, n, numbOfCell, playerAccount, app, h3, cellsBox }) {
        this.n = n;
        this.spedGameIndex = spedGameIndex;
        this.numbOfCell = numbOfCell;
        this.playerAccount = playerAccount;
        this.app = app;
        this.h3 = h3;
        this.cellsBox = cellsBox;

        this.data = [];
        this.newData = [];
        this.objRemove = [];
        this.start = 0;

        this.dataInterval2;
        this.dataUnterval3;

        this.appInit();
    };

    handlerCountUpClick = (evt) => {
        if (evt.target.innerText === '') {
            this.playerAccount = this.playerAccount - 3;
            this.playerAccount < 0 ? this.renderGameOverOrWin('Game Over') : this.renderCount();
        } else {

            const elementId = parseInt(evt.target.dataset.id);
            this.playerAccount = this.playerAccount + parseInt(evt.target.innerText);

            this.data[elementId].value = '';
            this.newData.push(this.data[elementId]);

            this.objRemove.map((it,index, array) => {
                    if(it.id == elementId) {
                        array.splice(it, 1);
                        array.push(it);
                    }
                }
            );

            console.log(  this.objRemove);

            this.render(this.data);
            this.renderCount();

        }
    };

    getRandomNumbers(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    getRandomItemArray(items, value, data) {

        if (items.length != 0) {
            const item = items[Math.floor(Math.random() * items.length)];

            items.splice(items.indexOf(item), 1);
            data[item?.id].value = value;

            this.objRemove.push(item.id);
        }
    };

    addCell() {
        this.dataInterval2 = setInterval(() => {
            const randomNumber = this.getRandomNumbers(3, 0);

            this.getRandomItemArray(this.newData, randomNumber, this.data);

            this.render(this.data);

        }, 2000 / this.spedGameIndex);
    };

    removeCell() {
        // clear random
        this.dataInterval3 = setInterval(() => {
            const firstRenderElem = this.data[this.objRemove[0]];
            firstRenderElem.value = '';
            this.newData.push(firstRenderElem);
            this.objRemove.shift();

            this.render(this.data);
        }, 3000 / this.spedGameIndex);
    };

    randomChangeCell() {
        this.newData = [...this.data];
        this.start = new Date().getSeconds() + 2;

            this.addCell();
            this. removeCell();
            this.checkedGameStatus();
            this.checkedBonusStatus()
    }

    checkedGameStatus() {
        const overOrVinInterval = setInterval(() => {
            if (this.newData.length == 0) {
                this.renderGameOverOrWin('Game Over');

                clearInterval(overOrVinInterval);
            }
            if (this.playerAccount >= this.n) {
                this.renderGameOverOrWin('Congratulations on this victory');

                clearInterval(overOrVinInterval);
            }

        }, 500);
    };

    checkedBonusStatus() {
        const bonusInterval = setInterval(() => {
            const end = new Date().getSeconds();
            const sumTime = end - this.start;

            if (sumTime <= 10 && this.playerAccount >= 10) {
                this.playerAccount = this.playerAccount + 10;
                this.renderCount();
                clearInterval(bonusInterval);
            }
        }, 500);
    }

    dataCreate() {
        for (let i = 0; i <= this.numbOfCell - 1; i++) {
            const id = i;
            const value = "";
            const item = { id, value };

            this.data.push(item);
        }
    };

    render(data) {
        this.cellsBox.innerHTML = "";
        const items = data;
        items.map(it => {
            const { value } = it;
            const item = document.createElement('div');
            const itemP = document.createElement('p');

            item.classList.add('cells-box__item');
            itemP.innerText = value;

            item.dataset.id = it.id;
            itemP.dataset.id = it.id;


            item.appendChild(itemP);
            this.cellsBox.classList.add('started');
            this.cellsBox.appendChild(item);

            item.addEventListener('click', this.handlerCountUpClick);


        });
    };

    renderCount() {
        const span = document.createElement('span');

        this.h3.innerText = 'Player Account: ';
        this.h3.appendChild(span);
        span.innerText = this.playerAccount;
    }

    renderGameOverOrWin(text) {
        const gageOver = document.createElement('h2');

        clearInterval(this.dataInterval2);
        clearInterval(this.dataInterval3);
        this.app.innerHTML = '';
        this.app.appendChild(gageOver);
        gageOver.innerText = text;
    }

    appInit() {
        this.renderCount();
        this.dataCreate();
        this.randomChangeCell();
    }
}

new App(config);
