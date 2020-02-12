import OP1 from './OP1.js';
import Key from './key.js';

const sketch = p => {

    let device;
    let mallets = [];

    p.preload = () => {
        
        device = new OP1();
        device.initialize();
        console.log(device);
    }

    p.setup = () => {

        p.createCanvas(640, 480);

        for(let i = 0; i <= 23; i++) {
            mallets.push(new Key(p, 30 + (i * 25), p.height/2, i + 53));
        }

       
    }

    p.draw = () => {
        p.background(0);

        let data = device.getNotes();

        // Rendering mallets
        mallets.forEach(m => {
            
            m.render();
            m.state = 128;
        });

        for(let note of data) {

            let mPressed = mallets.find(elt => {

                return elt.note === note;
            });

            mPressed.checkState(144);
        }

        // console.log(data);
    }

}

export default sketch;