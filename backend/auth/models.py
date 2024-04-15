from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
import uuid
# from app import db
import pymongo
from database import UserModel
from datetime import date
from flask_cors import CORS
import utils
from bson import ObjectId

client = pymongo.MongoClient("mongodb://localhost:27017")
db = client.IIE

def get_case_list(user_email):
    user = db.users.find_one({"email": user_email})
    if user:
        cases = [{"case_id": case["id"], "case_title": case["title"]} for case in user["cases"]]
        return cases
    else:
        print("User not found")
        return []


class Auth:
    def start_session(self, user_dict):
        print("Session started!")
        # for privacy reasons, we don't store the password
        user_dict["password"] = ""
        user_dict["_id"] = str(user_dict["_id"])
        session['logged_in'] = True
        session['user'] = user_dict
        print(f"session: {session}")
        cases = get_case_list(user_dict["email"])
        data = {
            "id": str(user_dict["_id"]),
            "username": user_dict["username"],
            "fullname": user_dict["fullname"],
            "email": user_dict["email"],
            "cases": cases,
        }
        return utils.success_message(data), 200


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
        user_dict = UserModel(
            username = username,
            email = email,
            password = password,
            dateJoined = utils.get_date()
        ).to_dict()
        user_dict.pop("_id")

        # check for existing email address
        if db.users.find_one({"email": email}):
            print("Email address already exists")
            return utils.error_message("Email address already exists"), 400
            return jsonify({"error":"Email address already exists"}), 400

        if db.users.insert_one(user_dict):
            print("Sign up successful")
            user_dict = db.users.find_one({
            "email": request.form.get("email")
            })
            return self.start_session(user_dict)

        print("Sign up failed")
        return utils.error_message("Sign up failed"), 400
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
            return utils.error_message("Invalid email"), 401
            return jsonify({"error": "Invalid email"}), 401
        if pbkdf2_sha256.verify(request.form.get("password"), user_dict["password"]):
            print("login: Sign in successful")
            return self.start_session(user_dict)
        print("login: Invalid password")
        return utils.error_message("Invalid password"), 401
        return jsonify({"error": "Invalid password"}), 401