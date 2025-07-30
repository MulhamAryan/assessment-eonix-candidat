from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello():
    return {'message': 'Hello Flask 2.3.x!'}


if __name__ == '__main__':
    app.run(debug=True)
