# test_app.py
import unittest
from app import app
from models import db, User

class BloglyTestCase(unittest.TestCase):

    def setUp(self):
        """Set up test client and create tables."""
        app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
        app.config['TESTING'] = True
        self.client = app.test_client()
        db.create_all()

    def tearDown(self):
        """Clean up any fouled transaction."""
        db.session.remove()
        db.drop_all()

    def test_list_users(self):
        """Test the users listing."""
        with self.client as client:
            resp = client.get("/users")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('User List', html)

    def test_show_user_details(self):
        """Test displaying details of a user."""
        user = User(first_name="Test", last_name="User", image_url="http://example.com/test.jpg")
        db.session.add(user)
        db.session.commit()

        with self.client as client:
            resp = client.get(f"/users/{user.id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Test User', html)

    def test_add_user(self):
        """Test adding a user."""
        with self.client as client:
            d = {"first_name": "New", "last_name": "User", "image_url": "http://example.com/new.jpg"}
            resp = client.post("/users/new", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('New User', html)

    def test_edit_user(self):
        """Test editing a user's details."""
        # First, create a user to edit
        user = User(first_name="Edit", last_name="Test", image_url="http://example.com/edit.jpg")
        db.session.add(user)
        db.session.commit()

        with self.client as client:
            # Update details of the user
            d = {"first_name": "Edited", "last_name": "UserTest", "image_url": "http://example.com/edited.jpg"}
            resp = client.post(f"/users/{user.id}/edit", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Edited UserTest', html)


    
if __name__ == "__main__":
    unittest.main()
