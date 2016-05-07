// JavaScript File

//The amount of change in frequency for the program to ignore a new note
var threshold = 10;

// Create a new instance of an audio object and adjust some of its properties
var audio = new Audio();
audio.src = 'resources/impMarch.wav';
audio.controls = false;
audio.loop = false;
audio.autoplay = true;
audio.volume = 1;

//frequency of the last note
var lastNote;

var audioCtx,analyser,source,bufferLength,dataArray;

var fbc_array,ctx,bars,bar_x,bar_height,bar_width,canvas;

window.addEventListener("load", initAnalyzer, false);

//initialize and read  the audio file to begin analysis
function initAnalyzer(){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaElementSource(audio); 
	source.connect(analyser);
	analyser.connect(audioCtx.destination);
	analyser.fftSize = 2048;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    console.log(dataArray);
    //important info
    canvas = document.getElementById('analyser_render');
	ctx = canvas.getContext('2d');
    // analyze();
    frameLooper();
}

//analyze the frequencies of the audio file
function analyze(){
    analyser.getByteFrequencyData(dataArray);
    var frequency = 0;
    var totalFreq = 0;
    var count = 0;
    var zeroCount=0;
    //Get average frequency
    for(var i = 0; i < bufferLength; i++){
        if(dataArray[i]!=0){
            count++;
            totalFreq+=dataArray[i];
        } else {
            zeroCount++;
        }
    }
    if(zeroCount<(count*4.58)){
        frequency = Math.round(totalFreq/count);
    }
    console.log(frequency);
    $("#bar").css("width",frequency+"px");
    if(!audio.ended){
        setTimeout(analyze,1);
    }
}

//TEST
function frameLooper(){
	window.webkitRequestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	ctx.fillStyle = '#00CCFF'; // Color of the bars
	bars = 1000;
	for (var i = 0; i < bars; i++) {
		bar_x = i * 3;
		bar_width = 2;
		bar_height = -(fbc_array[i] / 2);
		//  fillRect( x, y, width, height ) // Explanation of the parameters below
		ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
	}
}