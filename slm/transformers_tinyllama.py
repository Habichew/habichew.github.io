# Use a pipeline as a high-level helper
from transformers import pipeline
from flask import Flask, jsonify, request
from torch import cuda
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app) # allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/", methods = ['POST'])
@cross_origin()
def createTaskRecommendations():
    req_data = request.get_json()
    device = 'cuda' if cuda.is_available() else 'cpu'
    cuda.empty_cache()
    print("device", device)
    print("req_data %s", req_data)
    required_params = ['habit']
    print(request.form.keys)
    missing_params = [key for key in required_params if key not in req_data.keys()]

    if len(missing_params)==0:
        #access slm response HuggingFaceTB/SmolLM-360M-Instruct
        pipe = pipeline("text-generation", model="TinyLlama/TinyLlama-1.1B-Chat-v1.0")
        messages = [
            {"role": "user", "content": "Break down habit into a list of 5 tasks that can be directly and chronologically executed: %s. No examples." %(req_data['habit'])},
        ]
        response = jsonify(pipe(messages, max_length=256)).json
        res_content = response[0]["generated_text"][1]["content"].splitlines()
        print(res_content)

        res_content = [subtask[3:] if subtask and subtask[0].isdigit() and subtask[1] == "." and subtask[2] == " " else None for subtask in res_content]
        while None in res_content: res_content.remove(None)
        while '' in res_content: res_content.remove('')
        print(res_content)
        return res_content
    else:
         resp = {
                 "status":"failure",
                 "error" : "missing parameters",
                 "message" : "Provide %s in request" %(missing_params)
                }
         return jsonify(resp)

if __name__ == '__main__':
    port = 8100 #the custom port you want
    app.run(host='0.0.0.0', port=port)