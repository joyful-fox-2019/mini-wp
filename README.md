# MiniWordpress API Documentation

## **A. User Routes**
- - -
| Routes         | HTTP | Headers | Body |
|----------------|------|---------|------|
| /users/register | POST | None | name: string, email: string, password: string |
| /users/login    | POST | None | email: string, password: string |
| /users/googleSignIn | POST | googleidtoken: string | None |
| /users/user | GET | access_token: string | None |


**1. Register**
----
  Returns an access token.

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   None

* **Data Params**

  name: string; email: string; password: string

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ "message": "Successfully registered!", "access_token": "bar" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
    "messages": [
        "Email address has already been used!"
    ]
}`

**2. Log in**
----
  Returns an access token.

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Data Params**

  email: string; password: string;

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "Successfully logged in!", "access_token": "bar" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "messages": [
        "Wrong email/password!"
    ]
}`

**3. Sign in with Google**
----
  Returns an access token.

* **URL**

  /users/googleSignIn

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   googleidtoken: string;

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ "message": "Successfully registered!", "access_token": "bar" }`

    OR

  * **Code:** 200 <br />
    **Content:** `{ "message": "Successfully logged in!", "access_token": "bar" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "messages": [
        "Wrong email/password!"
    ]
}`

**4. Fetch a user**
----
  Returns currently active user.

* **URL**

  /users/user

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string;

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "user": {"foo": "bar"} }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`
- - -
## **B. Article Routes**
- - -
| Routes         | HTTP | Headers | Body |
|----------------|------|---------|------|
| /articles/upload-single | POST | access_token: string | image: file |
| /articles    | GET | access_token: string | None |
| /articles | POST | access_token: string | title: string, content: string, imageUrl: string |
| /articles/:id | GET | access_token: string | None |
| /articles/:id | PATCH | access_token: string | _id: string, title: string, content: string |
| /articles/:id | DELETE | access_token: string | None |

**1. Upload an image file**
----
  Upload a single image file to the database.

* **URL**

  /articles/upload-single

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  image: file

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "data": imageUrl }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Upload image failed. Please try again!"
    ]
}`

**2. Fetch all articles**
----
  Returns all articles from the database.

* **URL**

  /articles

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "articles": [{"foo": "bar"}] }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to fetch articles. Please refresh the browser!"
    ]
}`

**3. Add an article**
----
  Create a new article.

* **URL**

  /articles

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "Successfully published an article!" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to submit the article. Please try again!"
    ]
}`

**4. Fetch an article**
----
  Fetch a specific article.

* **URL**

  /articles/:id

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "article": {"foo": "bar"} }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to fetch the article. Please try again!"
    ]
}`

**5. Update an article**
----
  Update a specific article.

* **URL**

  /articles/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "article": {"foo": "bar"} }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to update the article. Please try again!"
    ]
}`

**6.Delete an article**
----
  DElete a specific article.

* **URL**

  /articles/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "Successfully deleted an article!"} }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to delete the article. Please try again!"
    ]
}`