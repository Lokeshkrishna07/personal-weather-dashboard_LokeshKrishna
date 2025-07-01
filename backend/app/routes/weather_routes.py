from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User
import requests

weather_bp = Blueprint("weather", __name__)

@weather_bp.route("/", methods=["GET"])
@jwt_required()
def get_weather():
    user = User.query.get(int(get_jwt_identity()))
    api_key = "b342e7439f5af44d5ef5422c40b19808"

    print("##############weather route")

    if user.city and user.country:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={user.city},{user.country}&appid={api_key}&units=metric"
    elif user.latitude is not None and user.longitude is not None:
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={user.latitude}&lon={user.longitude}&appid={api_key}&units=metric"
    else:
        return jsonify({"msg": "Location not set"}), 400

    response = requests.get(url)
    data = response.json()

    if response.status_code != 200:
        return jsonify({
            "msg": "Weather data unavailable",
            "error": data.get("message", "Unknown error")
        }), 500

    return jsonify({
        "location": data.get("name", "Unknown"),
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "condition": data["weather"][0]["description"].title(),
        "wind_speed": data["wind"]["speed"]
    }), 200
