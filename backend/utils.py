import uuid
from datetime import date
from flask import jsonify

def generate_uuid():
    return str(uuid.uuid4())

def get_date():
    return date.today().strftime("%m-%d-%Y")

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

def get_categories():
    categories = ["Missing Child Information", "Contact Information", "Circumstances of Disappearance", "Witness Accounts", "Possible Abductor Information", "Medical Information", "Current Location or Sightings"]
    data = {
        "categories": categories
    }
    return success_message(data), 200