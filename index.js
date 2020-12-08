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
    constructor({n, numbOfCell, playerAccount, app, h3, cellsBox, cellsBoxItem, }) {
        this.n = n;
        this.app = app;
        this.h3 = h3;
        this.cellsBox = cellsBox;
        this.numbOfCell = numbOfCell;
        this.cellsBoxItem = cellsBoxItem;
        this.playerAccount = playerAccount;


        this.data = [];

        this.renderCells();

        this.randomChangeCell();

    };

    renderCells() {
        this.data[this.numbOfCell - 1] = "";
        const items = this.data;

        items.map(it => {
            const item = document.createElement('div');
            item.classList.add('cells-box__item');
            item.innerText = it;
            cellsBox.appendChild(item);
        });



        // for (let i = 0; i < this.numbOfCell; i++) {
        //     const item = document.createElement('div');
        //     item.classList.add('cells-box__item');
        //     cellsBox.appendChild(item);
        // }

        this.h3.innerText = `Player account: ${this.playerAccount}`;

    };

    getRandom(max, min){
        return parseInt((Math.random() * (max - min) + min), 10);
    };



    randomChangeCell() {
        // setInterval(()=> {
        //
        //     const min = 0;
        //     const max = 4;
        //     const maxId = [...this.cellsBox.childNodes].length - 1;
        //
        //
        //     const id = this.getRandom(maxId, min);
        //     const randomElement = this.cellsBox.childNodes[id];
        //
        //
        //     if(randomElement.childNodes[0] === undefined) {
        //
        //         const numberElem = document.createElement('p');
        //         const randomNumber = this.getRandom(max, min);
        //         numberElem.innerText = randomNumber;
        //         randomElement.appendChild(numberElem);
        //
        //     }
        //
        //
        //
        //
        //
        // }, 2000)

    }

}

new App(config);