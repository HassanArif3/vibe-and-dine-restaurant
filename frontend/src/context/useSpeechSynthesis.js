import { useState, useRef } from 'react';

export default function useSpeechSynthesis({ speakerOn = true, agentPersona = 'sajid', language = 'ur' }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSpeakingRef = useRef(false);

  const speakText = (text, callback) => {
    if (!window.speechSynthesis || !speakerOn) {
      if (callback) callback();
      return;
    }

    // Cancel active synthesis
    window.speechSynthesis.cancel();

    isSpeakingRef.current = true;
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;

    if (language === 'ur') {
      selectedVoice = voices.find(voice => voice.lang.includes('ur') || voice.lang.includes('hi'));
    } else {
      if (agentPersona === 'ayesha') {
        selectedVoice = voices.find(
          voice => voice.lang.includes('en') && 
          (voice.name.toLowerCase().includes('female') || 
           voice.name.toLowerCase().includes('zira') || 
           voice.name.toLowerCase().includes('google us english'))
        );
      } else {
        selectedVoice = voices.find(
          voice => voice.lang.includes('en') && 
          (voice.name.toLowerCase().includes('male') || 
           voice.name.toLowerCase().includes('david'))
        );
      }
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    if (agentPersona === 'ayesha') {
      utterance.rate = 1.05;
      utterance.pitch = 1.1;
    } else {
      utterance.rate = 0.95;
      utterance.pitch = 0.9;
    }

    utterance.onend = () => {
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      if (callback) callback();
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      if (callback) callback();
    };

    window.speechSynthesis.speak(utterance);
  };

  const cancelSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
      setIsSpeaking(false);
    }
  };

  return {
    isSupported: typeof window !== 'undefined' && !!window.speechSynthesis,
    isSpeaking,
    speakText,
    cancelSpeaking
  };
}
