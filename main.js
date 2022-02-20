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

    game(field) {
        this.print();
        console.log('Find your hat, but don\'t fall in a hole!');
        console.log(`
        Key:
        You are: ${pathCharacter}
        Your hat is: ${hat}
        The holes you want to avoid are: ${hole}
        The field of play is ${fieldCharacter}.`)
        console.log(`
        To move:
        d = down
        u = up
        r = right
        l = left
        
        Choose wisely...
        `);
        let x = 0;
        let y = 0;
        const winMessage = `You found your hat!
        Congratulations!
        YOU WIN!`;
        const outBoundsMessage = `You went out of bounds!
                
        GAME OVER!!!`;
        const holeMessage = `You fell in a hole!
        
        GAME OVER!!!`;
        while (this.field[y][x] !== hat) {
            let direction = prompt(`Which way would you like to move? >> `);
            direction = direction.toLowerCase();
            if (direction === 'u') {
                console.log(`You moved one space up.`);
            } else if (direction === 'd') {
                console.log('You moved one space down.');
            } else if (direction === 'l') {
                console.log('You moved one space left.');
            } else if (direction === 'r') {
                console.log('You moved one space right.');
            } else {
                console.log('Please choose a valid direction.');
                direction = prompt(`Which way would you like to move? >> `);
            }
            let tempLocale = this.field[y][x];
            if (direction === 'r') {
                if (this.field[y][x + 1] === hat) {
                    console.log(winMessage);
                    break;
                } else if (this.field[y][x + 1] === hole) {
                    console.log(holeMessage);
                    break;
                } else if (this.field[y][x + 1] === fieldCharacter) {
                    this.field[y][x] = fieldCharacter;
                    x += 1;
                    this.field[y][x] = pathCharacter;
                    this.print();
                } else {
                    console.log(outBoundsMessage);
                    break;
                }
            } else if (direction === 'l') {
                if (this.field[y][x - 1] === hat) {
                    console.log(winMessage);
                    break;
                } else if (this.field[y][x - 1] === hole) {
                    console.log(holeMessage);
                    break;
                } else if (this.field[y][x - 1] === fieldCharacter) {
                    this.field[y][x] = fieldCharacter;
                    x -= 1;
                    this.field[y][x] = pathCharacter;
                    this.print();
                } else {
                    console.log(outBoundsMessage);
                    break;
                }
            } else if (direction === 'u') {
                if (y - 1 < 0) {
                    console.log(outBoundsMessage);
                    break;
                }
                if (this.field[y - 1][x] === hat) {
                    console.log(winMessage);
                    break;
                } else if (this.field[y - 1][x] === hole) {
                    console.log(holeMessage);
                    break;
                } else if (this.field[y - 1][x] === fieldCharacter) {
                    this.field[y][x] = fieldCharacter;
                    y -= 1;
                    this.field[y][x] = pathCharacter;
                    this.print();
                } else {
                    console.log(outBoundsMessage);
                    break;
                }
            } else if (direction === 'd') {
                if (this.field[y + 1][x] === hat) {
                    console.log(winMessage);
                    break;
                } else if (this.field[y + 1][x] === hole) {
                    console.log(holeMessage);
                    break;
                } else if (this.field[y + 1][x] === fieldCharacter) {
                    this.field[y][x] = fieldCharacter;
                    y += 1;
                    this.field[y][x] = pathCharacter;
                    this.print();
                } else {
                    console.log(outBoundsMessage);
                    break;
                };
            }
        }    
    }

    static generateField(h, w, pct = .2) {
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
        fieldArray[0][0] = pathCharacter;
        return fieldArray;
    }
}

const play = Field.generateField(5, 7, .3);
const playGame = new Field(play);
playGame.game();

