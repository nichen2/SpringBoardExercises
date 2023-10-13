from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
import stories

app = Flask(__name__)
app.config['SECRET_KEY'] = "nichen"
debug = DebugToolbarExtension(app)

@app.route('/')
def prompts():
    """Return prompts form."""
    return render_template("prompts.html", prompts=stories.story.prompts)

@app.route('/story')
def story():
    """Return madlibs story"""
    story = stories.story.generate(request.args)
    return render_template("story.html", story=story)

