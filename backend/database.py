import pymongo
from datetime import datetime
# from app import db

client = pymongo.MongoClient('localhost', 27017)
db = client.IIE

class QAModel:
    def __init__(self, id, question, answer, dateCreated="") -> None:
        self.id = id
        self.question = question
        self.answer = answer
        self.dateCreated = dateCreated

    def __str__(self) -> str:
        return f"QAModel: id: {self.id}, question: {self.question}, answer: {self.answer}, dateCreated: {self.dateCreated}"

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "question": self.question,
            "answer": self.answer,
            "dateCreated": self.dateCreated
        }
    
    @classmethod
    def from_dict(cls, qa_dict):
        return cls(
            id = qa_dict.get("id", 0),
            question = qa_dict.get("question", ""),
            answer = qa_dict.get("answer", ""),
            dateCreated = qa_dict.get("dateCreated", "")
        )

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
        self.historyQA = historyQA    #list of QAModel objects

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
            "historyQA": [qa.to_dict() for qa in self.historyQA]
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
            historyQA = [QAModel.from_dict(qa) for qa in record_dict.get("historyQA", [])]
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
    def __init__(self, id, username, email, password, fullname="", dateJoined="", teamName="No team name", cases=[]) -> None:
        self.id = id
        self.username = username
        self.fullname = fullname
        self.email = email
        self.password = password
        self.dateJoined = dateJoined
        self.teamName = teamName
        self.cases = cases          #list of CaseModel objects

    def __str__(self) -> str:
        return f"UserModel: id: {self.id}, username: {self.username}, fullname: {self.fullname}, email: {self.email}, password: {self.password}, dateJoined: {self.date}, teamName: {self.teamName}, cases: {self.cases}"
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "username": self.username,
            "fullname": self.fullname,
            "email": self.email,
            "password": self.password,
            "dateJoined": self.dateJoined,
            "teamName": self.teamName,
            "cases": [case.to_dict() for case in self.cases]
        }
    
    @classmethod
    def from_dict(cls, user_dict):
        return cls(
            id = user_dict.get("id",0),
            username = user_dict.get("username", ""),
            fullname = user_dict.get("fullname", ""),
            email = user_dict.get("email", ""),
            password = user_dict.get("password", ""),
            dateJoined = user_dict.get("dateJoined", ""),
            teamName = user_dict.get("teamName", ""),
            cases = [CaseModel.from_dict(case_dict) for case_dict in user_dict.get("cases", [])]
        )
    
    def add_case(self, case):
        self.cases.append(case)


#adding data
def add_case(userid, case):
    result = db.users.update_one(
        {"id": userid}, 
        {"$push": {"cases": case}}    
    )
    if result.modified_count > 0:
        print("Case added")
    else:
        print(result)
        print("Case not added")

def add_record(userid, caseid, record):
    db.users.update_one(
        {"id": userid, "cases.id": caseid},
        {"$push": {"cases.$.records": record}},
    )

def add_qa(userid, caseid, recordid, qa):
    db.users.update_one(
        {"id": userid, "cases.id": caseid, "cases.records.id": recordid},
        {"$push": {"cases.$.records.$.historyQA": qa}},
    )



#updating data
def update_user(userid, user):
    result = db.users.update_one(
        {"id": userid},
        {"$set": {"username": user["username"],
                "fullname": user["fullname"],
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
        {"id": userid, "cases.id": caseid},
        {"$set": {"cases.$.title": case["title"],
                "cases.$.description": case["description"]}},
    )
    if result.modified_count > 0:
        print("Case updated")
    else:
        print("Case not updated")

def update_record(userid, caseid, recordid, record):
    result = db.users.update_one(
        {"id": userid, "cases.id": caseid, "cases.records.id": recordid},
        {"$set": {"cases.$.records.$.title": record["title"],
                "cases.$.records.$.description": record["description"]}},
    )
    if result.modified_count > 0:
        print("Record updated")
    else:
        print("Record not updated")



#getting data
def get_user(userid):
    user = db.users.find_one({"id": userid})
    if user:
        return user
    else:
        print("User not found")

def get_cases(userid):
    user = db.users.find_one({"id": userid})
    if user:
        user["cases"]
    else:
        print("User not found")
        
def get_case(userid, caseid):
    user = db.users.find_one({"id": userid})
    if user:
        for case in user["cases"]:
            if case["id"] == caseid:
                return case
    else:
        print("User not found")

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


def get_qa(userid, caseid, recordid, qaid):
    qahistory = get_qahistory(userid, caseid, recordid)
    if qahistory:
        for qa in qahistory:
            if qa["id"] == qaid:
                return qa
    else:
        print("QA not found")



#=======================================================
# Testing database queries 
# user = UserModel(
#     id = 1,
#     username = "vineeth",
#     fullname = "saivineethkumardara",
#     email = "sdara@umass.edu",
#     password = "password",
#     dateJoined = datetime.now(),
#     teamName = "Admin",
#     cases = [])
# case = CaseModel(
#     id = "1",
#     title = "Case 1",
#     description = "This is case 1",
#     records = []
# )
# db.users.insert_one(user.to_dict())
# add_case(1, case = case.to_dict())
# add_record(1, "1", {"id": "1", "title": "Record 1", "description": "This is record 1"})
# print(get_case(1, "1"))
# print(get_record(1, "1", "1"))