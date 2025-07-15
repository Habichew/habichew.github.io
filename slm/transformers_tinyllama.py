# Use a pipeline as a high-level helper
from transformers import pipeline
from flask import Flask, jsonify, request
from torch import cuda
from flask_cors import CORS, cross_origin
import logging

logging.basicConfig(
    format='%(asctime)s %(levelname)-8s %(message)s',
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S')

app = Flask(__name__)
cors = CORS(app) # allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/breakdown/habit", methods = ['POST'])
@cross_origin()
def breakdownHabit():
    logging.info("creating habit recommendations")
    req_data = request.get_json()
    device = 'cuda' if cuda.is_available() else 'cpu'
    cuda.empty_cache()
    print("device", device)
    print("req_data %s", req_data)
    required_params = ['habit']
    print(request.form.keys)
    missing_params = [key for key in required_params if key not in req_data.keys()]

    if len(missing_params)==0:

        pipe = pipeline("text-generation", model="TinyLlama/TinyLlama-1.1B-Chat-v1.0")
        #pipe = pipeline("text-generation", model="HuggingFaceTB/SmolLM-360M-Instruct")
        # TODO: check if input contains sensitive language and avoid creating recommendations in that case
        messages = [
            {"role": "user", "content": "In short sentences, break down this habit into a list of broad tasks: %s. No examples." %(req_data['habit'])},
        ]
        response = jsonify(pipe(messages, max_new_tokens=96)).json
        res_content = response[0]["generated_text"][1]["content"].splitlines()
        logging.info(res_content)
        res_content = [subtask[3:] if subtask and len(subtask) > 3 and subtask[0].isdigit() and subtask[1] == "." and subtask[2] == " " else None for subtask in res_content]
        while None in res_content: res_content.remove(None)
        # while '' in res_content: res_content.remove('')
        logging.info("finished creating recommendations")
        return jsonify(res_content)
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