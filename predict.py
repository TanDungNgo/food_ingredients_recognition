from keras.models import load_model
from keras import backend as K
import numpy as np
from keras.preprocessing import image
import cv2

K.clear_session()
path_to_model='./model_v1_inceptionV3_build.h5'
print("Loading the model..")
model = load_model(path_to_model)
print("Done!")

category={
    0: ['apple','Apple'], 1: ['banana','Banana'], 2: ['bread','Bread'], 3: ['carrot', 'Carrot'], 4: ['cheese', 'Cheese'],
    5: ['chicken','Chicken'], 6:['corn','Corn'], 7: ['crab','Crab'], 8: ['egg','Egg'], 9:['fish', 'Fish'], 10: ['garlic', 'Garlic'], 
    11: ['lettuce', 'Lettuce'], 12: ['meat', 'Meat'], 13: ['milk','Milk'], 14:['noodle', 'Noodle'], 15: ['potato','Potato'], 
    16: ['rice', 'Rice'], 17: ['shrimp', 'Shrimp'], 18: ['tofu', 'Tofu'], 19: ['tomato', 'Tomato']
}

def predict_image(filename,model = model):
    img_ = image.load_img(filename, target_size=(299, 299))
    img_array = image.img_to_array(img_)
    img_processed = np.expand_dims(img_array, axis=0)
    img_processed /= 255.

    prediction = model.predict(img_processed)
    
    top_values_indices = np.argsort(prediction[0])[-3:][::-1]
    for idx in top_values_indices:
        class_info = category[idx]
        class_name, display_name = class_info
        confidence = prediction[0][idx]
        print(f"{display_name}: {confidence * 100:.2f}%")
    
    index = np.argmax(prediction)
    return category[index][1]

def predict_frame(frame, model=model, threshold=0.9):
    # Resize and convert to float32
    img_resized = cv2.resize(frame, (299, 299)).astype(np.float32)
    img_array = np.expand_dims(img_resized, axis=0)
    
    # Convert to uint8 and divide by 255
    img_array = (img_array.astype(np.uint8)) / 255.

    prediction = model.predict(img_array)

    max_prob = np.max(prediction)    
    if max_prob > threshold:
        print(max_prob)
        index = np.argmax(prediction)
        return category[index][1]
    else:
        return None