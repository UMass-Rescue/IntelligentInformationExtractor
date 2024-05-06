import os
import database

def save_file_to_fileserver(file, user_id, case_id, record_id):
    #TODO: save to mongodb and get the record id
    #TODO: use the user_id, case_id, record_id to save the file in fileserver
    #TODO: save the file path to mongodb
    _, file_extension = os.path.splitext(file.filename)
    filename = f"{record_id}{file_extension}"
    file_path = os.path.join("fileserver", f"user_{user_id}", f"case_{case_id}", filename)
    folder_path = os.path.dirname(file_path)
    os.makedirs(folder_path, exist_ok=True)
    file.save(file_path)
    # return "file:///D:/Projects/ChildRescue/IntelligentInformationExtractor/backend/"+file_path
    # return "https://drive.google.com/drive/folders/1bCTYlMuzkq-ERCEKVK8q0xOiqke546pl?usp=drive_link"
    return file_path


def get_file_from_fileserver(file_id):
    pass