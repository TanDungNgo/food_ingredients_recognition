import imutils
import time
import cv2
import predict


def pyramid(image, scale=1.5, minSize=(30, 30)):
	# yield the original image
	yield image
	# keep looping over the pyramid
	while True:
		# compute the new dimensions of the image and resize it
		w = int(image.shape[1] / scale)
		image = imutils.resize(image, width=w)
		# if the resized image does not meet the supplied minimum
		# size, then stop constructing the pyramid
		if image.shape[0] < minSize[1] or image.shape[1] < minSize[0]:
			break
		# yield the next image in the pyramid
		yield image
def sliding_window(image, stepSize, windowSize):
	# slide a window across the image
	for y in range(0, image.shape[0], stepSize):
		for x in range(0, image.shape[1], stepSize):
			# yield the current window
			yield (x, y, image[y:y + windowSize[1], x:x + windowSize[0]])
			

# load the image and define the window width and height
image = cv2.imread("E:/Subjects\HocMayUngDung/food_ingredients_recognition/test1.jpg")
(winW, winH) = (128, 128)

image = imutils.resize(image, width=500)

list_label_unique = []
list_frame = []
list_label = []
main_frame = None
check = True

# loop over the image pyramid
for resized in pyramid(image, scale=1.5):
	# loop over the sliding window for each layer of the pyramid
	for (x, y, window) in sliding_window(resized, stepSize=32, windowSize=(winW, winH)):
		# if the window does not meet our desired window size, ignore it
		if window.shape[0] != winH or window.shape[1] != winW:
			continue
		# THIS IS WHERE YOU WOULD PROCESS YOUR WINDOW, SUCH AS APPLYING A
		# MACHINE LEARNING CLASSIFIER TO CLASSIFY THE CONTENTS OF THE
		# WINDOW
		# since we do not have a classifier, we'll just draw the window
		clone = resized.copy()
		if check:
			main_frame = clone
			check = False
		result = predict.predict_frame(window, threshold=0.9)
		print(result)
		if result != None:
			list_label.append(result)
		if result not in list_label_unique and result != None:
			list_label_unique.append(result)
			frame_size = [x, y, x + winW, y + winH]
			list_frame.append(frame_size)
		cv2.rectangle(clone, (x, y), (x + winW, y + winH), (0, 255, 0), 2)
		cv2.imshow("Window", clone)
		cv2.waitKey(1)
		time.sleep(0.025)

cv2.destroyAllWindows()
print(list_label_unique)
# for frame, i in zip(list_frame, range(len(list_frame))):
# 	cv2.rectangle(main_frame, (frame[0], frame[1]), (frame[2], frame[3]), (0, 255, 0), 2)
# 	# Draw label
# 	cv2.putText(main_frame, list_label[i], (frame[2], frame[3]), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 1)
# cv2.imshow("Image", main_frame)
# cv2.waitKey(0)