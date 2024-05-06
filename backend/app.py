from flask import Flask, render_template, session, redirect, request
from functools import wraps
import pymongo
from auth.models import Auth
from flask_cors import CORS, cross_origin
import database
import utils
import fileserver
import dummyML
from ml.model_hf import process_file
import os
# from dotenv import load_dotenv
# load_dotenv()

app = Flask(__name__)
app.secret_key = b'e\x19\xa2\\!\xfa\xcc*\xccA\xa0\xff\xd5F\x9f\xc5'
CORS(app)
# CORS(app, resources={r"/auth/*": {"origins": "http://localhost:3000"}, "allow_headers": ["Content-Type", "Authorization"], "methods": ["OPTIONS", "POST"]})


# routes
from auth.routes import signout, signup, login
app.add_url_rule('/auth/login/', view_func=login, methods=["OPTIONS", "POST"])
app.add_url_rule('/auth/signup/', view_func=signup, methods=["OPTIONS", "POST"])
app.add_url_rule('/auth/signout/', view_func=signout)

@app.route('/activity/allrecords/', methods=["POST"])
def activity_all():
    email = request.form.get("email")
    return database.getallactivity(email)

@app.route('/activity/record/', methods=["GET"])
def activity_record():
    email = request.form.get("email")
    case_id = request.form.get("case_id")
    record_id = request.form.get("record_id")
    return database.getrecord(email, case_id, record_id)

@app.route('/categories/', methods=["GET"])
def categories():
    return utils.get_categories()

@app.route('/caseDetails/', methods=["POST"])
def get_user_cases():
    email = request.form.get("email")
    print(f"email: {email}")
    return database.getAllCases(email)


@app.route('/addcase/', methods=["POST"])
def add_new_case():
    email = request.form.get("email")
    database.add_dummy_cases(email)
    return utils.success_message({
            "message": "Dummy Cases successfully added"
        }), 200
    case_title = request.form.get("case_title")
    case_description = request.form.get("case_description")
    case = database.get_case(email, case_title)
    if case is not None:
        return utils.error_message("Case already exists"), 400
    case = database.CaseModel(id=utils.generate_uuid(), title=case_title, description=case_description,dateCreated=utils.get_date()).to_dict()
    res = database.add_case(email, case)
    if res:
        return utils.success_message({
            "message": "Case successfully added"
        }), 200
    else:
        return utils.error_message("Case not added"), 400


@app.route('/activity/uploadrecord/', methods=["POST"])
def activity_uploadrecord():
    print("in activity_uploadrecord")
    email = request.form.get("email")
    case_id = request.form.get("case_id")
    record_description = request.form.get("record_description")
    file = request.files['file']
    record_title, _ = os.path.splitext(os.path.basename(file.filename))
    categories = request.form.getlist("categories")
    if not file:
        return utils.error_message("No file selected"), 400
    
    user_id = str(database.get_user(email)["_id"])
    record_id = utils.generate_uuid()
    record_filepath = fileserver.save_file_to_fileserver(file, user_id, case_id, record_id)
    categories = ["Case Details"]
    output = process_file("./"+record_filepath, categories)

    record = database.RecordModel(id=record_id, title=record_title, description=record_description,dateCreated=utils.get_date(),source="local", fileLocation=record_filepath, transcript="", historyQA=output).to_dict()
    database.add_record(email, case_id, record)

    data = {
        "record_id": record_id,
        "record_filepath" : record_filepath,
        "record_history" : output
    }
    print(f"uploadrecord: data: {data}")
    return utils.success_message(data), 200

@app.route('/profile/', methods=["POST"])
def profile():
    email = request.form.get("email")
    firstname, lastname = database.getName(email)
    case_count = database.getCaseCount(email)
    record_count = database.getRecordCount(email)
    data = {
        "firstname": firstname,
        "lastname": lastname,
        "case_count": case_count,
        "record_count": record_count,
        "email": email,
        "password": "********"
    }
    return utils.success_message(data), 200
    


if __name__ == "__main__":
    app.run(debug=True)