# Small-Language Model Web Server
This web-service provides the task recommendations for habichew by embedding a small language model inside that can be accessed via a REST API. 

## Starting the Server
```python ./slm/transformers_tinyllama.py```

## REST API
Currently, the API consists of the following endpoints:

### Break down habit
- Route: /breakdown/habit
- Method: POST
- URL Params
  - Required: habit=[string]
  - Optional: None
- Data Params
  - Required: None
  - Optional: None
- Success Response:
  - Code: 200
  - Content: { recommendation: "1 ..." }
- Error Response:
  - Code: 400 BAD REQUEST
  - Content: { error : "Missing parameters" }
- Sample Call:
  
```const response = await fetch("https://localhost:8100/breakdown/habit, method: "POST", body: { "habit": "eat healthy" })```

### Break down task
- Route: /breakdown/task
- Method: POST
- URL Params
  - Required: task=[string]
  - Optional: None
- Data Params
  - Required: None
  - Optional: None
- Success Response:
  - Code: 200
  - Content: { recommendation: "1 ..." }
- Error Response:
  - Code: 400 BAD REQUEST
  - Content: { error : "Missing parameters" }
- Sample Call:
  
  ```const response = await fetch("https://localhost:8100/breakdown/task, method: "POST", body: { "task": "find low-carb recipes" })```
