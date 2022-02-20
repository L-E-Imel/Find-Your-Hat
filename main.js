const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field) {
        this.field = field;
    }
    print(field) {
        this.field.forEach(row => console.log(row.join(' ')));
    }
    static generateField(h, w, pct = .1) {
        let fieldArray = new Array(h).fill(fieldCharacter).map(el => new Array(w));
        for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j++) {
                const randNum = Math.random();
                fieldArray[i][j] = randNum > pct ? fieldCharacter : hole;
            }
            //console.log(fieldArray);
        }
        const hatLocale = {
            xAxis: Math.floor(Math.random() * w),
            yAxis: Math.floor(Math.random() * h)
        }
        while (hatLocale.xAxis === 0 && hatLocale.yAxis === 0) {
            hatLocale.xAxis = Math.floor(Math.random() * w);
            hatLocale.yAxis = Math.floor(Math.random() * h);
        }
        fieldArray[hatLocale.yAxis][hatLocale.xAxis] = hat;
        return fieldArray;
    }
}

const play = Field.generateField(5, 7);
const playGame = new Field(play);
playGame.print();

/* 
const myField = new Field([[pathCharacter, fieldCharacter, fieldCharacter,fieldCharacter],
                    [hole, fieldCharacter, fieldCharacter, hole],
                    [fieldCharacter, hat, fieldCharacter, fieldCharacter],
                    [fieldCharacter, hole, fieldCharacter, fieldCharacter]]);

console.log(myField);
myField.print(); */




