# Mini WP

## Getting Started
---
Welcome to Mini WP! You can use the API to post, update, delete and read articles just like a real wordpress.<br/>
All API access is performed over HTTP and accessed from the http://miniwp.server.edirates.xyz.<br/>
You can do CRUD operation for articles by accessing to http://miniwp.server.edirates.xyz/articles.<br/>
Of course, you must login first and register a new user in order to be able to do CRUD operation.<br/>
Registering a new user or login with existing user can be done by accessing to http://miniwp.server.edirates.xyz/users.

API Base URL :
```html
  http://miniwp.server.edirates.xyz
```
Client URL :
```html
  http://miniwp.edirates.xyz
```

---
# Users

**1. Sign Up**
----
Register a new user :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/signup`     |
| **Method**                    | `POST`        |
| **Authentication Required**   | NO            |
| **Authorization Required**    | NO            |

Request Body :
| Field Name                    | Value                  |
| ----------------------------- | ---------------------- |
| **name**                      | `<your full name>`     |
| **email**                     | `<your email address>` |
| **password**                  | `<your password>`      |

Success Response :
  * **HTTP Code :** 201 (Created)
  * **JSON Response :**
  ```html
  {
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM2MGY1N2JmY2JhYzA1ZjBhNDRiYWMiLCJuYW1lIjoiSm9uIFNub3ciLCJlbWFpbCI6ImpvbkBzbm93LmNvbSIsImlhdCI6MTU3MzI2MTE0M30.YCfHTqP0ntd0TghpVXbOb_EzhCgVXWv81V0y0DtzLfE"
  }
  ```
Error Response : 
  * **HTTP Code :** 400 (Bad Request)
  * **JSON Response :**
  ```html
  {
    "message": [
        "Email must be unique.",
        "Invalid email format.",
        "Password length at least 8 characters."
    ]
  }
  ```

**2. Sign In**
----
Sign in with an existing user :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/signin`     |
| **Method**                    | `POST`        |
| **Authentication Required**   | NO            |
| **Authorization Required**    | NO            |

Request Body :
| Field Name                    | Value                  |
| ----------------------------- | ---------------------- |
| **email**                     | `<your email address>` |
| **password**                  | `<your password>`      |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM2MGY1N2JmY2JhYzA1ZjBhNDRiYWMiLCJuYW1lIjoiSm9uIFNub3ciLCJlbWFpbCI6ImpvbkBzbm93LmNvbSIsImlhdCI6MTU3MzI2MTI5OH0.tMQuB5xheHLxqq4fnd9V6BnxRF6rgevjya0KxRgLl2k"
  }
  ```
Error Response : 
  * **HTTP Code :** 400 (Bad Request)
  * **JSON Response :**
  ```html
  {
    "message": "User not found.",
  }
  ```

**3. Google Sign In**
----
Sign in with Google Account :
| Syntax                        | Description          |
| ----------------------------- | -------------------- |
| **URL**                       | `/gsignin`           |
| **Method**                    | `POST`               |
| **Authentication Required**   | NO                   |
| **Authorization Required**    | NO                   |

Request Body :
| Field Name                    | Value                   |
| ----------------------------- | ----------------------- |
| **CLIENT_ID**                 | `<Google Client ID>`    |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjZTFmOWFiYTE0OGMzNDZhYWQ3YmUiLCJlbWFpbCI6ImVkaXJhdGVzQGdtYWlsLmNvbSIsImlhdCI6MTU3MjY2NjU2MX0.DcYLScfR9RAz0-RgnfhWsFLTnfB7a1jyFvON9OagR6o"
  }
  ```
Error Response : 
  * **HTTP Code :** 500 (Internal Server Error)
  * **JSON Response :**
  ```html
  {
    "message": "Internal Server Error."
  }
  ```


---
# Articles

**1. Show All Articles**
----
Show all active articles from all users in database :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/articles/all`   |
| **Method**                    | `GET`             |
| **Authentication Required**   | NO                |
| **Authorization Required**    | NO                |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  [
    {
        "featured_image": "https://storage.googleapis.com/miniwp.images.edirates.xyz/1573261878160IMG_0001.jpg",
        "tags": [
            "winter",
            " snow"
        ],
        "status": true,
        "_id": "5dc61236bfcbac05f0a44bad",
        "title": "Winter is Coming",
        "content": "You know nothing",
        "author": "Jon Snow",
        "UserId": "5dc60f57bfcbac05f0a44bac",
        "createdAt": "2019-11-09T01:11:18.648Z",
        "updatedAt": "2019-11-09T01:11:18.648Z",
        "__v": 0
    },
    {
        "featured_image": "https://storage.googleapis.com/miniwp.images.edirates.xyz/1573238430973IMG_0001.jpg",
        "tags": [
            "hello",
            " world"
        ],
        "status": true,
        "_id": "5dc5b69f53c3da5852015446",
        "title": "Hello World",
        "content": "First Posting",
        "author": "Edison",
        "UserId": "5dc5aa90add50253d99d3cc3",
        "createdAt": "2019-11-08T18:40:31.521Z",
        "updatedAt": "2019-11-08T18:40:31.521Z",
        "__v": 0
    }
]
  ```
