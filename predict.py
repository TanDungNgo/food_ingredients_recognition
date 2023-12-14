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
    0: ['apple','Apple'], 1: ['banana','Banana'], 2: ['bread','Bread'],
    3: ['chicken','Chicken'], 4: ['crab','Crab'], 5: ['egg','Egg'], 6: ['milk','Milk'], 7: ['pomato','Pomato'],
    8: ['tofu', 'Tofu'], 9: ['tomato', 'Tomato']
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