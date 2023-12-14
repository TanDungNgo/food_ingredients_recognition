from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename
import predict
import food


app = Flask(__name__)

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


        return jsonify({'result': result,
                        'data' : data}), 200

    # Trả về phản hồi nếu không phải là phương thức POST
    return jsonify({'error': 'Method not allowed'}), 405


if __name__ == '__main__':
    app.run()