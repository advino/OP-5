import OP1 from './OP1.js';
import Key from './key.js';

const sketch = p => {

    let yPos;
    let yDelta;
    let device;
    let mallets = [];

    p.preload = () => {
        
        device = new OP1();
        device.initialize();
        console.log(device);
    }

    p.setup = () => {

        p.createCanvas(640, 480);
        yPos = p.height/2;
        yDelta = yPos;

        for(let i = 0; i <= 23; i++) {
            mallets.push(new Key(p, 30 + (i * 25), p.height/2, i + 29));
        }
    }

    p.draw = () => {
        p.background(0);

        let data = device.getNote();

        mallets.forEach(m => {
            m.render();

            m.checkState(device.getNote());
        });


    }

}

export default sketch;