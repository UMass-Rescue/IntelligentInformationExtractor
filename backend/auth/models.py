from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
import uuid
# from app import db
import pymongo
from database import UserModel, RecordModel, QAModel
from datetime import date
from flask_cors import CORS

client = pymongo.MongoClient("mongodb://localhost:27017")
db = client.IIE

class Auth:
    def start_session(self, user_model):
        print("in models start_session")
        # for privacy reasons, we don't store the password
        user_model.password = ""
        session['logged_in'] = True
        session['user'] = user_model.to_dict()
        print(f"session: {session}")
        return jsonify(user_model.to_dict()), 200


    def signup(self):
        print("in models signup")
        # if request.method == "OPTIONS":
        #     response = jsonify({'message': 'OK'})
        #     response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        #     response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        #     response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        #     return response
        
        print(f"request: {request.json}")
        # create the user object
        username = request.get_json().get("username")
        email = request.get_json().get("email")
        password = request.get_json().get("password")
        print(f"details received from frontend: username: {username}, email: {email}, password: {password}")
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
            print("Email address already exists")
            return jsonify({"error": "Email address already exists"}), 400

        if db.users.insert_one(user_model.to_dict()):
            print("Sign up successful")
            return self.start_session(user_model)

        print("Sign up failed")
        return jsonify({"error":"Sign up failed"}), 400
    

    def signout(self):
        print("in models signout")
        session.clear()
        return redirect("/")
    

    def login(self):
        print("in models login")
        # if request.method == "OPTIONS":
            # response = jsonify({'message': 'OK'})
            # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
            # response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
            # response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            # return response
            # return '', 200, {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': '*'}

        print(f"request: {request.json}")
        user_dict = db.users.find_one({
            "email": request.get_json().get("email")
        })
        if not user_dict:
            print("login: Invalid email")
            return jsonify({"error": "Invalid email"}), 401
        user_model = UserModel.from_dict(user_dict)
        if pbkdf2_sha256.verify(request.get_json().get("password"), user_model.password):
            print("login: Sign in successful")
            return self.start_session(user_model)
        print("login: Invalid password")
        return jsonify({"error": "Invalid password"}), 401