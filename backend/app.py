from flask import Flask, render_template, session, redirect
from functools import wraps
import pymongo
# from dotenv import load_dotenv
# load_dotenv()

app = Flask(__name__)
app.secret_key = b'e\x19\xa2\\!\xfa\xcc*\xccA\xa0\xff\xd5F\x9f\xc5'

# database connection
client = pymongo.MongoClient("mongodb://localhost:27017")
db = client.IIE

#Decorators
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect('/')
    return wrap


@app.route('/')
def home():
    return render_template('home.html')

@app.route("/dashboard/")
@login_required
def dashboard():
    return render_template("dashboard.html")

# routes
# from auth import routes
from auth.routes import login, signout, signup
app.add_url_rule('/auth/login/', view_func=login, methods=["POST"])
app.add_url_rule('/auth/signup/', view_func=signup, methods=["POST"])
app.add_url_rule('/auth/signout/', view_func=signout)


if __name__ == "__main__":
    app.run(debug=True)