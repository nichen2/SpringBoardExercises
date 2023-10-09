from flask import Flask

app = Flask(__name__)

@app.route('/welcome')
def welcome():
    """Return Returns “welcome”."""
    return "welcome"

@app.route('/welcome/home')
def welcome_home():
    """Return Returns “welcome home”."""
    return "welcome home"

@app.route('/welcome/back')
def welcome_back():
    """Return Returns “welcome back”."""
    return "welcome back"

# In the ***greet*** folder, Make a simple Flask app that responds to these routes with simple text messages:

# ***/welcome***   Returns “welcome”

# ***/welcome/home***   Returns “welcome home”

# ***/welcome/back***   Return “welcome back”

# Once you’ve finished this, run the tests for it: $python3 -m unittest test.py