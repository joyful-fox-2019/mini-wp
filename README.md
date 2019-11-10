# myMiniWordpress

------

**Base URL:**

https://myMiniWP-server.nadhiljanitra.xyz

**User routes:**

| **Route**           | **METHOD** | **Description**                |
| :------------------ | :--------- | :----------------------------- |
| /users/:userId      | GET        | Get a user details             |
| /users/login        | POST       | Sign in user                   |
| /users/register     | POST       | Sign up new user               |
| /users/login/google | POST       | Sign in using OAuth 2.0 Google |
| /users/login/github | POST       | Sign in using OAuth 2.0 Google |
| /users/:userId      | PATCH      | Update user detail             |
| /users/:userId      | DELETE     | Remove user from database      |

**Articles routes:**

| **Route**               | **HTTP** | **Description**                      |
| :---------------------- | :------- | :----------------------------------- |
| /articles/posted        | GET      | Get all posted articles              |
| /articles/draft/:userId | GET      | Get all drafted articles from a user |
| /articles/:articleId    | GET      | Get an article details               |
| /articles/add           | POST     | Create new article                   |
| /articles/addDraft      | POST     | Create new drafted article           |
| /articles/:articleId    | PATCH    | Update an article                    |
| /articles/:articleId    | DELETE   | Delete an article                    |

**Errors:**

| Code | Name                  | Description                                         |
| :--- | :-------------------- | :-------------------------------------------------- |
| 400  | Bad Request           | Invalid user's submitted data                       |
| 403  | Forbidden             | User not authorize to perform an action             |
| 404  | Not Found             | The requested resource could not be found           |
| 409  | Conflict              | Request could not be completed due to conflict data |
| 500  | Internal Server Error | We had a problem with our server                    |

## **Find User**

- **URL:** `/users/:userId`

- **Method:** `GET`

- **URL Params:** 

  - Required :
    - `userId = [string]`

- **URL Headers:** 

  - Required :
    - `token = [access_token]`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
        {
            "id": 1,
            "email": "admin@admin.com",
            "username": "admin",
            "password": "$Jgjya$sd32SDcal7642Shjhs*&^sada23",
            "articles" : [],
            "loginBy" : "web",
            "updatedAt": "2019-10-29T15:21:41.639Z",
            "createdAt": "2019-10-29T15:21:41.639Z"
        }
    ```

- **Error Response:**

  - **Status:** `404` **Content:**

    ```
        {
            "message": 'Email already in use'
        }
    ```



## **Register User**

- **URL:** `/users/register`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** `email, username, password`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
        {
            "id": 1,
            "email": "winata.luk@gmail.com",
            "username": "lukywinata",
            "password": "hashhashahsahsahhs",
            "updatedAt": "2019-10-29T15:21:41.639Z",
            "createdAt": "2019-10-29T15:21:41.639Z"
        }
    ```

- **Error Response:**

  - **Status:** `404` **Content:**

    ```
        {
            "message": 'User not found'
        }
    ```

## **Login User**

- **URL:** `/users/login`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** `email, password`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcyMzYzNzUwfQ.Gf0JAtSpcI1r5C6VHAlp-znvaFxJZL5b5pJ5gaCTrNs"
    }
    ```

- **Error Response:**

  - Status:

     

    400

     

    Content:

    ```
        {
            "message": 'Email/Password is Incorrect'
        }
    ```

## **Login Using OAuth 2.0 Google**

- **URL:** `/users/loginOAuth`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** `id_token`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcyMzYzNzUwfQ.Gf0JAtSpcI1r5C6VHAlp-znvaFxJZL5b5pJ5gaCTrNs"
    }
    ```

- **Error Response:**

  - **Status:** 500 **Content:**

    ```
        {
            "message": 'Internal server error'
        }
    ```

## **Get Questions from TrivianDb API**

- **URL:** `/apis/trivia`

- **Method:** `GET`

- **URL Params:** `None`

- **Data Params:** `subject to change`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
     {
        "response_code": 0,
        "results": [
            {
                "category": "Entertainment: Video Games",
                "type": "multiple",
                "difficulty": "medium",
                "question": "Which was the first video game to be produced by development company Rare?",
                "correct_answer": "Slalom",
                "incorrect_answers": [
                    "R.C. Pro-Am",
                    "Donkey Kong Country",
                    "Battletoads"
                ]
            },...
          ]
    }
    ```

- **Error Response:**

  - **Status:** `500` **Content:**

    ```
        {
            "message": 'Internal Server Error'
        }
    ```

## **Get Advice**

- **URL:** `/apis/bored`

- **Method:** `GET`

- **URL Params:** `None`

- **Data Params:** `None`

- **Success Response:**

  - **Status:** 200 **Content:**

    ```
    {
        "activity": "Make a new friend",
        "accessibility": 0,
        "type": "social",
        "participants": 1,
        "price": 0,
        "link": "",
        "key": "1000000"
    }
    ```

- **Error Response:**

  - **Status:** 500 **Content:**

    ```
        {
            "message": 'Internal Server Error'
        }
    ```

#### Usage

Make sure you have Node.js and npm installed on your computer, then run these command.

```
$ npm install
```

#### Environment Variables

```
JWT_SECRET = to-do-api
```