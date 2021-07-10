import Food from './food';
import ScorePanel from './score-panel';
import Snake from './snake'

class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }

    init() {
        document.addEventListener('keydown',)
    }
}

export default GameControl
