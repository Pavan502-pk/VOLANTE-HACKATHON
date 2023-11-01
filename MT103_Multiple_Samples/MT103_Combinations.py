import itertools
import os
import pandas as pd
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
def convert_excel_to_mt103(excel_file_path, mt103_input_header, tag_list_for_combinations, output_directory='output'):
    df = pd.read_excel(excel_file_path)
    # Remove newline characters from mt103_input_header
    mt103_input_header = mt103_input_header.replace('\r', '').replace('\n', '')

    # Check if the output directory exists; if not, create it
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)
    else:
        # If the directory already exists, remove existing files
        for file_name in os.listdir(output_directory):
            file_path = os.path.join(output_directory, file_name)
            if os.path.isfile(file_path):
                os.remove(file_path)
                script_directory = os.path.dirname(os.path.abspath(__file__))
                print(script_directory)

    # Print the modified mt103_input_header
    print(mt103_input_header)
    print(tag_list_for_combinations)
    print(type(tag_list_for_combinations))
    optional_indices = [i for i, (status, _) in enumerate(tag_list_for_combinations) if status == 'O']

    all_combinations = []
    for num_optionals in range(len(optional_indices) + 1):
        for combination_indices in itertools.combinations(optional_indices, num_optionals):
            new_sequence = [field for i, field in enumerate(tag_list_for_combinations) if i not in combination_indices]
            all_combinations.append(new_sequence)

    file_counter = 1

    for combination in all_combinations:
        output_list = [t[1] for t in combination]
        extracted_rows = []

        for index, row in df.iterrows():
            # Check if the row starts with "20," and skip it
            if str(row['Tag']).startswith("20"):
                continue
            for column in df.columns:
                cell_value = str(row[column])
                if cell_value in output_list:
                    extracted_rows.append(row)

        extracted_df = pd.DataFrame(extracted_rows)

        if not extracted_df.empty:
            output_filename = os.path.join(output_directory, f'MT103_{file_counter}.txt')
            with open(output_filename, 'w') as file:
                file.write(f"{mt103_input_header}\n") # Write all tags on the same line
                file.write(f":20:{generate_unique_id()}\n")
                for index, row in extracted_df.iterrows():
                    for column, value in row.items():
                        if column == 'Tag':
                            file.write(f":{value}:")
                        else:
                            file.write(f"{value}\n")
                file.write("-}")

            file_counter += 1
    return file_counter - 1
