from tensorflow.keras.models import load_model
from tensorflow.keras import backend as K
import numpy as np
from tensorflow.keras.preprocessing import image

K.clear_session()
path_to_model='./model_v1_inceptionV3.h5'
print("Loading the model..")
model = load_model(path_to_model)
print("Done!")

category={
    0: ['apple','Apple'], 1: ['banana','Banana'], 2: ['bread','Bread'], 3: ['carrot', 'Carrot'],
    4: ['chicken','Chicken'], 5: ['crab','Crab'], 6: ['egg','Egg'], 7: ['milk','Milk'], 8: ['potato','Potato'], 9: ['shrimp', 'Shrimp'],
    10: ['tofu', 'Tofu'], 11: ['tomato', 'Tomato'],
}

def predict_image(filename,model = model):
    img_ = image.load_img(filename, target_size=(299, 299))
    img_array = image.img_to_array(img_)
    img_processed = np.expand_dims(img_array, axis=0)
    img_processed /= 255.

    prediction = model.predict(img_processed)

    index = np.argmax(prediction)

    return category[index][1]

if __name__ == '__main__':
    print(predict_image('./1_jpg.rf.02f339d58c19a0efa70e1aacc0ae7531_-_Copy.jpg'))