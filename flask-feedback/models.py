from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()

bcrypt = Bcrypt()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class User(db.Model):
    """User model"""
    __tablename__ = "users"

    username = db.Column(db.String(20), primary_key=True)
    password = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, unique=True, nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    feedback = db.relationship('Feedback', backref="users",cascade="all, delete-orphan",single_parent=True)
    @classmethod
    def register(cls, username, pwd, email, first_name, last_name):
        """Register user with hashed password and return user"""
        hashed = bcrypt.generate_password_hash(pwd)
        hashed_password = hashed.decode("utf8")

        return cls(username=username, password=hashed_password, email=email, first_name=first_name, last_name=last_name)
    
    @classmethod
    def authenticate(cls, username, pwd):
        """Validate that this user exists and return user, if not valid return false"""
        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, pwd):
            return user
        else:
            return False
        
class Feedback(db.Model):
    """Feedback model"""
    __tablename__ = "feedback"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    username = db.Column(db.String(20), db.ForeignKey('users.username'))

    