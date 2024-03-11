import pymongo
from datetime import datetime
from app import db

# client = pymongo.MongoClient('localhost', 27017)
# db = client.IIE

class QAModel:
    def __init__(self, id, question, answer, dateCreated) -> None:
        self.id = id
        self.question = question
        self.answer = answer
        self.dateCreated = dateCreated

    def __str__(self) -> str:
        return f"QAModel: id: {self.id}, question: {self.question}, answer: {self.answer}, dateCreated: {self.dateCreated}"

    def to_dict(self) -> dict:
        return {
            "_id": self.id,
            "question": self.question,
            "answer": self.answer,
            "dateCreated": self.dateCreated
        }

class RecordModel:
    def __init__(self, id, title, description, dateCreated, dateLastAnalysed, source, fileLocation, transcript, historyQA):
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
            "_id": self.id,
            "title": self.title,
            "decription": self.description,
            "dateCreated": self.dateCreated,
            "dateLastAnalysed": self.dateLastAnalysed,
            "source": self.source,
            "fileLocation": self.fileLocation,
            "transcript": self.transcript,
            "historyQA": [qa.to_dict() for qa in self.historyQA]
        }

    
class CaseModel:
    def __init__(self, id, title, dateCreated, description, recordsCount, records) -> None:
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
            "_id": self.id,
            "title": self.title,
            "dateCreated": self.dateCreated,
            "description": self.description,
            "recordsCount": self.recordsCount,
            "records": [record.to_dict() for record in self.records]
        }


class UserModel:
    def __init__(self, id, username, fullname, email, password, dateJoined, teamName, cases) -> None:
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
            "_id": self.id,
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
            id = user_dict.get("_id",0),
            username = user_dict.get("username", ""),
            fullname = user_dict.get("fullname", ""),
            email = user_dict.get("email", ""),
            password = user_dict.get("password", ""),
            dateJoined = user_dict.get("dateJoined", ""),
            teamName = user_dict.get("teamName", ""),
            cases = user_dict.get("cases", [])
        )

    
# user = UserModel(
#     id = "1",
#     username = "vineeth",
#     fullname = "saivineethkumardara",
#     email = "sdara@umass.edu",
#     password = "password",
#     dateJoined = datetime.now(),
#     teamName = "Admin",
#     cases = [])

# ans = db.users.insert_one(user.to_dict())

