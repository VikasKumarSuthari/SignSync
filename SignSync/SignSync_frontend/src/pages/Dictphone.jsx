import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff, PlayCircle, StopCircle, RotateCcw } from 'lucide-react';

const Dictphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Automatically restart listening if it stops unexpectedly.
  useEffect(() => {
    // If you want continuous listening, start with continuous: true.
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="p-6 rounded-xl border border-red-200 bg-red-50 text-red-700">
        <p className="text-lg font-semibold">Browser Support Error</p>
        <p className="mt-2">Your browser doesn't support speech recognition functionality.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {listening ? (
            <Mic className="h-6 w-6 text-purple-500" />
          ) : (
            <MicOff className="h-6 w-6 text-slate-400" />
          )}
          <span className="text-lg font-semibold text-slate-900">
            Speech Recognition {listening ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => SpeechRecognition.startListening({ continuous: true })}
            className="inline-flex items-center gap-2 rounded-md bg-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
          >
            <PlayCircle className="h-4 w-4" />
            Start
          </button>
          <button
            onClick={SpeechRecognition.stopListening}
            className="inline-flex items-center gap-2 rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
          >
            <StopCircle className="h-4 w-4" />
            Stop
          </button>
          <button
            onClick={resetTranscript}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-sm font-medium text-slate-500 mb-2">Transcript</p>
        <p className="text-slate-700 min-h-[100px]">
          {transcript || 'Start speaking to see your words appear here...'}
        </p>
      </div>
    </div>
  );
};

export default Dictphone;