from flask import Flask, render_template, session, redirect
from functools import wraps
import pymongo
from auth.models import Auth
from flask_cors import CORS, cross_origin
# from dotenv import load_dotenv
# load_dotenv()

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/auth/*": {"origins": "http://localhost:3000"}, "allow_headers": ["Content-Type", "Authorization"], "methods": ["OPTIONS", "POST"]})
app.secret_key = b'e\x19\xa2\\!\xfa\xcc*\xccA\xa0\xff\xd5F\x9f\xc5'
print("app started!")

# database connection
# client = pymongo.MongoClient("mongodb://localhost:27017")
# db = client.IIE

# routes
# from auth import routes
# from auth.routes import signout, signup
# app.add_url_rule('/auth/login/', view_func=login, methods=["OPTIONS", "POST"])
# app.add_url_rule('/auth/signup/', view_func=signup, methods=["OPTIONS", "POST"])
# app.add_url_rule('/auth/signout/', view_func=signout)


@app.route('/auth/login/', methods=["OPTIONS","POST"])
# @cross_origin(supports_credentials=True)
def login():
    print("in login")
    return Auth().login()

@app.route('/auth/signup/', methods=["OPTIONS","POST"])
def signup():
    print("in routes.py signup")
    return Auth().signup()

@app.route('/auth/signout/')
def signout():
    print("in routes.py signout")
    return Auth().signout()


if __name__ == "__main__":
    app.run(debug=True)