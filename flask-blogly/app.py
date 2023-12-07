"""Blogly application."""

from flask import Flask, request, render_template, flash, redirect, session, jsonify
from models import db, connect_db, User, Post, Tag, PostTag

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
    posts = Post.query.filter(Post.user_id == user_id)
    return render_template("user_detail.html", user=user, posts=posts)

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

@app.route("/users/<int:user_id>/posts/new")
def add_post(user_id):
    """Shows a form to add a new post"""
    user = User.query.get_or_404(user_id)
    all_tags = Tag.query.all()
    return render_template("add_post.html", user=user, all_tags=all_tags)

@app.route("/users/<int:user_id>/posts/new", methods=['POST'])
def save_post(user_id):
    """Shows a form to add a new post"""
    user = User.query.get_or_404(user_id)
    selected_tags = request.form.getlist('tags')
    title = request.form['title']
    content = request.form['content']
    post = Post(title=title, content=content, user_id=user.id)
    post.tags = [Tag.query.get(tag_id) for tag_id in selected_tags]
    db.session.add(post)
    db.session.commit()
    return redirect(f"/users/{user_id}")

@app.route("/posts/<int:post_id>")
def show_post(post_id):
    """Show details about the post"""
    post = Post.query.get_or_404(post_id)
    return render_template("post_detail.html", post=post)

@app.route("/posts/<int:post_id>/edit", methods=['GET','POST'])
def edit_post(post_id):
    """Shows a form to edit post or saves edits to post"""
    post = Post.query.get_or_404(post_id)
    user_id = post.user.id
    all_tags = Tag.query.all()
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        selected_tags = request.form.getlist('tags')
        post.title = title
        post.content = content
        post.tags = [Tag.query.get(tag_id) for tag_id in selected_tags]
        db.session.add(post)
        db.session.commit()
        return redirect(f"/posts/{post_id}")

    return render_template("edit_post.html",post=post,all_tags=all_tags)

@app.route("/posts/<int:post_id>/delete", methods=['POST'])
def delete_post(post_id):
    """Deletes post"""
    user = Post.query.get_or_404(post_id).user
    Post.query.filter_by(id=post_id).delete()
    db.session.commit()
    return redirect(f"/users/{user.id}")

@app.route("/tags")
def tags():
    """Shows tags"""
    tags = Tag.query.all()
    return render_template("tags.html", tags=tags)

@app.route("/tags/new", methods=['GET','POST'])
def add_tag():
    """Show form to add tag or add a tag and return to tags"""
    if request.method == 'POST':
        name = request.form['name']
        tag = Tag(name=name)
        db.session.add(tag)
        db.session.commit()
        return redirect("/tags")
    return render_template("add_tag.html")

@app.route("/tags/<int:tag_id>")
def show_tag(tag_id):
    """Show details and posts from the tag"""
    tag = Tag.query.get_or_404(tag_id)
    posts = tag.posts
    return render_template("tag_detail.html", tag=tag, posts=posts)

@app.route("/tags/<int:tag_id>/edit", methods=['GET','POST'])
def edit_tag(tag_id):
    """Shows form to edit user details or saves edit user form data"""
    tag = Tag.query.get_or_404(tag_id)
    if request.method == 'POST':
        name = request.form['name']

        tag.name = name
        db.session.add(tag)
        db.session.commit()
        return redirect(f"/tags/{tag_id}")
    return render_template("edit_tag.html",tag=tag)

@app.route("/tags/<int:tag_id>/delete", methods=['POST'])
def delete_tag(tag_id):
    """Shows form to edit user details or saves edit user form data"""
    Tag.query.filter_by(id=tag_id).delete()
    db.session.commit()
    return redirect("/tags")