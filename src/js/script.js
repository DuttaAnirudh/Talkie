'use strict';

// VARIABLES
const textAreaTextToSpeech = document.querySelector('#textarea-text-to-speech');
const voiceOptions = document.querySelector('#voice-options');
const speechBtn = document.querySelector('#speech-btn');

let voiceList;

// Function to fetch voices
const fetchVoices = function () {
  // Fetching array of Voices
  return speechSynthesis.getVoices();
};

// Function to create markup of voices
const createVoiceMarkup = function () {
  // Fetching list of voices
  voiceList = fetchVoices();

  // Creating markup of voices to add as options
  // Selecting 'Google US English' as default
  const markup = voiceList
    .map(
      voice =>
        `<option value="${voice.name}" ${
          voice.name === 'Google US English' ? 'selected' : ''
        }>${voice.name} (${voice.lang})</option>`
    )
    .join('');
  voiceOptions.insertAdjacentHTML('beforeend', markup);
};

// Listening for 'voiceschanged' event to know when voice list has been updated
speechSynthesis.addEventListener('voiceschanged', createVoiceMarkup);

const textToSpeech = function (text) {
  // Creating a new utterance/speech with the input text
  let utterance = new SpeechSynthesisUtterance(text);

  // Setting the voice to be used for utterance be same as chosen from voice option selected in DOM
  voiceList.map(voice =>
    voice.name === voiceOptions.value ? (utterance.voice = voice) : ''
  );

  // Speaking the utterance/speech
  speechSynthesis.speak(utterance);
};

speechBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (textAreaTextToSpeech.value !== '') {
    // Avoiding multiple same text-to-speech on multiple continous click on speech button
    if (!speechSynthesis.speaking) {
      textToSpeech(textAreaTextToSpeech.value);
    }
  }
});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// SPEECH TO TEXT

// VARIABLES
const listenBtn = document.querySelector('#listen-btn');
const stopBtn = document.querySelector('#stop-btn');
const textAreaSpeechToText = document.querySelector('#textarea-speech-to-text');
const languageOptions = document.querySelector('#language-options');

// Fetching Speech recognition object
const SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();

// Changing speech recognition properties
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

// Event Listener: Listen Btn
listenBtn.addEventListener('click', function (e) {
  e.preventDefault();
  recognition.start();
});

// Event Listener: Stop Btn
stopBtn.addEventListener('click', function (e) {
  e.preventDefault();
  recognition.stop();
});

// Fetching the result when speech recognition is fired
recognition.addEventListener('result', function (res) {
  const output = Array.from(res.results[0])
    .map(r => r.transcript)
    .join('');

  // Displaying the transcript on the screen
  textAreaSpeechToText.textContent = output;
});
