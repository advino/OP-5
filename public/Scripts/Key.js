class Key {

    constructor(p, x, y, note) {

        this.p = p;
        this.x = x;
        this.y = y;
        this.delta = y;
        this.note = note;
        this.state = false;
    }

    render(data) {
        this.delta = this.p.lerp(this.delta, this.y, .1);
       
        if(this.state === 144) {
            this.y = (this.p.height/2) - 100;
            this.p.fill(255);
        } else {
            this.y = this.p.height/2;
            this.p.noFill();
        }


        this.p.stroke(255);
        this.p.push();
            this.p.circle(this.x, this.delta, 25);
            this.p.line(this.x, this.p.height/2, this.x, this.delta);
        this.p.pop();
    }

    checkState(data) {
      this.state = data;
    }
}

export default Key;
