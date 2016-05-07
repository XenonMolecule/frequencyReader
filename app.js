// JavaScript File
var data;

var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
        var data = reader.result;
        console.log(data)
        var midiFile = new MIDIFile(data);
        var events = midiFile.getMidiEvents();
        console.log(events);
        for(var i = 0; i < events.length; i++){
            if(events[i].delta){
                console.log("playTone("+events[i].param1+","+events[i].delta+")");
                $(".output").append("<li><p>playTone("+events[i].param1+","+events[i].delta+")</p></li>")
            }
        }
    };
    reader.readAsArrayBuffer(input.files[0]);
};

