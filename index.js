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
        this.app = app;
        this.h3 = h3;
        this.cellsBox = cellsBox;
        this.numbOfCell = numbOfCell;
        this.cellsBoxItem = cellsBoxItem;
        this.playerAccount = playerAccount;

        this.data = [];
        this.newData = [];

        this.dataCreate();
        this.randomChangeCell();

        this.render();

    };

    dataCreate() {
        for (let i = 0; i <= this.numbOfCell - 1; i++) {
            const id = i;
            const value = "";
            const item = { id, value };
            this.data.push(item);
        }
    };

    render() {
        const items = this.data;

        items.map(it => {
            const { value } = it;
            const item = document.createElement('div');
            const itemP = document.createElement('p');

            item.classList.add('cells-box__item');
            itemP.innerText = value;

            item.appendChild(itemP);
            this.cellsBox.appendChild(item);
        });

    };

    getRandom(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    randomChangeCell() {
        setInterval(() => {
            const randomNumber = this.getRandom(3, 0);
            const randomId = this.getRandom(this.numbOfCell, 0);

            console.log(randomId);


            this.data.find(it => {

                if (it.id === randomId && it.value === "") {
                    it.value = randomNumber;
                }

            });

            this.cellsBox.innerHTML = "";
            this.render();
        }, 2000)

    }

}

new App(config);