from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Optional, URL, NumberRange, AnyOf

class AddPetForm(FlaskForm):
    """Form for adding pets."""

    name = StringField("Name", validators=[DataRequired()])
    species = StringField("Species", validators=[DataRequired(), AnyOf(['cat', 'dog', 'porcupine'])])
    photo_url = StringField("Photo URL (optional)", validators=[Optional(), URL()])
    age = IntegerField("Age (optional)", validators=[Optional(), NumberRange(min=0, max=30)])
    notes = StringField("Notes (optional)")
    available = BooleanField("Is your pet available for adoption?")


class EditPetForm(FlaskForm):
    """Form for adding pets."""

    photo_url = StringField("Photo URL (optional)", validators=[Optional(), URL()])
    notes = StringField("Notes (optional)", validators=[Optional()])
    available = BooleanField("Is your pet available for adoption?", validators=[Optional()])


