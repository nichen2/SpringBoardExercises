from models import db, Pet
from app import app

# Create a few users
pets = [
    Pet(name="Fluffy", species="Dog",
        photo_url="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400")
]

# Set up the Flask context
with app.app_context():
    # Drop all to clean start, if desired
    db.drop_all()
    # Create all tables
    db.create_all()

    db.session.add_all(pets)
    db.session.commit()

    print("Database populated with sample data!")
