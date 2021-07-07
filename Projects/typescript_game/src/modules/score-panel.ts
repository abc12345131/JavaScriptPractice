class ScorePanel {
    score = 0;
    level =1;
    scoreElement: HTMLElement;
    levelElement: HTMLElement;
    maxLevel: number;
    levelUp: number;

    constructor(maxLevel: number = 10, levelUp: number = 10) {
        this.scoreElement = document.getElementById('score')!;
        this.levelElement = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.levelUp = levelUp;
    }

    addScore() {
        this.scoreElement.innerHTML = ++this.score+'';
        if (this.score % this.levelUp == 0) {
            this.addLevel();
        }
    }

    addLevel() {
        if (this.level < this.maxLevel) {
            this.levelElement.innerHTML == ++this.level+'';
        }
    }
}

export default ScorePanel;