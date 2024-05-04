import pymongo
from datetime import datetime
from flask import jsonify
# from app import db
import utils
from bson import ObjectId

client = pymongo.MongoClient('localhost', 27017)
db = client.IIE2

# class QAModel:
#     def __init__(self, category,  dateCreated="") -> None:
#         self.id = id
#         self.question = question
#         self.answer = answer
#         self.dateCreated = dateCreated

#     def __str__(self) -> str:
#         return f"QAModel: id: {self.id}, question: {self.question}, answer: {self.answer}, dateCreated: {self.dateCreated}"

#     def to_dict(self) -> dict:
#         return {
#             "id": self.id,
#             "question": self.question,
#             "answer": self.answer,
#             "dateCreated": self.dateCreated
#         }
    
#     @classmethod
#     def from_dict(cls, qa_dict):
#         return cls(
#             id = qa_dict.get("id", 0),
#             question = qa_dict.get("question", ""),
#             answer = qa_dict.get("answer", ""),
#             dateCreated = qa_dict.get("dateCreated", "")
#         )

class RecordModel:
    def __init__(self, id, title="Untitled", description="No description yet!", dateCreated="", dateLastAnalysed="", source="", fileLocation="", transcript="", historyQA=[]):
        self.id = id
        self.title = title
        self.description = description
        self.dateCreated = dateCreated
        self.dateLastAnalysed = dateLastAnalysed
        self.source = source
        self.fileLocation = fileLocation
        self.transcript = transcript
        self.historyQA = historyQA 

    def __str__(self) -> str:
        return f"RecordModel: id: {self.id}, title: {self.title}, description: {self.description}, dateCreated: {self.dateCreated}, dateLastAnalysed: {self.dateLastAnalysed}, source: {self.source}, fileLocation: {self.fileLocation}, transcript: {self.transcript}, historyQA: {self.historyQA}"
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "decription": self.description,
            "dateCreated": self.dateCreated,
            "dateLastAnalysed": self.dateLastAnalysed,
            "source": self.source,
            "fileLocation": self.fileLocation,
            "transcript": self.transcript,
            "historyQA": self.historyQA #[qa.to_dict() for qa in self.historyQA]
        }
    
    @classmethod
    def from_dict(cls, record_dict):
        return cls(
            id = record_dict.get("id", 0),
            title = record_dict.get("title", ""),
            description = record_dict.get("description", ""),
            dateCreated = record_dict.get("dateCreated", ""),
            dateLastAnalysed = record_dict.get("dateLastAnalysed", ""),
            source = record_dict.get("source", ""),
            fileLocation = record_dict.get("fileLocation", ""),
            transcript = record_dict.get("transcript", ""),
            historyQA = record_dict.get("historyQA", []) #[QAModel.from_dict(qa) for qa in record_dict.get("historyQA", [])]
        )

class CaseModel:
    def __init__(self, id, title="Untitled", dateCreated="", description="No description yet!", recordsCount=0, records=[]) -> None:
        self.id = id
        self.title = title
        self.dateCreated = dateCreated
        self.description = description
        self.recordsCount = recordsCount
        self.records = records      #list of RecordModel objects

    def __str__(self) -> str:
        return f"CaseModel: id: {self.id}, title: {self.title}, dateCreated: {self.dateCreated}, description: {self.description}, recordsCount: {self.recordsCount}, records: {self.records}"
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "dateCreated": self.dateCreated,
            "description": self.description,
            "recordsCount": self.recordsCount,
            "records": [record.to_dict() for record in self.records]
        }
    
    @classmethod
    def from_dict(cls, case_dict):
        return cls(
            id = case_dict.get("id", 0),
            title = case_dict.get("title", ""),
            dateCreated = case_dict.get("dateCreated",""),
            description = case_dict.get("description", ""),
            recordsCount = case_dict.get("recordsCount", 0),
            records = [RecordModel.from_dict(record_dict) for record_dict in case_dict.get("records", [])]
        )

class UserModel:
    def __init__(self, username, email, password, firstname="", lastname="", dateJoined="", teamName="No team name", cases=[]) -> None:
        self._id = 0
        self.username = username
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
        self.dateJoined = dateJoined
        self.teamName = teamName
        self.cases = cases          #list of CaseModel objects

    def __str__(self) -> str:
        return f"UserModel: _id: {self._id}, username: {self.username}, firstname: {self.firstname}, lastname: {self.lastname}, email: {self.email}, password: {self.password}, dateJoined: {self.date}, teamName: {self.teamName}, cases: {self.cases}"
    
    def to_dict(self) -> dict:
        return {
            "_id": self._id,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
            "password": self.password,
            "dateJoined": self.dateJoined,
            "teamName": self.teamName,
            "cases": [case.to_dict() for case in self.cases]
        }
    
    @classmethod
    def from_dict(cls, user_dict):
        return cls(
            _id = user_dict.get("_id",0),
            username = user_dict.get("username", ""),
            firstname = user_dict.get("firstname", ""),
            lastname = user_dict.get("lastname", ""),
            email = user_dict.get("email", ""),
            password = user_dict.get("password", ""),
            dateJoined = user_dict.get("dateJoined", ""),
            teamName = user_dict.get("teamName", ""),
            cases = [CaseModel.from_dict(case_dict) for case_dict in user_dict.get("cases", [])]
        )
    


#adding data
def add_case(email, case):
    case = get_case(email, case["title"])
    if case is not None:
        print("Case already exists")
        return False
    result = db.users.update_one(
        # {"_id": userid}, 
        {"email": email},
        {"$push": {"cases": case}}    
    )
    if result.modified_count > 0:
        print("Case added")
        return True
    else:
        print(result)
        print("Case not added")
        return False

