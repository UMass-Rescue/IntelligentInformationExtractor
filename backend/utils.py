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
    categories = ["Case Details", "Missing child information", "Possible Abductor Information", "Sentencing and Legal Proceedings", "Medical Information", "Witness Counts"]
    data = {
        "categories": categories
    }
    return success_message(data), 200