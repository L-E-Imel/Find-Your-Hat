const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const wall = 'X';


class Field {
    constructor(field) {
        this.field = field;
    }

    print(field) {
        this.field.forEach(row => console.log(row.join(' ')));
    }

    game(field) {
        let moveCount = 0;
        const winMessage = `
        You found your hat!
        Congratulations!
        YOU WIN!
        `;

        const outBoundsMessage = `
        You went out of bounds!
                
        GAME OVER!!!`;
        const holeMessage = `
        You fell in a hole!
        
        GAME OVER!!!`;

        const wallMessage = `
        A wall is blocking your way. Try again.
        `;
        let y = Math.floor(Math.random() * (this.field.length - 1));
        let x = Math.floor(Math.random() * (this.field[y].length - 1));
        this.field[y][x] = pathCharacter;
        

        console.log('Find your hat, but don\'t fall in a hole!');
        
        let gameMode = prompt(`Select game mode: easy or hard >> `);
        gameMode = gameMode.toLowerCase();
        if (gameMode === 'easy') {
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
            this.print();        
            while (this.field[y][x] !== hat) {
                let direction = prompt(`Which way would you like to move? >> `);
                direction = direction.toLowerCase();
                if (direction === 'take me to my hat') {
                    console.log(`
                    One moment please...
                    Taking you to your hat...`);
                    console.log(winMessage);
                    break;
                }
                if (direction === 'r') {
                    console.log('You moved one space right.');
                    moveCount++;
                    if (this.field[y][x + 1] === hat) {
                        x += 1;
                        console.log(winMessage);
                        console.log(`You used ${moveCount} moves to find your hat.`);
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
                    };
                } else if (direction === 'l') {
                    console.log('You moved one space left.');
                    moveCount++;
                    if (this.field[y][x - 1] === hat) {
                        x -= 1;
                        console.log(winMessage);
                        console.log(`You used ${moveCount} moves to find your hat.`)
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
                    };
                } else if (direction === 'u') {
                    console.log(`You moved one space up.`);
                    moveCount++;
                    if (y - 1 < 0) {
                        console.log(outBoundsMessage);
                        break;
                    };
                    if (this.field[y - 1][x] === hat) {
                        y -= 1;
                        console.log(winMessage);
                        console.log(`You used ${moveCount} moves to find your hat.`);
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
                    };
                } else if (direction === 'd') {
                    console.log('You moved one space down.');
                    moveCount++;
                    if (this.field[y + 1][x] === hat) {
                        y += 1;
                        console.log(winMessage);
                        console.log(`You used ${moveCount} moves to find your hat.`);
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
                    }
                } else {
                    console.log('Please choose a valid direction.');
                    moveCount++;
                    direction = prompt(`Which way would you like to move? >> `);
                }
            }
        } else if (gameMode === 'hard') {
            let counter = 5;
            console.log(`
            Key:
            You are: ${pathCharacter}
            Your hat is: ${hat}
            The holes you want to avoid are: ${hole}
            The field of play is ${fieldCharacter}.
            Walls blocking your way: X`);
            console.log(`
            A wall will be added to your board every 5 moves.
            You must go around it.
            `);
            console.log(`
            To move:
            d = down
            u = up
            r = right
            l = left
        
            Choose wisely...
            `);
            
            while (this.field[y][x] !== hat) {
                if (counter < 1) {
                    let a = Math.floor(Math.random() * (this.field.length - 1));
                    let b = Math.floor(Math.random() * (this.field[a].length - 1));
                    if (this.field[a][b] === fieldCharacter) {
                        this.field[a][b] = wall;
                        this.print();
                        //console.log(`A wall was added in row ${a + 1}, column ${b + 1}.`);
                        counter = 5;
                        console.log(`You have ${counter} moves left before your board changes.`);
                    } else if (this.field[a][b] === hat || this.field[a][b] === pathCharacter) {
                        this.print();
                        console.log(`You get a bye. No walls were added this round!`);
                    } else if (this.field[a][b] !== fieldCharacter) {
                        let a = Math.floor(Math.random() * (this.field.length - 1));
                        let b = Math.floor(Math.random() * (this.field[a].length - 1));
                        this.field[a][b] = wall;
                        this.print();
                        //console.log(`A wall was added in row ${a + 1}, column ${b + 1}.`);
                        counter = 5;
                        console.log(`You have ${counter} moves left before your board changes.`);
                    }
                    
                } else {
                    this.print();
                    console.log(`You have ${counter} moves left before your board changes!`);
                }
                let direction = prompt(`Which way would you like to move? >> `);
                direction = direction.toLowerCase();
                if (direction === 'take me to my hat') {
                    console.log(`
                    One moment please...
                    Taking you to your hat...`);
                    console.log(winMessage);
                    break;
                }
                if (direction === 'r'  && this.field[y][x + 1] !== wall) {
                    console.log(`
                    You moved one space right.
                    `);
                    counter--;
                    moveCount++;
                    if (this.field[y][x + 1] === hat) {
                        x += 1;
                        console.log(winMessage);
                        console.log(`You used ${moveCount} moves to find your hat.`);
                    } else if (this.field[y][x + 1] === hole) {
                        console.log(holeMessage);
                        break;
                    } else if (this.field[y][x + 1] === fieldCharacter) {
                        this.field[y][x] = fieldCharacter;
                        x += 1;
                        this.field[y][x] = pathCharacter;                    
                    } else if ((x+1) >= this.field[y].length) {
                        console.log(outBoundsMessage);
                        break;
                    }
                } else if (direction === 'r' &&this.field[y][x + 1] === wall) {
                    console.log(wallMessage);
                    counter--;
                    moveCount++;
                } else if (direction === 'l' && this.field[y][x - 1] !== wall) {
                    console.log(`
                    You moved one space left.
                    `);
                    counter--;
                    moveCount++;
                    if (this.field[y][x - 1] === hat) {
                        x -= 1;
                        console.log(winMessage);
                        console.log(`You used ${moveCount} moves to find your hat.`);
                    } else if (this.field[y][x - 1] === hole) {
                        console.log(holeMessage);
                        break;
                    } else if (this.field[y][x] === wall) {
                        console.log(wallMessage);
                    } else if (this.field[y][x - 1] === fieldCharacter) {
                        this.field[y][x] = fieldCharacter;
                        x -= 1;
                        this.field[y][x] = pathCharacter;
                    } else if ((x-1) < 0) {
                        console.log(outBoundsMessage);
                        break;
                    }
                } else if (direction === 'l' && this.field[y][x - 1] === wall) {
                    console.log(wallMessage);
                    counter--;
                    moveCount++;
                } else if (direction === 'u' && y - 1 < 0) {
                    console.log(outBoundsMessage);
                    break;
                } else if (direction === 'u' && this.field[y - 1][x] !== wall) {
                    console.log(`
                    You moved one space up.
                    `);
                    counter--;
                    moveCount++;
                    if (this.field[y - 1][x] === hat) {
                        y -= 1;
                        console.log(winMessage);
                        console.log(`You used ${moveCount} moves to find your hat.`);
                    } else if (this.field[y - 1][x] === hole) {
                        console.log(holeMessage);
                        break;
                    } else if (this.field[y][x] === wall) {
                        console.log(wallMessage);
                    } else if (this.field[y - 1][x] === fieldCharacter) {
                        this.field[y][x] = fieldCharacter;
                        y -= 1;
                        this.field[y][x] = pathCharacter;
                    } else if ((y-1) < 0) {
                        console.log(outBoundsMessage);
                        break;
                    }
                } else if (direction === 'u' && this.field[y - 1][x] === wall) {
                    console.log(wallMessage);
                    counter--;
                    moveCount++;
                } else if (direction === 'd' && this.field[y + 1][x] !== wall) {
                    console.log(`
                    You moved one space down.
                    `);
                    counter--;
                    moveCount++;
                    if (this.field[y + 1][x] === hat) {
                        y += 1;
                        console.log(winMessage);
                        console.log(`You used ${moveCount} moves to find your hat.`);
                    } else if (this.field[y + 1][x] === hole) {
                        console.log(holeMessage);
                        break;
                    } else if (this.field[y][x] === wall) {
                        console.log(wallMessage);
                    } else if (this.field[y + 1][x] === fieldCharacter) {
                        this.field[y][x] = fieldCharacter;
                        y += 1;
                        this.field[y][x] = pathCharacter;
                    } else if ((y+1) >= this.field.length) {
                        console.log(outBoundsMessage);
                        break;
                    };
                } else if (direction === 'd' && this.field[y + 1][x] === wall) {
                    console.log(wallMessage);
                    counter--;
                    moveCount++;
                } else {
                    this.print();
                    console.log('Please choose a valid direction.');
                    console.log(`You have ${counter} moves left before your board changes!`);
                    direction = prompt(`Which way would you like to move? >> `);
                }
            }         
        }
    }

    static generateField(h, w, pct = .2) {
        let fieldArray = new Array(h).fill(fieldCharacter).map(square => new Array(w));
        for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j++) {
                const randNum = Math.random();
                if (randNum > pct) {
                    fieldArray[i][j] = fieldCharacter;
                } else {
                    fieldArray[i][j] = hole;
                }
            }
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

const play = Field.generateField(20, 30, .27);
const playGame = new Field(play);
playGame.game();