Error Response : 
  * **HTTP Code :** 500 (Internal Server Error)
  * **JSON Response :**
  ```html
  {
    "message": "Internal Server Error."
  }
  ```

**2. Show All User Articles**
----
Show all articles from logged in user :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/articles/`      |
| **Method**                    | `GET`             |
| **Authentication Required**   | YES               |
| **Authorization Required**    | NO                |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  [
    {
        "featured_image": "https://storage.googleapis.com/miniwp.images.edirates.xyz/1573261878160IMG_0001.jpg",
        "tags": [
            "winter",
            " snow"
        ],
        "status": true,
        "_id": "5dc61236bfcbac05f0a44bad",
        "title": "Winter is Coming",
        "content": "You know nothing",
        "author": "Jon Snow",
        "UserId": "5dc60f57bfcbac05f0a44bac",
        "createdAt": "2019-11-09T01:11:18.648Z",
        "updatedAt": "2019-11-09T01:11:18.648Z",
        "__v": 0
    }
]
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**3. Show One Article**
----
Show a specific article of logged in user :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/articles/:id`   |
| **Method**                    | `GET`             |
| **Authentication Required**   | YES               |
| **Authorization Required**    | NO                |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                 |
| ----------------------------- | --------------------- |
| **id**                        | `<article ID>`        |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "featured_image": "https://storage.googleapis.com/miniwp.images.edirates.xyz/1573261878160IMG_0001.jpg",
    "tags": [
        "winter",
        " snow"
    ],
    "status": true,
    "_id": "5dc61236bfcbac05f0a44bad",
    "title": "Winter is Coming",
    "content": "You know nothing",
    "author": "Jon Snow",
    "UserId": "5dc60f57bfcbac05f0a44bac",
    "createdAt": "2019-11-09T01:11:18.648Z",
    "updatedAt": "2019-11-09T01:11:18.648Z",
    "__v": 0
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**4. Create An Article**
----
Post a new article :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/articles`   |
| **Method**                    | `POST`        |
| **Authentication Required**   | YES           |
| **Authorization Required**    | NO            |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Body :
| Field Name                    | Value                             |
| ----------------------------- | --------------------------------- |
| **title**                     | `<article title>`                 |
| **content**                   | `<article content>`               |
| **author**                    | `<author name>`                   |
| **featured_image**            | `<link Google Storage image>`     |
| **tags**                      | `<article tags>`                  |

Success Response :
  * **HTTP Code :** 201 (Created)
  * **JSON Response :**
  ```html
  {
    "featured_image": "https://storage.googleapis.com/miniwp.images.edirates.xyz/1573261878160IMG_0001.jpg",
    "tags": [
        "winter",
        " snow"
    ],
    "status": true,
    "_id": "5dc61236bfcbac05f0a44bad",
    "title": "Winter is Coming",
    "content": "You know nothing",
    "author": "Jon Snow",
    "UserId": "5dc60f57bfcbac05f0a44bac",
    "createdAt": "2019-11-09T01:11:18.648Z",
    "updatedAt": "2019-11-09T01:11:18.648Z",
    "__v": 0
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**5. Update An Article**
----
Update a specific article :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/articles/:id`   |
| **Method**                    | `PUT`             |
| **Authentication Required**   | YES               |
| **Authorization Required**    | YES               |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Body :
| Field Name                    | Value                             |
| ----------------------------- | --------------------------------- |
| **title**                     | `<article title>`                 |
| **content**                   | `<article content>`               |
| **author**                    | `<author name>`                   |
| **featured_image**            | `<link Google Storage image>`     |
| **tags**                      | `<article tags>`                  |
| **status**                    | `<true> || <false>`               |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "n": 1,
    "nModified": 1,
    "ok": 1
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You are not authorized."
  }
  ```

**6. Delete An Article**
----
Delete a specific article :
| Syntax                        | Description          |
| ----------------------------- | -------------------- |
| **URL**                       | `/articles/:id`      |
| **Method**                    | `DELETE`             |
| **Authentication Required**   | YES                  |
| **Authorization Required**    | YES                  |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "n": 1,
    "ok": 1,
    "deletedCount": 1
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You are not authorized."
  }
  ```
