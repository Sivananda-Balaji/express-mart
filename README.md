# express-mart
Express Mart : A Fast and Flexible Ecommerce Application

This project involves building a RESTful API for a web app called express-mart. The API will be used to perform various functionalities required by the web app, and the data will be stored in a MongoDB database. The project is built using Express.js and Node.js, and version control is done using Git and GitHub.

## Installation
1. Clone or Download the repository.  
2. Install the required dependencies using npm install.

## Usage
1. Start the server using npm start.   
2. The server will be available at http://localhost:8000/    
3. Use any REST client to interact with the API endpoints    

## Models and ID Ranges   

- User: 1000 and above   
- Address: 2000 and above    
- Product: 3000 and above    
- Order: 4000 and above    

## Authentication    

- Admin:    
  - An admin account has already been set up in accordance with the provided instructions.    

- Users:    
  - Email: guest.user@xyz.com    
  - Password: password  

## Database Setup
To view and manipulate the data stored in the database, please connect to the MongoDB database using the provided connection string in the project.   

## API Endpoints
The API has the following endpoints:

### 1. Authentication   
POST /api/v1/users  
Create a new user account    

POST /api/v1/auth  
Login to an existing user account   

### 2. Address
POST /api/v1/addresses  
Create a new address    

### 3. Products
POST /api/v1/products    
Create a new product   

GET /api/v1/products/categories      
Get all Categories    

GET /api/v1/products/:id      
Get product by Id    

PUT /api/v1/products/:id     
Update product by Id    

DEL /api/v1/products/:id   
Delete product by Id    

GET /api/v1/products?category=Electronics   
Get all the product belongs to Electronics   
Query string accepts name,category,direction,sortBy parameters    

### 4. Orders   
POST /api/v1/orders     
Create a new order    

