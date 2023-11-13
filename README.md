# FashionShoppingApp

Fashion Shopping App

API’s:

User Profile Logging API’s:
Route: POST
URL : http://localhost:3000/user/profileLogging
INPUTS : 
{
    "customerName": "hanuma",
    "username": "hanuma",
    "password": "hanuma@123",
    "gender": "male",
    "preferredCategory": "Clothing"
}


Product Search API’s:
Route: POST
URL : http://localhost:3000/product/search
INPUTS : 
{
  "searchKeyword": "INKKR",
  "price_min": 200,
  "price_max": 500
}

Product recommendation  API’s:
Route: POST
URL : http://localhost:3000/recommendation/products
INPUTS : 
{
  "username": "hanuma"
}
