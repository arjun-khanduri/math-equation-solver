import os
import json
import base64
import shutil
from main import main
from io import BytesIO
from calculator import calculate
from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS

root = os.getcwd()

app = Flask(__name__)
api = Api(app)
CORS(app)

image_req_args = reqparse.RequestParser()
image_req_args.add_argument("image", type=str)


class Solve(Resource):

    def post(self):
        args = image_req_args.parse_args()
        if 'image' in os.listdir():
            shutil.rmtree('image')
        if 'segmented' in os.listdir():
            shutil.rmtree('segmented')
        os.mkdir('segmented')
        operation = main(BytesIO(base64.urlsafe_b64decode(args['image'])))
        print(operation)
        print("solution :", calculate(operation))
        os.mkdir('image')
        shutil.move('segmented', 'image')
        shutil.move('input.png', 'image')
        shutil.move('segmented_characters.csv', 'image')
        equation, solution = calculate(operation)
        with open('solution.png', mode='rb') as file:
            curve = file.read()
        return json.dumps({
            'equation': equation,
            'solution': str(solution),
            'curve': base64.encodebytes(curve).decode('utf-8')
        })


api.add_resource(Solve, "/solve")

if __name__ == "__main__":
    app.run(debug=True)
