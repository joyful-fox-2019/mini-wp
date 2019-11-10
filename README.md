# mini-wp

## register

**POST /register**
* **URL**

  `/register`

* **Method:**

  `POST` 
  
* **Data Body**

   `'key' username 'value' [string] = your username`
 
   `'key' email 'value' [string] = your email`

   `'key' password 'value' [string] = your password`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "_id": "your id",
        "username": "your username",
        "email": "your email",
        "password : "your hashed password"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'Email/Username is already Token' }`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'email/password is required' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`

## login  

**POST /login**
* **URL**

  `/login`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' email 'value' [string] = your email`

   `'key' password 'value' [string] = your password`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "token": "your token",
        "payload" : "your information"
    }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ message: 'invalid email/password' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`

## gsign

**POST /gsign**
* **URL**

  `/gsign`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' id_token 'value' [string] = your google ID Token`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "token": "your token",
        "email" : "your payload"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`

## users

**GET /users**
* **URL**

  `/users`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        articlesId : 
        [   
            {
               "featured_image": "your image url",
               "_id": "your article id",
               "title": "your article title",
               "tag": "your article tag",
               "content": "your article content",
               "createdAt": "date created",
               "author": "your name",
           },
           ............................................and more
        ],
        your personal information
    }
        	
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`



**GET users/search?**
* **URL**

  `users/search?`

* **Method:**

  `GET` 
  
* **Data Query**

    **Query** 

    `'Query' [filter] = your filtered title`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [   
       {
           your filtered article
       },
       ............................................and more
    ]

    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`



**POST /users**
* **URL**

  `/users`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' image 'value' [file] = your image file`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        status: 200,
        message: 'Your file is successfully uploaded',
        link: your image link url from google cloud storage
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'file image is required' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


## articles

**GET /articles**
* **URL**

  `/articles`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [   
       {
          "featured_image": "users article image url",
          "_id": "users article id",
          "title": "users article title",
          "tag": "users article tag",
          "content": "users article content",
          "createdAt": "date created",
          "author": "users name",
       },
       ............................................and more
    ],
        	
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`



**GET articles/:id**
* **URL**

  `articles/:id`

* **Method:**

  `GET` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = article Id`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
       "featured_image": "selected article image url",
       "_id": "selected article id",
       "title": "selected article title",
       "tag": "selected article tag",
       "content": "selected article content",
       "createdAt": "date created",
       "author": "selected user",
    }

    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`



**GET articles/page/:page**
* **URL**

  `articles/page/:page`

* **Method:**

  `GET` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = page number`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
        *one page generate 5 article*
    [
        {
           "featured_image": "selected page article image url",
           "_id": "selected page article id",
           "title": "selected page article title",
           "tag": "selected page article tag",
           "content": "selected page article content",
           "createdAt": "date created",
           "author": "selected page user",
        },
        ............................................and other 4
    ]

    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**GET articles/search?**
* **URL**

  `articles/search?`

* **Method:**

  `GET` 
  
* **Data Query**

    **Query** 

    `'Query' [filter] = users filtered title`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [   
       {
           users filtered article
       },
       ............................................and more
    ]

    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`



**POST /articles**
* **URL**

  `/articles`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' title 'value' [string] = your article title`

   `'key' tag 'value' [string] = your article tag`

   `'key' content 'value' [string] = your article content`

   `'key' createdAt 'value' [date] = date of created`

   `'key' author 'value' [string] = your name`

   `'key' featured_image 'value' [string] = your uploaded image url`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "msg" : "sucessfully created",
        "data" :{
            "title": "created article title",
            "tag": "created article tag",
            "content": "created article content",
            "createdAt": "date created",
            "author": "your name",
            "featured_image": "your uploaded image url link "
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'title is required' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'tag is required' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'content is required' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**PATCH /articles/:id**
* **URL**

  `/articles/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = article Id`

* **Data Body**
 
    **body:** 

   `'key' title 'value' [string] = your article title`

   `'key' tag 'value' [string] = your article tag`

   `'key' content 'value' [string] = your article content`

   `'key' createdAt 'value' [date] = date of created`

   `'key' author 'value' [string] = your name`

   `'key' featured_image 'value' [string] = your uploaded image url`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg" : "sucessfully updated",
        "data" :{
            "title": "updated article title",
            "tag": "updated article tag",
            "content": "updated article content",
            "createdAt": "date updated",
            "author": "your name",
            "featured_image": "your uploaded image url link "
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**DELETE /articles/:id**
* **URL**

  `/articles/:id`

* **Method:**

  `DELETE` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = articles Id`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg" : "sucessfully deleted",
        "data" :{
            "title": "deleted article title",
            "tag": "deleted article tag",
            "content": "deleted article content",
            "createdAt": "date created",
            "author": "your name",
            "featured_image": "your uploaded image url link "
        }
    } 
    ```
 
* **Error Response:**


  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`







