# mini-wp

**Register User**

* **Method:**
    `POST` 

* **URL**
    <_/register_>

* **Data Params** <br />
    **Required:**
    
    `name=[string]` <br />
    `email=[string]` <br />
    `password=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            {
                "_id": "5dbf463e66d4901e33fe6b81",
                "email": "user@bmail.com",
                "password": "$2a$10$8cEP6gHdxjU7aZimMA8xouv3Xq40htC6ikfpUHOdPsPWVg8IFHpzG",
                "name": "user",
                "createdAt": "2019-11-03T21:27:26.087Z",
                "updatedAt": "2019-11-03T21:27:26.087Z",
                "__v": 0
            }
        ```

* **Error Response:**
  * **Code:** 422 Unprocessable Entity <br />
    **Content:** <br />
    `{
        "message": [
            "Please enter your email address."      
            "Please enter your name"
            "Please enter a valid email address"
            "Please enter your password"
        ]
    }` 

  * **Code:** 409 Conflict <br />
    **Content:** <br />
    `{
        "message": "Email already registered."
    }`

  * **Code:** 500 Internal Server Error<br />
    **Content:** <br />
    `{
        "message": "Internal Server Error"
    }`


**Login User**

* **URL**
    <_/login_>

* **Method:**
    `POST` 

* **Data Params** <br />
    **Required:**
    
    `email=[string]` <br />
    `password=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            {
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmY0NjNlNjZkNDkwMWUzM2ZlNmI4MSIsImVtYWlsIjoiYXNkYXNkYXNkQGFzZC5jb20iLCJpYXQiOjE1NzI4MTY1Mjl9.QPqj-wyuPI-pErO-PxDuJqe8a7gHysxRgQ8_yufcwH0"

            }
        ```

* **Error Response:**
  * **Code:** 401 unauthorized <br />
    **Content:** <br />
    `{
        "message": "Invalid email or password."
    }`


**Get All Articles**

* **URL**
    <_/articles>
* **Method:**
    `GET` 

* **Headers** <br />
    `Authorization=[string]`

* **Data Params** <br />
    none

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            [
                {
                    "_id": "5dc849754a895a81da0b6ae6",
                    "title": "article 1",
                    "content": "content or description",
                    "author": "5dc848cd3fca71811dfc4087",
                    "createdAt": "2019-11-10T17:31:33.252Z",
                    "updatedAt": "2019-11-10T17:31:33.252Z",
                    "__v": 0
                },
                {
                   "_id": "5dc849754a895a81da0b6ae6",
                    "title": "article 2",
                    "content": "content or description",
                    "author": "5dc848cd3fca71811dfc4087",
                    "createdAt": "2019-11-10T17:31:33.252Z",
                    "updatedAt": "2019-11-10T17:31:33.252Z",
                    "__v": 0
                }
            ]
        ```
* **Error Response:**
  * **Code:** 401 unauthorized <br />
    **Content:** <br />
    `{
        "name": "JsonWebTokenError",
        "message": "jwt must be provided"
    }` <br />
    `{
        "name": "JsonWebTokenError",
        "message": "invalid token"
    }`


**Delete an article**

* **URL**
    <_/api/articles/{id}_>

* **Method:**
    `DELETE` 

* **Headers** <br />
    `Authorization=[string]`

* **Data Params** <br />
    None

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript 
            {  
                "_id": "5dc849754a895a81da0b6ae6",
                "title": "Aricle 1",
                "content": "<p>This is the content of article 1/p>",
                "author": "5dc848cd3fca71811dfc4087",
                "createdAt": "2019-11-10T17:31:33.252Z",
                "updatedAt": "2019-11-10T17:31:33.252Z",
                "__v": 0 
            }  
        ```

* **Error Response:**
  * **Code:** 401 unauthorized <br />
    **Content:** 
        `{
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }`