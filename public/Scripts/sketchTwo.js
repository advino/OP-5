import OP1 from './OP1.js';

const sketch = p => {

    let device;
    let images = [];
    let idx = 0;

    p.preload = () => {
        device = new OP1();
        device.initialize();

        for(let i = 0; i <= 30; i++) {
            let img = p.loadImage(`./Scripts/Images/${i}.jpg`);
            img.filter(p.GRAY);
            images.push(img);
        }

        console.log(images);
    }

    p.setup = () => {
        p.createCanvas(640, 480);
    }

    p.draw = () => {
        p.background(0);

        let data = device.getNotes();
        console.log(data);

        if(data.length > 0) {
            idx = data[0] - 53;
        }

        p.image(images[idx], 0, 0, p.width, p.height);

    }

}

export default sketch;