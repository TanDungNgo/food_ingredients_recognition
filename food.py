import requests
from flask import Flask, render_template, request, jsonify

#api-endpoint
URL = "https://api.spoonacular.com/recipes/complexSearch"
API_KEY = "e8024e5ec5b240f89f3d00a36c231c74"

def search(query, api_key = API_KEY):
    
    PARAMS = {
        'apiKey' : api_key,
        'query' : query
    }
    r = requests.get(url = URL, params = PARAMS)
    data = r.json()
    return data
