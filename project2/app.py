import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/youtube.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Youtube_Metadata = Base.classes.yt_data
Samples = Base.classes.yt_data


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/subscribers")
def subscribers():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    df = df.sort_values("Subscribers", ascending=False)
    # Return a list of the column names (sample names)
    data = {
        "Subscribers": df.Rank.values.tolist(),
        "Grade": df.Grade.values.tolist(),
        "Channelname": df.Channelname.values.tolist(),
        "VideoUploads": df.VideoUploads.values.tolist(),
        "Subscribers": df.Subscribers.values.tolist(),
        "Videoviews": df.Videoviews.values.tolist()
    }
    return jsonify(data)


@app.route("/videoviews")
def videoviews():
    """Return the MetaData for a given sample."""
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    df = df.sort_values("Videoviews", ascending=False)
    # Return a list of the column names (sample names)
    data = {
        "Subscribers": df.Rank.values.tolist(),
        "Grade": df.Grade.values.   tolist(),
        "Channelname": df.Channelname.values.tolist(),
        "VideoUploads": df.VideoUploads.values.tolist(),
        "Subscribers": df.Subscribers.values.tolist(),
        "Videoviews": df.Videoviews.values.tolist()
    }
    return jsonify(data)




if __name__ == "__main__":
    app.run()
