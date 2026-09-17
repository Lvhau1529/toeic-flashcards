/**
 * Speaks English text using native Web Speech API
 */
export const speakEnglish = (text: string, lang = 'en-US'): void => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // If text has synonyms like "Look at = gaze at = stare at", pick first phrase or clean format
  const primaryText = text.split('=')[0].split('/')[0].trim();
  const utterance = new SpeechSynthesisUtterance(primaryText || text);
  utterance.lang = lang;
  utterance.rate = 0.9; // slightly slower for clearer pronunciation
  utterance.pitch = 1.0;

  // Attempt to select a high quality English voice if available
  const voices = window.speechSynthesis.getVoices();
  const enVoice =
    voices.find(
      (v) =>
        (v.lang === 'en-GB' || v.lang === 'en-US') && v.name.includes('Google'),
    ) || voices.find((v) => v.lang.startsWith('en'));

  if (enVoice) {
    utterance.voice = enVoice;
  }

  window.speechSynthesis.speak(utterance);
};
