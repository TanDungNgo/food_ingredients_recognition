import cv2
import numpy as np
import predict
import imutils

list_label_unique = []
# Function to perform object detection using Selective Search and InceptionV3
def detect_objects(frame):
    # Perform Selective Search
    ss = cv2.ximgproc.segmentation.createSelectiveSearchSegmentation()
    ss.setBaseImage(frame)
    ss.switchToSelectiveSearchQuality()
    regions = ss.process()

    # Process each region proposal
    for (x, y, w, h) in regions[:1000]:
        # Extract region from the frame
        region = frame[y:y+h, x:x+w]

        output = region.copy()
        # Predict the class of the region
        result = predict.predict_frame(output, threshold=0.997)

        if result != None:
            if result not in list_label_unique:
                list_label_unique.append(result)
            # Draw bounding box and label on the frame
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
            cv2.putText(frame, result, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

    return frame

# Read a image file
image = cv2.imread("E:/Subjects\HocMayUngDung/food_ingredients_recognition/test8.jpg")
image = imutils.resize(image, width=800)
# Detect objects in the image
output = detect_objects(image)

print(list_label_unique)
# Show the output image
cv2.imshow("Output", output)
key = cv2.waitKey(0) & 0xFF
if key == ord("q"):
    cv2.destroyAllWindows()