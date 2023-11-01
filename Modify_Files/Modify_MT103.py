import os
import re
import datetime
import time
import uuid

# Function to generate a random 16-character string
def generate_unique_id():
    # Get the current timestamp
    timestamp = int(time.time())

    # Generate a UUID (Universally Unique Identifier)
    unique_id = uuid.uuid4().hex

    # Combine the timestamp and UUID to create a 16-digit unique ID
    unique_id = str(timestamp) + unique_id

    # Take the first 16 characters to ensure it's 16 digits
    unique_id = unique_id[:16]

    return unique_id

# Function to replace :32A: field date with the current date
def modify_swift_message(swift_message):
    # Generate a unique 16-character string
    unique_string = generate_unique_id()

    # Replace :20: with the unique string
    swift_message = re.sub(r':20:[^\n]*', f':20:{unique_string}', swift_message)

    # Get the current date in the SWIFT format (YYMMDD)
    current_date = datetime.datetime.now().strftime('%y%m%d')

    # Replace :32A: date with the current date
    swift_message = re.sub(r':32A:\d{6}', f':32A:{current_date}', swift_message)

    return swift_message

def modify_MT103files(source_directory, destination_directory):
    # Create the destination directory if it doesn't exist
    os.makedirs(destination_directory, exist_ok=True)

    for filename in os.listdir(source_directory):
        source_file_path = os.path.join(source_directory, filename)
        destination_file_path = os.path.join(destination_directory, filename)

        if os.path.isfile(source_file_path):
            try:
                with open(source_file_path, 'r') as file:
                    swift_message = file.read()

                modified_swift_message = modify_swift_message(swift_message)

                with open(destination_file_path, 'w') as modified_file:
                    modified_file.write(modified_swift_message)

                print(f"Modified: {destination_file_path}")

            except Exception as e:
                print(f"Error processing {source_file_path}: {str(e)}")
