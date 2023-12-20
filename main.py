from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename
import predict
import food


app = Flask(__name__)
results_list = []
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        f = request.files['file']
        
        if f.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        file_path = secure_filename(f.filename)
        f.save(file_path)

        result = predict.predict_image(file_path)
        
        data = food.search(result)

        os.remove(file_path)
        if result not in results_list:
            results_list.append(result)


        return jsonify({'result': result,
                        'data' : data, 'results_list': results_list}), 200

    # Trả về phản hồi nếu không phải là phương thức POST
    return jsonify({'error': 'Method not allowed'}), 405

@app.route('/cook', methods=['POST'])
def display_results():
    print(results_list)
    if request.method == 'POST':
        data = food.cook(results_list)
        return jsonify({'data' : data}), 200

@app.route('/reset', methods=['POST'])
def clear_results():
    if request.method == 'POST':
        results_list.clear()
        return jsonify({'results_list': results_list}), 200

@app.route('/process_food/<string:id_>', methods=['GET'])
def process_food(id_):
    if request.method == 'GET':
        data = food.get_recipe_information(id_)
        data1 = food.print_recipe_information(data)
        return jsonify({'data' : data, 'data1' : data1}), 200

    # Trả về phản hồi nếu không phải là phương thức POST
    return jsonify({'error': 'Method not allowed'}), 405

if __name__ == '__main__':
    app.run()