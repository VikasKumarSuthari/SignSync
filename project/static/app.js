// Use window.URL or fallback
URL = window.URL || window.webkitURL;

var gumStream;
var rec;
var input;
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext;

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");
var changeText = document.getElementById("changeText");

recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
pauseButton.addEventListener("click", pauseRecording);
changeText.addEventListener("click", changeTextFunction);

function startRecording() {
    console.log("Record button clicked");
    var constraints = { audio: true, video: false };

    recordButton.disabled = true;
    changeText.disabled = true;
    stopButton.disabled = false;
    pauseButton.disabled = false;

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        console.log("getUserMedia() success, stream created.");
        audioContext = new AudioContext();
        document.getElementById("formats").innerHTML = "Start Speaking Now";
        gumStream = stream;
        input = audioContext.createMediaStreamSource(stream);
        rec = new Recorder(input, { numChannels: 1 });
        rec.record();
        console.log("Recording started");
    }).catch(function(err) {
        recordButton.disabled = false;
        stopButton.disabled = true;
        pauseButton.disabled = true;
        changeText.disabled = false;
    });
}

function pauseRecording() {
    console.log("Pause button clicked, rec.recording =", rec.recording);
    if (rec.recording) {
        rec.stop();
        pauseButton.innerHTML = "Resume";
    } else {
        rec.record();
        pauseButton.innerHTML = "Pause";
    }
}

function stopRecording() {
    console.log("Stop button clicked");
    stopButton.disabled = true;
    recordButton.disabled = false;
    pauseButton.disabled = true;
    changeText.disabled = false;
    pauseButton.innerHTML = "Pause";

    rec.stop();
    gumStream.getAudioTracks()[0].stop();

    rec.exportWAV(getSentence);
}

function changeTextFunction() {
    console.log("Change Text clicked");
    var newText = document.getElementById('speechToText').value;
    fetch("/ChangeSentenceFunction", {
        method: "post",
        body: newText
    }).then(response => response.json())
      .then(data => {
          console.log('New Post response:', data.sentence);
          document.getElementById('speechToText').value = data.sentence;
          getISL();
      });
}

function getSentence(blob) {
    fetch("/sentences", {
        method: "post",
        body: blob
    }).then(response => response.json())
      .then(data => {
          console.log('POST response:', data.sentence);
          if (data.sentence === "Error") {
              alert("Could not identify Audio. Please try again.");
          }
          document.getElementById('speechToText').value = data.sentence;
          getISL();
      });
}

function getISL() {
    fetch("/isl_gloss")
      .then(response => response.json())
      .then(data => {
        console.log('POST response:', data);
          console.log('ISL gloss:', data.isl);
          document.getElementById('textToISL').value = data.isl;
          // After updating the gloss, fetch updated SiGML URLs.
          fetch("/videos")
            .then(response => response.json())
            .then(data => {
                console.log('Updated SiGML file URLs:', data.links);
                // Call the global restartPlayback function defined in home.html.
                if (typeof restartPlayback === "function") {
                    restartPlayback(data.links);
                }
            })
            .catch(error => console.error('Error fetching updated SiGML URLs:', error));
      });
}