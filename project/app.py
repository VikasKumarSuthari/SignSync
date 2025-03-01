from speech_recognition_file import convert_speech_to_text
import util
from flask import Flask, render_template, request, url_for, jsonify
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


sentence = ''
video_links = []  # This will hold your local SiGML filenames

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('home.html')

@app.route('/sentences', methods=['GET', 'POST'])
def api_message():
    with open('./file.wav', 'wb') as f:
        f.write(request.data)
    print('recording saved')
    global sentence
    sentence = convert_speech_to_text()  # Use custom speech-to-text function
    message = {'sentence': sentence}
    return jsonify(message)

@app.route('/ChangeSentenceFunction', methods=['GET', 'POST'])
def change_sentence():
    global sentence
    sentence = str(request.data)[2:-1]
    message = {'sentence': sentence}
    print(message)
    return jsonify(message)

@app.route('/isl_gloss', methods=['GET', 'POST'])
def textToISLGloss():
    global sentence, video_links
    isl_gloss_list, video_links = util.getISL(sentence)
    isl_gloss = ' '.join(isl_gloss_list)
    print("ISL Gloss:", isl_gloss)
    print("SiGML Files:", video_links)
    message = {'isl': isl_gloss}
    return jsonify(message)

@app.route('/videos', methods=['GET', 'POST'])
def glossToVideo():
    global video_links
    sigml_urls = []
    for link in video_links:
        # Ensure that every file name ends with '.sigml'
        filename = link if link.endswith(".sigml") else link + ".sigml"
        full_url = request.host_url.rstrip('/') + url_for('static', filename='signs/' + filename)
        sigml_urls.append(full_url)
        #print(full_url)
        #print(sigml_urls)
    message = {'links': sigml_urls}
    print(message)
    return jsonify(message)


@app.route('/text_to_isl', methods=['GET'])
def getISLFromText():
    text = str(request.args['query'])
    print(text)
    isl_gloss_list, links = util.getISL(text)
    return jsonify(links)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True) 
    
