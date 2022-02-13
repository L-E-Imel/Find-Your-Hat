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
        console.log(field.join(''));
    }
    static generateField(h, w) {
        let fieldArray = [];
        fieldArray.length = h;
        let randNum = Math.floor(Math.random() * 3);
        const squares = [hat, hole, fieldCharacter];
        for (let i = 0; i < fieldArray.length; i++) {
            let tempArr = [];
            tempArr.length = w;
            for (let j = 0; j < tempArr.length; j++) {
                tempArr.push(squares[randNum]);
                console.log(tempArr);
            }
            fieldArray.push(tempArr);
            console.log(fieldArray);
        }
        return fieldArray;
        
    }
}

const play = Field.generateField(5, 7);


