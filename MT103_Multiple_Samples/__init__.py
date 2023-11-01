# MT103_Multiple_Samples/__init__.py
from flask import Blueprint

MT103_Multiple_Samples = Blueprint('MT103_Multiple_Samples', __name__)

# Import the functions from my_functions.py
from . import MT103_Combinations