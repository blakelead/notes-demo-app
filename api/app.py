import datetime
import logging
import os
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

mongodb_uri = os.environ.get("MONGODB_URI", "db:27017")
build_version = os.environ.get("BUILD_VERSION", "dev")
environment = os.environ.get("ENVIRONMENT", "development")
debug = os.environ.get("DEBUG", True)

app = Flask(__name__)
app.config["ENV"] = environment
app.config["DEBUG"] = debug
CORS(app)

try:
    client = MongoClient(mongodb_uri, tls=False, serverSelectionTimeoutMS=5000)
    notes_coll = client.notes.notes
except Exception as e:
    app.logger.info(e)

@app.route("/api/notes", methods=["GET"])
def get_notes():
    try:
        notes = [ {**note, "_id": str(note["_id"])} for note in list(notes_coll.find({}))]
        return jsonify({"notes": notes})
    except Exception as e:
        app.logger.info(e)
        return jsonify({"error": "Erreur lors le recuperation des notes", "details": str(e)}), 500

@app.route("/api/notes", methods=["POST"])
def add_note():
    note = request.json["note"]
    try:
        inserted_id = notes_coll.insert_one({"note": note}).inserted_id
        return jsonify({"message": "note {inserted_id} created"})
    except Exception as e:
        app.logger.info(e)
        return jsonify({"error": "Erreur lors de la creation d'une note", "details": str(e)}), 500

@app.route("/api/notes/<note_id>", methods=["DELETE"])
def remove_note(note_id):
    try:
        notes_coll.delete_one({"_id": ObjectId(note_id)})
        return jsonify({"message": "note {note_id} deleted"})
    except Exception as e:
        app.logger.info(e)
        return jsonify({"error": "Erreur lors de la suppression d'une note", "details": str(e)}), 500

@app.route("/api/status", methods=["GET"])
def status():
    return jsonify({"build_version": build_version, "environment": environment})

if __name__ == "__main__":
    app.run()
    app.logger.info("Starting server...")
else:
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)