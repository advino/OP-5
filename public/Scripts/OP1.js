class OP1 {

    constructor() {

        this.inputs;
        this.outputs;
        this.op1;

        this.chord = [];
        this.state;
    }

    getNotes() {

        return this.chord;
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
                    
                    if(midimessage.data.length > 1) {
                        this.triggerNote(midimessage);
                    }
            } 
        }   else {
                console.error("No OP-1 Found");
            }
        });
    }

    triggerNote(message) {
        
        let midiNote = message.data;

        switch(midiNote[0]) {
            
            case 144: 
                this.pushChord(midiNote[1]);
                break;
            
            case 128:
                this.trimChord(midiNote[1]);
                break;
            
            default:
                break;
       }
    }

    pushChord(note) {
        
        this.chord.push(note);
        return this.chord;
    }

    trimChord(note) {
        let idx = this.chord.findIndex(elt => {
            
            elt === note;
        });
        
        this.chord.splice(idx,1);
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