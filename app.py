from flask import Flask, render_template, send_from_directory, request, jsonify, request,Response, redirect, url_for
import os

from werkzeug.utils import secure_filename

from MT103_Multiple_Samples import MT103_Multiple_Samples
from MT103_Multiple_Samples.MT103_Combinations import convert_excel_to_mt103
from Modify_Files.Modify_MT103 import modify_MT103files
import re
import datetime

app = Flask(__name__)
app.static_url_path = '/static'
app.static_folder = 'static'

@app.route('/')
def index():
    return render_template('CustomSingleSampleGenerator.html')

@app.route('/process_combinations', methods=['POST'])
def process_blob():
    # Retrieve the blobs from the request
    hdr_blob = request.files['hdr_blob']
    tag_list_blob = request.files['tag_list_for_combinations_blob']

    # Read the content of the blobs
    hdr_blob_content = hdr_blob.read()
    tag_list_content = tag_list_blob.read()

    # Convert the binary content of blobs to strings
    hdr_blob_data = hdr_blob_content.decode('utf-8')
    tag_list_content = tag_list_content.decode('utf-8')

    # Now, call your function with the data
    file_count = convert_excel_to_mt103('MT103.xlsx', hdr_blob_data, eval(tag_list_content), output_directory='output')
    print(file_count)
    # You can return a response if needed
    return jsonify({'message': 'All combinations generated successfully', 'file_count': file_count})


@app.route('/success/<int:file_count>')
def success(file_count):
    return render_template('success.html', file_count=file_count)


@app.route('/MT103_Samples_Combination')
def MT103_Samples_Combination():
    return render_template('MT103_Samples_Combination.html')


@app.route('/CustomSingleSampleGenerator')
def CustomSingleSampleGenerator():
    return render_template('CustomSingleSampleGenerator.html')


@app.route('/SampleMaintainer')
def Sample_Maintainer():
    return render_template('Sample_Maintainer.html')


@app.route('/SampleMaintainer',methods=['POST'])
def process_form():
    source_path = request.form['source_path']
    destination_path = request.form['destination_path']

    # Call the modify_files function to perform file modifications
    modify_MT103files(source_path, destination_path)

    return render_template('success.html')