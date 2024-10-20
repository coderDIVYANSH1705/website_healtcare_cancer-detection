from flask import Flask, request, jsonify, send_from_directory,render_template,url_for,redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__, static_url_path='', static_folder='frontend')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///diabetes.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class GlucoseReading(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/')
def index():
    render_template('diab.html')
    return send_from_directory(app.static_folder, 'diab.html')

@app.route('/api/glucose', methods=['POST'])
def add_glucose_reading():
    data = request.get_json()
    new_reading = GlucoseReading(level=data['level'])
    db.session.add(new_reading)
    db.session.commit()
    
    if data['level'] < 70:
        message = "Your glucose level is low!"
    elif 70 <= data['level'] <= 130:
        message = "Your glucose level is normal."
    else:
        message = "Your glucose level is high!"

    return jsonify({"message": message})

@app.route('/api/glucose-data', methods=['GET'])
def get_glucose_data():
    readings = GlucoseReading.query.all()
    result = [{"level": r.level, "date": r.date.isoformat()} for r in readings]
    return jsonify(result)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
