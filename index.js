const app = document.querySelector('.app');
const h3 = document.querySelector('.app h3');
const cellsBox = document.querySelector('.cells-box');
const cellsBoxItem = document.querySelector('.cells-box__item');

const n = 27;
const numbOfCell = 9;

let playerAccount = 0;

const config = {
    n,
    numbOfCell,
    playerAccount,
    app,
    h3,
    cellsBox,
    cellsBoxItem,
};


class App {
    constructor({ n, numbOfCell, playerAccount, app, h3, cellsBox, cellsBoxItem, }) {
        this.n = n;

        this.numbOfCell = numbOfCell;
        this.playerAccount = playerAccount;


        this.app = app;
        this.h3 = h3;

        this.cellsBox = cellsBox;

        this.cellsBoxItem = cellsBoxItem;

        this.data = [];
        this.newData = [];


        this.appInit();
    };

    handlerCountUpClick = (evt) => {
        this.playerAccount = this.playerAccount + parseInt(evt.target.innerText);
        this.renderCount();
    };

    appInit() {
        this.renderCount();
        this.dataCreate();
        this.randomChangeCell();
    }

    getRandomNumbers(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    getRandomItemArray(items, value, data) {

        if (items.length != 0) {
            const item = items[Math.floor(Math.random() * items.length)];

            items.splice(items.indexOf(item), 1);
            data[item?.id].value = value;
        }
    };

    randomChangeCell() {
        this.newData = [...this.data];
        setInterval(() => {
            const randomNumber = this.getRandomNumbers(3, 0);

            this.getRandomItemArray(this.newData, randomNumber, this.data);

            this.cellsBox.innerHTML = "";
            this.render(this.data);

        }, 2000)
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
        const items = data;
        items.map(it => {
            const { value } = it;
            const item = document.createElement('div');
            const itemP = document.createElement('p');

            item.classList.add('cells-box__item');
            itemP.innerText = value;

            item.appendChild(itemP);
            this.cellsBox.appendChild(item);

            item.addEventListener('click', this.handlerCountUpClick);


        });
    };

    renderCount() {
        const span = document.createElement('span')
        this.h3.innerText = 'Player Account: ';
        this.h3.appendChild(span);
        span.innerText = this.playerAccount;
    }

}

new App(config);