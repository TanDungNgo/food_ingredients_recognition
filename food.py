import requests
from flask import Flask, render_template, request, jsonify

#api-endpoint
API_KEY = "efce568ab6974e2d936b80c791504e90"

def search(query, api_key = API_KEY):
    URL = "https://api.spoonacular.com/recipes/complexSearch"
    PARAMS = {
        'apiKey' : api_key,
        'query' : query
    }
    r = requests.get(url = URL, params = PARAMS)
    data = r.json()
    return data


def cook(list, api_key = API_KEY):
    query_string = ','.join(list)
    print(list)
    URL = "https://api.spoonacular.com/recipes/complexSearch"
    PARAMS = {
        'apiKey' : api_key,
        'query' : query_string
    }
    r = requests.get(url = URL, params = PARAMS)
    data = r.json()
    return data

def get_recipe_information(recipe_id, api_key = API_KEY):
    url = 'https://api.spoonacular.com/recipes/'
    endpoint = f'{recipe_id}/information'
    
    params = {
        'apiKey': api_key
    }
    url = url + endpoint
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        return response.json()
    else:
        return None

def print_recipe_information(recipe_info):
    if recipe_info:
        print(f"Tên món ăn: {recipe_info['title']}")
        print(f"Ảnh món ăn: {recipe_info['image']}")
        print(f"Nguồn: {recipe_info['creditsText']}")
        print(f"\nTóm tắt món ăn: {recipe_info['summary']}")
        if recipe_info['cuisines']:
            print("\nẨm thực:")
            for cuisines in recipe_info['cuisines']:
                print(f"- {cuisines}")
        print(f"Sử dụng làm:")
        for dishTypes in recipe_info['dishTypes']:
            print(f"- {dishTypes}")
        print(f"Chế độ ăn kiêng:")
        for diet in recipe_info['diets']:
            print(f"- {diet}")
        print(f"Khẩu phần ăn: {recipe_info['servings']} người")
        print(f"Thời gian nấu: {recipe_info['readyInMinutes']} phút")
        print(f"Nguồn link hướng dẫn: {recipe_info['spoonacularSourceUrl']}")
        print("\nNguyên liệu:")
        for ingredient in recipe_info['extendedIngredients']:
            print(f"- {ingredient['original']}")
            if ingredient['meta']:
                for meta in ingredient['meta']:
                    print(f"  +) {meta}")
        print("\nCách làm:")
        for step in recipe_info['analyzedInstructions'][0]['steps']:
            print(f"{step['number']}. {step['step']}")
    else:
        print("Không tìm thấy thông tin món ăn.")

