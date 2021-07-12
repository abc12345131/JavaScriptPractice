class Snake {
    head: HTMLElement;
    body: HTMLCollection;
    element: HTMLElement;

    constructor() {        
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.element = document.getElementById('snake')!;
        this.body = this.element.getElementsByTagName('div');
    }

    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(value: number) {
        if(this.X === value) {
            return;
        }

        if(value < 0 || value > 290) {
            throw new Error('Hit the wall!');            
        }

        if(this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value) {
            if(value > this.X) {
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }

        this.head.style.left = value + 'px';

        this.moveBody();

        //this.checkCollision();
    }

    set Y(value: number) {
        if(this.Y === value) {
            return;
        }

        if(value < 0 || value > 290) {
            throw new Error('Hit the wall!');            
        }

        if(this.body[1] && (this.body[1] as HTMLElement).offsetTop === value) {
            if(value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }

        this.head.style.top = value + 'px';

        this.moveBody();

        //this.checkCollision();
    }

    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }
    
    initBody() {
        for(let i = this.body.length-1; i > 0; i--) {
            this.element.removeChild(this.body[i]);
        }
    }

    moveBody() {
        for(let i = this.body.length-1; i > 0; i--) {
            let X = (this.body[i-1] as HTMLElement).offsetLeft;
            let Y = (this.body[i-1] as HTMLElement).offsetTop;

            (this.body[i] as HTMLElement).style.left = X + 'px';
            (this.body[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    checkCollision() {
        for(let i=1; i<this.body.length;i++) {
            let bd = this.body[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('Collision!')
            }
        }
    }
}

export default Snake;