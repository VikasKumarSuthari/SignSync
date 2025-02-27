import speech_recognition as sr

def convert_speech_to_text():
    AUDIO_FILE = "file.wav"
    r = sr.Recognizer()
    with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)
    try:
        text = r.recognize_google(audio, language='en-IN')
        print("The audio file contains: " + text)
        return text
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
        return "Error"
    except sr.RequestError as e:
        print("Could not request results from Google Speech Recognition service; {0}".format(e))
        return "Error"
