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

def get_case_list(user_email):
    user = db.users.find_one({"email": user_email})
    if user:
        cases = [{"id": case["id"], "title": case["title"]} for case in user["cases"]]
        return cases
    else:
        print("User not found")
        return []
    

def success_message(data):
    return jsonify({
        "success": True,
        "data": data
        })

def error_message(message):
    return jsonify({
        "success": False,
        "error": message
        })


class Auth:
    def start_session(self, user_model):
        print("Session started!")
        # for privacy reasons, we don't store the password
        user_model.password = ""
        session['logged_in'] = True
        session['user'] = user_model.to_dict()
        print(f"session: {session}")
        cases = get_case_list(user_model.email)
        data = {
            "id": user_model.id,
            "username": user_model.username,
            "fullname": user_model.fullname,
            "email": user_model.email,
            "cases": cases,
        }
        return success_message(data), 200


    def signup(self):
        print(f"In Signup: request: {request}")
        if request.method == "OPTIONS":
            response = jsonify({'message': 'OK'})
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
            response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            return response
        
        # create the user object
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")
        print(f"Signup: details received from frontend: username: {username}, email: {email}, password: {password}")
        #password encryption
        password = pbkdf2_sha256.encrypt(password)
        user_model = UserModel(
            id = 1,
            username = username,
            email = email,
            password = password,
            dateJoined = date.today().strftime("%m-%d-%Y"),
        )

        # check for existing email address
        if db.users.find_one({"email": user_model.email}):
            print("Email address already exists")
            return error_message("Email address already exists"), 400
            return jsonify({"error":"Email address already exists"}), 400

        if db.users.insert_one(user_model.to_dict()):
            print("Sign up successful")
            return self.start_session(user_model)

        print("Sign up failed")
        return error_message("Sign up failed"), 400
        return jsonify({"error":"Sign up failed"}), 400
    

    def signout(self):
        session.clear()
        return redirect("/")
    

    def login(self):
        print(f"In Login: request: {request}")
        if request.method == "OPTIONS":
            response = jsonify({'message': 'OK'})
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
            response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            return response

        user_dict = db.users.find_one({
            "email": request.form.get("email")
        })
        if not user_dict:
            print("login: Invalid email")
            return error_message("Invalid email"), 401
            return jsonify({"error": "Invalid email"}), 401
        user_model = UserModel.from_dict(user_dict)
        if pbkdf2_sha256.verify(request.form.get("password"), user_model.password):
            print("login: Sign in successful")
            return self.start_session(user_model)
        print("login: Invalid password")
        return error_message("Invalid password"), 401
        return jsonify({"error": "Invalid password"}), 401