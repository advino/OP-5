class OP1 {

    constructor() {

        this.inputs;
        this.outputs;
        this.op1;

        this.note;
        this.state;
    }

    getNote() {

        return {
            note: this.note
        };
    }

    async initialize() {
     
       await navigator.requestMIDIAccess().then(midi => {
            this.inputs = midi.inputs;
            this.outputs = midi.outputs;
            this.op1 = this.checkForDevice(this.inputs);
            
            return this.op1;
        }).then(device => {

            if(device !== null) {
                device.onmidimessage = (midimessage) => {
               
                    let data = midimessage.data;
                    // console.log(data);
                    switch(data[0]) {
                        
                        case 144: 
                            this.note = data[1];
                            break;
                        
                        case 128:
                            this.note = 0;
                            break;
                        
                        default:
                            break;
                   }
                   
            } 
        }   else {
                console.error("No OP-1 Found");
            }
        });
    }

    checkForDevice(input) {

        let device = null;
        input.forEach(i => {
            
            if(i.name === "OP-1 Midi Device") {
                device = i;
            }
        });

        if(device === null) {

            console.log("Your OP-1 is not connected");
        }  else {
            console.log("OP-1 Connected");
            
        }

        return device;
    }
}

export default OP1;