def add_record(email, caseid, record):
    user = db.users.find_one({"email": email})
    if user:
        for case in user["cases"]:
            if case["id"] == caseid:
                print("case found")
    else:
        print("User not found")
    #TODO: check for existing record 
    result = db.users.update_one(
        {"email": email, "cases.id": caseid},
        {"$push": {"cases.$.records": record}},
    )
    if result.modified_count > 0:
        print("Record added")
    else:
        print(result)
        print("Record not added")

def add_qa(userid, caseid, recordid, qa):
    result = db.users.update_one(
        {"_id": userid, "cases.id": caseid, "cases.records.id": recordid},
        {"$push": {"cases.$.records.$.historyQA": qa}},
    )
    if result.modified_count > 0:
        print("QA added")
    else:
        print(result)
        print("QA not added")



#updating data
def update_user(userid, user):
    result = db.users.update_one(
        {"_id": userid},
        {"$set": {"username": user["username"],
                "firstname": user["firstname"],
                "lastname": user["lastname"],
                "email": user["email"],
                "password": user["password"],
                "teamName": user["teamName"]}},
    )
    if result.modified_count > 0:
        print("User updated")
    else:
        print("User not updated")


def update_case(userid, caseid, case):
    result = db.users.update_one(
        {"_id": userid, "cases.id": caseid},
        {"$set": {"cases.$.title": case["title"],
                "cases.$.description": case["description"]}},
    )
    if result.modified_count > 0:
        print("Case updated")
    else:
        print("Case not updated")

def update_record(userid, caseid, recordid, record):
    result = db.users.update_one(
        {"_id": userid, "cases.id": caseid, "cases.records.id": recordid},
        {"$set": {"cases.$.records.$.title": record["title"],
                "cases.$.records.$.description": record["description"]}},
    )
    if result.modified_count > 0:
        print("Record updated")
    else:
        print("Record not updated")



#getting data
def get_user(email):
    # user = db.users.find_one({"_id": userid})
    user = db.users.find_one({"email": email})
    if user:
        return user
    else:
        print("User not found")

def get_cases(email):
    # user = db.users.find_one({"_id": userid})
    user = db.users.find_one({"email": email})
    if user:
        return user["cases"]
    else:
        print("User not found")
        
def get_case(email, case_title):
    user = db.users.find_one({"email": email})
    if user:
        for case in user["cases"]:
            if case["title"] == case_title:
                return case
    else:
        print("User not found")
        return None

def get_records(userid, caseid):
    case = get_case(userid, caseid)
    if case:
        return case["records"]
    else:
        print("Case not found")

def get_record(userid, caseid, recordid):
    case = get_case(userid, caseid)
    if case:
        for record in case["records"]:
            if record["id"] == recordid:
                return record
    else:
        print("Case not found")

def get_qahistory(userid, caseid, recordid):
    record = get_record(userid, caseid, recordid)
    if record:
        return record["historyQA"]
    else:
        print("Record not found")



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

def getAllCases(email):
    print("getAllCases")
    user = db.users.find_one({"email": email})
    data = []
    if user:
        for case in user["cases"]:
            case_id = case["id"]
            case_title = case["title"]
            data.append({
                "case_id": case_id,
                "case_title": case_title
            })
        print(f"caseDetails: data: {data}")
        return success_message(data), 200
    else:
        print("User not found")
        return error_message("User not found"), 401


def getName(email):
    user = db.users.find_one({"email": email})
    if user:
        return user["firstname"], user["lastname"]
    else:
        print("User not found")

def getCaseCount(email):
    print("getCaseCount")
    user = db.users.find_one({"email": email})
    if user:
        return len(user["cases"])
    else:
        return 0


def getallactivity(email):
    user = db.users.find_one({"email": email})
    data = []
    if user:
        for case in user["cases"]:
            case_id = case["id"]
            case_title = case["title"]
            for record in case["records"]:
                record_id = record["id"]
                record_title = record["title"]
                record_date = record["dateCreated"]
                data.append({
                    "case_id": case_id,
                    "case_title": case_title,
                    "record_id": record_id,
                    "record_title": record_title,
                    "record_date": record_date,
                    "user_id": str(user["_id"]),
                    "url": record["fileLocation"]
                })
        print(f"allrecords: data: {data}")
        return success_message(data), 200
    else:
        print("User not found")
        return error_message("User not found"), 401
    
def getRecordCount(email):
    user = db.users.find_one({"email": email})
    rcount = 0
    if user:
        for case in user["cases"]:
            rcount += len(case["records"])
        return rcount
    else:
        return 0


def getrecord(email, case_id, record_id):
    user = db.users.find_one(
        {
            "email": email,
            "cases.id": case_id,
        },
        {
            "id": 1,
            "cases.$": 1,
        }
    )
    if user:
        case = user["cases"][0]
        for record in case["records"]:
            if record["id"] == record_id:
                data = {
                    "case_id": case["id"],
                    "case_title": case["title"],
                    "record_id": record["id"],
                    "record_title": record["title"],
                    "record_date": record["dateCreated"],
                    "user_id": str(user["_id"]),
                    "record_description": record["description"],
                    "record_history": record["historyQA"]
                }
                return success_message(data), 200
        return error_message("Record not found"), 404
    else:
        print("Data (record, case, user ) not found")
        return error_message("Data not found, record or case is not a valid entry"), 401



def add_dummy_cases(email):
    for i in range(1,6):
       case = CaseModel(id=utils.generate_uuid(), title=f"case {i}", description=f"case description {i}",dateCreated=utils.get_date()).to_dict()
       add_case(email, case)

