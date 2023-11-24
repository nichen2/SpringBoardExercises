"""Blogly application."""

from flask import Flask, request, render_template, flash, redirect, session, jsonify
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS']= False

@app.route("/")
def index():
    """List of users."""

    users = User.query.all()
    return render_template("list.html", users=users)


@app.route("/users")
def list_users():
    """List of users."""

    users = User.query.all()
    return render_template("list.html", users=users)

@app.route("/users/new", methods=['GET','POST'])
def add_users():
    """Show form to add user or add a user and return to user list"""
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        image_url = request.form['image_url']

        user = User(first_name=first_name, last_name=last_name, image_url=image_url)
        db.session.add(user)
        db.session.commit()
        return redirect("/users")
    return render_template("add_user.html")

@app.route("/users/<int:user_id>")
def show_details(user_id):
    """Show details about the user"""
    user = User.query.get_or_404(user_id)
    return render_template("user_detail.html", user=user)

@app.route("/users/<int:user_id>/edit", methods=['GET','POST'])
def edit_users(user_id):
    """Shows form to edit user details or saves edit user form data"""
    user = User.query.get_or_404(user_id)
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        image_url = request.form['image_url']

        user.first_name = first_name
        user.last_name = last_name
        user.image_url = image_url
        db.session.add(user)
        db.session.commit()
        return redirect("/users")
    return render_template("edit_user.html",user=user)

@app.route("/users/<int:user_id>/delete", methods=['POST'])
def delete_users(user_id):
    """Shows form to edit user details or saves edit user form data"""
    User.query.filter_by(id=user_id).delete()
    db.session.commit()
    return redirect("/users")






