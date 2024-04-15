#this is a file that simulates the behavior of the ml server.

def process_file(file, categories):
    data = []
    for category in categories:
        data.append({
            "category": category,
            "output":{
                "prompt1":"ml output1",
                "prompt2":"ml output2",
            }
        })
    return data