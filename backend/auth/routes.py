from flask import Flask
# from app import app
from auth.models import Auth

# @app.route("/auth/signup/", methods=["POST"])
def signup():
    print("route signup")
    return Auth().signup()

# @app.route("/auth/signout/")
def signout():
    return Auth().signout()

# @app.route("/auth/login/", methods=["POST"])
def login():
    return Auth().login()