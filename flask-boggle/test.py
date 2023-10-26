import unittest
from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def setUp(self):
        """Stuff to do before every test."""
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        """Test homepage route."""
        with self.client:
            response = self.client.get('/')
            self.assertEqual(response.status_code, 200)
            self.assertIn('times_played', session)
            self.assertIn('high_score', session)

    def test_valid_word(self):
        """Test if word is valid by modifying the board in the session"""

        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [["C", "A", "T", "T", "T"],  
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"]]
        response = self.client.post('/guess', json={'guess': 'cat'})
        data = response.get_json()
        self.assertEqual(data['result'], 'ok')

if __name__ == "__main__":
    unittest.main()
