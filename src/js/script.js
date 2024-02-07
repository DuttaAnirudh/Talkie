'use strict';

const textArea = document.querySelector('#textarea');
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

  if (textArea.value !== '') {
    // Avoiding multiple same text-to-speech on multiple continous click on speech button
    if (!speechSynthesis.speaking) {
      textToSpeech(textArea.value);
    }
  }
});
