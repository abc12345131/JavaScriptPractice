class Food {
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('food')!;
    }

    get X() {
        return this.element.offsetLeft;
    }

    get Y() {
        return this.element.offsetTop;
    }
    
    change() {
        let left = 10*Math.round(Math.random()*29);
        let top = 10*Math.round(Math.random()*29);
        this.element.style.left = left+'px';
        this.element.style.top = top+'px';
    } 
}

export default Food;