"""Adoption agency WTForms application."""

from flask import Flask, request, render_template, flash, redirect, session, jsonify
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS']= False

@app.route("/")
def index():
    """List of pets."""
    pets = Pet.query.all()
    return render_template("list.html", pets=pets)

@app.route("/add", methods=["GET","POST"])
def add_pet():
    """Show form for adding pets and add pets to the database"""
    form = AddPetForm()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        available = form.available.data

        pet = Pet(name=name,species=species,photo_url=photo_url,age=age,notes=notes,available=available)
        db.session.add(pet)
        db.session.commit()
        return redirect("/")
    else:
        return render_template("add_pet_form.html",form=form)
    
@app.route("/<int:pet_id>", methods=["GET","POST"])
def pet_detail(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)
    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.commit()
        flash(f"{pet.name} updated!")
        return redirect("/")
    return render_template("pet_detail.html",pet=pet,form=form)