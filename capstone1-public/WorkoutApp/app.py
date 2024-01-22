from flask import Flask, request, render_template, flash, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User, Feedback
from forms import UserForm, LoginForm, FeedbackForm, EditFeedbackForm
from sqlalchemy.exc import IntegrityError


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///workout'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "SECRET!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS']= False

connect_db(app)

toolbar = DebugToolbarExtension(app)

def auth(username):
    """Helper function to check if a user is logged in and the proper user"""
    if 'username' not in session:
        flash('Login first to view user detail', "primary")
        return redirect('/login')
    elif session['username'] != username:
        flash('You do not have permission to view this page', "danger")
        return redirect('/secret')

@app.route("/")
def home_page():
    """Redirect to register"""
    return redirect("/register")

@app.route("/register", methods=["GET","POST"])
def register():
    if 'username' in session:
        flash('Please log out to register new account', "primary")
        return redirect('/secret')
    form = UserForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        new_user = User.register(username, password, email, first_name, last_name)

        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken, please use another')
            return render_template('register.html', form=form)
        session['username'] = new_user.username
        flash('Successfully Created Your Account!', "success")
        return redirect('/secret')
    return render_template("register.html",form=form)

@app.route("/login", methods=["GET","POST"])
def log_in():
    if 'username' in session:
        flash('Already signed in', "primary")
        return redirect('/secret')
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.authenticate(username,password)
        if (user):
            session['username'] = user.username
            flash('Welcome back', "primary")
            return redirect('/secret')
        else:
            form.password.errors.append('Incorrect username or password')
            return render_template("login.html",form=form)
    return render_template("login.html",form=form)

@app.route('/logout')
def logout_user():
    session.pop('username')
    flash("Goodbye!", "info")
    return redirect('/')

@app.route('/users/<username>')
def user_detail(username):
    auth(username)
    user = User.query.filter_by(username=username).first()
    return render_template("user_detail.html", user=user)
    


