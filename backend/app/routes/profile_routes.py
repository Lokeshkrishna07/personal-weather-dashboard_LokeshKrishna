from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User
from app import db

profile_bp = Blueprint("profile", __name__)

@profile_bp.route("/location", methods=["PUT"])
@jwt_required()
def update_location():
    data = request.get_json()
    user = User.query.get(get_jwt_identity())

    # Accept both city+country or lat+lon
    if "city" in data and "country" in data:
        user.city = data.get("city")
        user.country = data.get("country")
        user.latitude = None
        user.longitude = None
    elif "latitude" in data and "longitude" in data:
        user.latitude = float(data.get("latitude"))
        user.longitude = float(data.get("longitude"))
        user.city = None
        user.country = None
    else:
        return jsonify({"msg": "Provide either city+country or latitude+longitude"}), 400

    db.session.commit()
    return jsonify({"msg": "Location updated successfully"}), 200
