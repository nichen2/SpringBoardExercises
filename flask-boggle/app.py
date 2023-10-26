from flask import Flask, request, render_template, flash, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

boggle_game = Boggle()
app = Flask(__name__, static_folder='./static')
app.config['SECRET_KEY'] = "nichen"
debug = DebugToolbarExtension(app)
high_score = 0
times_played = 0

@app.route('/')
def homepage():
    session['board'] = boggle_game.make_board()
    session.setdefault('times_played', 0)
    session.setdefault('high_score', 0)
    return render_template("index.html", board=session['board'])

@app.route('/guess', methods=["POST"])
def guess():
    data = request.json
    guess = data['guess']
    result = boggle_game.check_valid_word(session['board'],guess)
    return jsonify({"result":result})

@app.route('/update-score', methods=["POST"])
def update_score():
    data = request.json
    score = data['score']
    if score > session['high_score']:
        session['high_score'] = score
    session['times_played'] += 1
    return jsonify({
        "high_score": session['high_score'],
        "times_played": session['times_played']
    })