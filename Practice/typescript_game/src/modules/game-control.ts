import Food from './food';
import ScorePanel from './score-panel';
import Snake from './snake'

class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    button: HTMLButtonElement;
    direction: string = '';

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.button = document.querySelector('button')!
        document.addEventListener('keydown', (event) => this.keydownHandler(event))
        document.getElementById('start')!.addEventListener('click', () => this.start())
        
    }

    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key;
    }
    
    start() {        
        this.snake.initBody();
        this.food.initFood();
        this.snake.X = 0;
        this.snake.Y = 0;
        this.food.change();
        this.direction = 'ArrowRight';     
        this.button.disabled = true
        this.run();
    }

    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;    
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;            
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;           
                break;        
            default:
                break;
        }

        this.checkEat(X, Y);

        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch(e) {
            this.button.disabled = false;
            alert(e + '  Game Over');
        }

        this.button.disabled && setTimeout(() => this.run(), 250-(this.scorePanel.level-1)*10);
    }

    checkEat(X: number, Y: number) {
        if(X===this.food.X && Y===this.food.Y) {
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }
}

export default GameControl
