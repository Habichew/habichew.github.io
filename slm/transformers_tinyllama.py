# Use a pipeline as a high-level helper
from transformers import pipeline
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app) # allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/", methods = ['POST'])
@cross_origin()
def createTaskRecommendations():
    req_data = request.get_json()
    required_params = ['habit']
    print(request.form.keys)
    missing_params = [key for key in required_params if key not in req_data.keys()]

    if len(missing_params)==0:
        #access sml response
        pipe = pipeline("text-generation", model="TinyLlama/TinyLlama-1.1B-Chat-v1.0")
        messages = [
            {"role": "user", "content": "Break down habit into bulleted list of 5 tasks that can be directly and chronologically executed: %s. No examples." %(req_data['habit'])},
        ]
        return jsonify(pipe(messages, max_length=256))
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