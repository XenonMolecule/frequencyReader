// JavaScript File
var data;
var midiFile;

var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
        var data = reader.result;
        console.log(data)
        midiFile = new MIDIFile(data);
        var events = midiFile.getMidiEvents();
        console.log(events);
        var arrayOutput = "{";
        $(".output").append("<li><p>Ticks Per Beat: "+midiFile.header.getTicksPerBeat()+"</p></li>")
        for(var i = 0; i < events.length; i++){
            if(events[i].subtype==04){
                console.log(events[i]);
            }
            if(events[i].delta){
                if($('input[name=outputType]:checked', '#outputType').val()==="playTone"){
                    //console.log("playTone("+events[i].param1+","+events[i].delta+");");
                    $(".output").append("<li><p>["+events[i].playTime+"]playTone("+events[i].param1+","+Math.round(events[i].delta/10)+")</p></li>")
            
                } else {
                    arrayOutput+="{"+events[i].param1+","+Math.round(events[i].delta/10)+","+events[i].playTime+"},";
                }
            }
        }
        arrayOutput = arrayOutput.slice(0,-1);
        arrayOutput+="}";
        if($('input[name=outputType]:checked', '#outputType').val()==="array"){
            $(".output").append("<li><p>"+arrayOutput+"</p></li>")
            $(".output").append("<li><p>The array length is: "+events.length+"</p></li>")
            console.log(arrayOutput);
        }
    };
    reader.readAsArrayBuffer(input.files[0]);
};