from models import db, User, Post
from datetime import datetime
from app import app

# Create a few users
users = [
    User(first_name="John", last_name="Doe", image_url="https://example.com/john.jpg"),
    User(first_name="Jane", last_name="Smith", image_url="https://example.com/jane.jpg"),
    User(first_name="Alice", last_name="Johnson", image_url="https://example.com/alice.jpg")
]

# Create a few posts
posts = [
    Post(title="First Post", content="This is the first post.", user_id=1),
    Post(title="Second Post", content="This is the second post.", user_id=1),
    Post(title="Third Post", content="This is the third post.", user_id=1),
    Post(title="A Day in Life", content="Blog post about a day in the life of Jane.", user_id=2),
    Post(title="Tech News", content="Latest updates in technology.", user_id=3)
]

# Set up the Flask context
with app.app_context():
    # Drop all to clean start, if desired
    db.drop_all()
    # Create all tables
    db.create_all()

    # Add users and posts to session
    db.session.add_all(users)
    db.session.commit()  # Users must be committed first to generate IDs


    db.session.add_all(posts)
    db.session.commit()  # Committing posts

    print("Database populated with sample data!")
