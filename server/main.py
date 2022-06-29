from PIL import Image, ImageOps
import shutil
import os
import matplotlib.pyplot as plt
import segmentor as segmentor
import pandas as pd
from tensorflow.python.keras.models import load_model
import numpy as np
import cv2
import warnings
warnings.filterwarnings("ignore")

root = os.getcwd()
if 'segmented' in os.listdir():
    shutil.rmtree('segmented')
if 'solution.png' in os.listdir():
    os.remove('solution.png')
os.mkdir('segmented')
SEGMENTED_OUTPUT_DIR = os.path.join(root, 'segmented')
MODEL_PATH = os.path.join(root, 'model.h5')
mapper = os.path.join(root, 'mapper.csv')


def img2emnist(filepath, char_code):
    img = Image.open(filepath).resize((28, 28))
    inv_img = ImageOps.invert(img)
    flatten = np.array(inv_img).flatten() / 255
    flatten = np.where(flatten > 0.5, 1, 0)
    csv_img = ','.join([str(num) for num in flatten])
    csv_str = '{},{}'.format(char_code, csv_img)
    print("csv_str = ", len(csv_str))
    return csv_str


def processor(INPUT_IMAGE):
    img = Image.open(INPUT_IMAGE)
    segmentor.image_segmentation(INPUT_IMAGE)
    segmented_images = []
    files = sorted(list(os.walk(SEGMENTED_OUTPUT_DIR))[0][2])
    for file in files:
        file_path = os.path.join(SEGMENTED_OUTPUT_DIR, file)
        segmented_images.append(Image.open(file_path))

    files = sorted(list(os.walk(SEGMENTED_OUTPUT_DIR))[0][2])
    for file in files:
        filename = os.path.join(SEGMENTED_OUTPUT_DIR, file)
        img = cv2.imread(filename, 0)

        kernel = np.ones((2, 2), np.uint8)
        dilation = cv2.erode(img, kernel, iterations=1)
        cv2.imwrite(filename, dilation)

    segmented_characters = 'segmented_characters.csv'
    if segmented_characters in os.listdir():
        os.remove(segmented_characters)
    with open(segmented_characters, 'a+') as f_test:
        column_names = ','.join(["label"] + ["pixel" + str(i)
                                for i in range(784)])
        print(column_names, file=f_test)

        files = sorted(list(os.walk(SEGMENTED_OUTPUT_DIR))[0][2])
        for f in files:
            file_path = os.path.join(SEGMENTED_OUTPUT_DIR, f)
            csv = img2emnist(file_path, -1)
            print(csv, file=f_test)

    data = pd.read_csv('segmented_characters.csv')
    X_data = data.drop('label', axis=1)
    X_data = X_data.values.reshape(-1, 28, 28, 1)
    X_data = X_data.astype(float)

    df = pd.read_csv(mapper)
    code2char = {}
    for index, row in df.iterrows():
        code2char[row['id']] = row['char']
    model = load_model(MODEL_PATH)
    results = model.predict(X_data)
    results = np.argmax(results, axis=1)
    parsed_str = ""
    for r in results:
        parsed_str += code2char[r]
    return parsed_str


def main(operationBytes):
    Image.open(operationBytes).save('input.png')
    equation = processor('input.png')
    return equation
