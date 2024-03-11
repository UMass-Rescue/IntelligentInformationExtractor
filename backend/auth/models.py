from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
import uuid
from app import db
from database import UserModel, RecordModel, QAModel
from datetime import date

class Auth:
    def start_session(self, user_model):
        # for privacy reasons, we don't store the password
        user_model.password = ""
        session['logged_in'] = True
        session['user'] = user_model.to_dict()
        return jsonify(user_model.to_dict()), 200


    def signup(self):
        # create the user object
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")
        #password encryption
        password = pbkdf2_sha256.encrypt(password)
        user_model = UserModel(
            id = uuid.uuid4().hex,
            username = username,
            fullname = "",
            email = email,
            password = password,
            dateJoined = date.today().strftime("%m-%d-%Y"),
            teamName = "",
            cases = []
        )

        # check for existing email address
        if db.users.find_one({"email": user_model.email}):
            return jsonify({"error": "Email address already exists"}), 400

        if db.users.insert_one(user_model.to_dict()):
            return self.start_session(user_model)

        return jsonify({"error":"Sign up failed"}), 400
    

    def signout(self):
        session.clear()
        return redirect("/")
    

    def login(self):
        user_dict = db.users.find_one({
            "email": request.form.get("email")
        })
        if not user_dict:
            return jsonify({"error": "Invalid email"}), 401
        user_model = UserModel.from_dict(user_dict)
        if pbkdf2_sha256.verify(request.form.get("password"), user_model.password):
            return self.start_session(user_model)
        return jsonify({"error": "Invalid password"}), 401