from flask import Blueprint

Modify_MT103 = Blueprint('modify_MT103files', __name__)

# Import the functions from my_functions.py
from . import Modify_MT103