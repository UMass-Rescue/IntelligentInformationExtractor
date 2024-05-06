# IntelligentInformationExtractor

## To run the backend code please follow the following steps:

1. Install the required packages using the following command. It is a great practice to use python virtual environments specific for a project and install all the dependencies in there. \
`pip install -r requirements.txt` \
`pip install -r requirements_ml.txt` 

2. Make sure MongoDB is setup in your system.
   
3. Download the LLM model and place it in the folder `/backend/ml/local_models/` and modify the model.py code accordingly to the name of the downloaded model. Or if you choose to use huggingface model, use the model_hf.py in app.py file and modify the huggingface API in model_hf.py.

4. go to `/backend` folder and run the following command to start the backend server. \
```flask run``` \
This will start the backend server and now when you use the web app from frontend the requests will be served.
