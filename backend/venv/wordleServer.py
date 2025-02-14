from flask import Flask, jsonify, request
from flask_cors import CORS
from english_words import get_english_words_set
from random import choice

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")  # Allow CORS requests only from your frontend

targetWord = ''

## gets a word to be guessed by the player
@app.route("/wordle/word", methods=['GET'])
def getWord():
    global targetWord
    with open("wordBank.txt", 'r') as file:
        if not file.readline(): 
            getbank()
        file.seek(0)  
        words = file.read().splitlines()
    targetWord = choice(words)
    return jsonify({'word': targetWord.strip()})

def getbank():
    with open("wordBank.txt", 'w') as file:
        allWords = get_english_words_set(['gcide'], lower=True, alpha=True)
        for word in allWords:
            if len(word) == 5:
                file.write(word.upper() + '\n')

## checks player's guess against the word
@app.route("/wordle/check", methods=['POST'])
def checkWord():
    global targetWord
    data = request.get_json()
    guess = data.get('guess')
    feedback = getFeedback(guess, targetWord)
    return jsonify({"feedback": feedback})

def getFeedback(guess, targetWord):
    feedback = []
    for i in range(5):
        if guess[i] == targetWord[i]:
            feedback.append('success.light')
        elif guess[i] in targetWord:
            feedback.append('warning.light') 
        else:
            feedback.append('#ddd') 
    return feedback

if __name__ == '__main__':
    app.run(debug=True, port=8080)
