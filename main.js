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
            fieldArray[i].push(tempArr);
            console.log(fieldArray);
        }
        return fieldArray;
        
    }
}

//const play = Field.generateField(5, 7);

const myField = new Field([[pathCharacter, fieldCharacter, fieldCharacter,fieldCharacter],
                    [hole, fieldCharacter, fieldCharacter, hole],
                    [fieldCharacter, hat, fieldCharacter, fieldCharacter],
                    [fieldCharacter, hole, fieldCharacter, fieldCharacter]]);

console.log(myField);
myField.print();




