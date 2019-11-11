# HACKTIV8 MINI WP

website address: http://miniwp.hoandreasm.xyz/

MINI WP is an application inspired by the real Wordpress website. As the name suggested it is the mini version of it.

Features:
1. Write, Read, Edit and Delete on all of your article posts.
2. Upload featured image of your post to Google Cloud Storage.
3. Third-party sign in in this case you can use Goosle Sign In.
4. Search your own article by its title.

# USER
### **Register**

- **URL:** `/users/register`

- **Method:** `POST`

- **Body Data:**

  ```
  email: andreas@mail.com
  password: 123
  ```

- **Success Response:**

  - **Status:** 201 

  - **Content:**

    ```
    {
        "_id": "5dc8598c56c122303ee3c3d4",
        "email": "andreas@mail.com",
        "password": "$2a$11$ojOrJR8u/yLRb.ayGevIbu/7PBbgmZNGzy0132lskYoS0vSV.MJca",
        "__v": 0
    }
    ```
- **Error Response:**

  - **Status:** 400

  - **Content:**

    ```
    {
        "msg": "Email is already registered"
    }
    ```
  - **Status:** 500

  - **Content:**

    ```
    {
        "msg": "Internal Server Error"
    }
    ```

### **Login**

- **URL:** `/users/login`

- **Method:** `POST`

- **Body Data:**

  ```
  email: andreas@mail.com
  password: 123
  ```

- **Success Response:**

  - **Status:** 200

  - **Content:**

    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzZkZDY2NGEyODkwMTQ0ZTMzMjJkZCIsImVtYWlsIjoiYW5kcmVAbWFpbC5jb20iLCJpYXQiOjE1NzM0MTE1MzF9.gGefNpkOYiQvaDukPx5lOK3OP5rtfgmiSL1N0jABrio"
    }
    ```
- **Error Response:**

  - **Status:** 400

  - **Content:**

    ```
    {
        "msg": "wrong email or password"
    }
    ```
  - **Status:** 500

  - **Content:**

    ```
    {
        "msg": "Internal Server Error"
    }
    ```

### **Google Login/Sign Up**

- **URL:** `/users/googleSignIn`

- **Method:** `POST`

- Just click the Google Sign In button and let the ✨magic✨happen, auto-generate a token to let you use the web app instantly ✨

# ARTICLE
These endpoints require user authentication

### **Write New Article**

- **URL:** `/articles`

- **Method:** `POST`

- **Headers:** 
    `token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzZkZDY2NGEyODkwMTQ0ZTMzMjJkZCIsImVtYWlsIjoiYW5kcmVAbWFpbC5jb20iLCJpYXQiOjE1NzMzMjQ4NTN9.3_qeSKQTyFo8m0JNyT4dyND4Do6W7LpUe8ArbS2q09o`

- **Body Data:**

  ```
  title: Vue studies
  content: example text or description about the article.
  featured_image: file, type jpeg or png
  ```

- **Success Response:**

  - **Status:** 201 

  - **Content:**

    ```
    {
        "_id": "5dc85c1556c122303ee3c3d7",
        "title": "Vue studies",
        "content": "example text or description about the article.",
        "created_at": "2019-11-10T18:51:01.908Z",
        "author": "5dc6dd664a2890144e3322dd",
        "featured_image": "https://storage.googleapis.com/hoandreasmichael/1573411861110shibe.jpeg",
        "__v": 0
    }
    ```
- **Error Response:**

  - **Status:** 401

  - **Content:**

    ```
    {
        "msg": "jwt must be provided"
    }
    ```
  - **Status:** 500

  - **Content:**

    ```
    {
        "msg": "Internal Server Error"
    }
    ```

### **Get All User's Articles**

- **URL:** `/articles`

- **Method:** `GET`

- **Headers:** 
    `token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzZkZDY2NGEyODkwMTQ0ZTMzMjJkZCIsImVtYWlsIjoiYW5kcmVAbWFpbC5jb20iLCJpYXQiOjE1NzMzMjQ4NTN9.3_qeSKQTyFo8m0JNyT4dyND4Do6W7LpUe8ArbS2q09o`

- **Success Response:**

  - **Status:** 200

  - **Content:**

    ```
    [
        {
            "_id": "5dc7978c85f03e22929a8493",
            "title": "Title1",
            "content": "description description",
            "created_at": "2019-11-10T17:12:15.077Z",
            "author": {
                "_id": "5dc6dd664a2890144e3322dd",
                "email": "andre@mail.com",
                "password": "$2a$11$XenVfcxAw4tC4zu1tQNkKu4Jj5.2ipC088ZnFuvsrkkQHJqd0EMSa",
                "__v": 0
            },
            "featured_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSKI624I2emYzE88P8uoWw_VwNTW9WSZLpE3DqKVumbuebwA7aq",
            "__v": 0
        },
        {
            "_id": "5dc7aa30c4ad5c2387ba8a63",
            "title": "Title 2",
            "content": "<p>description description</p>",
            "created_at": "2019-11-10T16:52:45.274Z",
            "author": {
                "_id": "5dc6dd664a2890144e3322dd",
                "email": "andre@mail.com",
                "password": "$2a$11$XenVfcxAw4tC4zu1tQNkKu4Jj5.2ipC088ZnFuvsrkkQHJqd0EMSa",
                "__v": 0
            },
            "featured_image": null,
            "__v": 0
        },
        {
            "_id": "5dc7ae2fc4ad5c2387ba8a64",
            "title": "efaifey",
            "content": "<p>Descriptions description </p>",
            "created_at": "2019-11-10T06:29:03.444Z",
            "author": {
                "_id": "5dc6dd664a2890144e3322dd",
                "email": "andre@mail.com",
                "password": "$2a$11$XenVfcxAw4tC4zu1tQNkKu4Jj5.2ipC088ZnFuvsrkkQHJqd0EMSa",
                "__v": 0
            },
            "featured_image": "",
            "__v": 0
        },
        {
            "_id": "5dc81481596e6529f9158390",
            "title": "Title 3",
            "content": "<p>text or description about the article content </p>",
            "created_at": "2019-11-10T17:03:58.155Z",
            "author": {
                "_id": "5dc6dd664a2890144e3322dd",
                "email": "andre@mail.com",
                "password": "$2a$11$XenVfcxAw4tC4zu1tQNkKu4Jj5.2ipC088ZnFuvsrkkQHJqd0EMSa",
                "__v": 0
            },
            "__v": 0
        },
        {
            "_id": "5dc8150592ca692a088dcb9b",
            "title": "tetile4",
            "content": "description description description",
            "created_at": "2019-11-10T13:47:49.764Z",
            "author": {
                "_id": "5dc6dd664a2890144e3322dd",
                "email": "andre@mail.com",
                "password": "$2a$11$XenVfcxAw4tC4zu1tQNkKu4Jj5.2ipC088ZnFuvsrkkQHJqd0EMSa",
                "__v": 0
            },
            "featured_image": "https://storage.googleapis.com/hoandreasmichael/1573393668832shibe.jpeg",
            "__v": 0
        },
        {
            "_id": "5dc8192992ca692a088dcb9c",
            "title": "Title 5",
            "content": "<p>desciption description descriotion</p>",
            "created_at": "2019-11-10T14:05:29.930Z",
            "author": {
                "_id": "5dc6dd664a2890144e3322dd",
                "email": "andre@mail.com",
                "password": "$2a$11$XenVfcxAw4tC4zu1tQNkKu4Jj5.2ipC088ZnFuvsrkkQHJqd0EMSa",
                "__v": 0
            },
            "featured_image": "https://storage.googleapis.com/hoandreasmichael/1573394728868shibe2.jpeg",
            "__v": 0
        }
    ]
    ```

- **Error Response:**

  - **Status:** 401

  - **Content:**

    ```
    {
        "msg": "jwt must be provided"
    }
    ```
  - **Status:** 500

  - **Content:**

    ```
    {
        "msg": "Internal Server Error"
    }
    ```

### **Get One User's Article**

- **URL:** `/articles/id`

- **Method:** `GET`

- **Headers:** 
    `token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzZkZDY2NGEyODkwMTQ0ZTMzMjJkZCIsImVtYWlsIjoiYW5kcmVAbWFpbC5jb20iLCJpYXQiOjE1NzMzMjQ4NTN9.3_qeSKQTyFo8m0JNyT4dyND4Do6W7LpUe8ArbS2q09o`

- **Success Response:**

  - **Status:** 200

  - **Content:**

    ```
    {
        "_id": "5dc7978c85f03e22929a8493",
        "title": "Title1",
        "content": "description description",
        "created_at": "2019-11-10T17:12:15.077Z",
        "author": {
            "_id": "5dc6dd664a2890144e3322dd",
            "email": "andre@mail.com",
            "password": "$2a$11$XenVfcxAw4tC4zu1tQNkKu4Jj5.2ipC088ZnFuvsrkkQHJqd0EMSa",
            "__v": 0
        },
        "featured_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSKI624I2emYzE88P8uoWw_VwNTW9WSZLpE3DqKVumbuebwA7aq",
        "__v": 0
    }
    ```
- **Error Response:**

  - **Status:** 401

  - **Content:**

    ```
    {
        "msg": "jwt must be provided"
    }
    ```
  - **Status:** 500

  - **Content:**

    ```
    {
        "msg": "Internal Server Error"
    }
    ```

### **Update One User's Article**
These endpoints require user authorization

- **URL:** `/articles/id`

- **Method:** `PUT`

- **Headers:** 
    `token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzZkZDY2NGEyODkwMTQ0ZTMzMjJkZCIsImVtYWlsIjoiYW5kcmVAbWFpbC5jb20iLCJpYXQiOjE1NzMzMjQ4NTN9.3_qeSKQTyFo8m0JNyT4dyND4Do6W7LpUe8ArbS2q09o`

- **Body Data:**

  ```
  title: Update Title 1
  content: trying to update one of the article
  ```

- **Success Response:**

  - **Status:** 200

  - **Content:**

    ```
    {
        "_id": "5dc7978c85f03e22929a8493",
        "title": "Update Title 1",
        "content": "trying to update one of the article",
        "created_at": "2019-11-10T19:00:28.087Z",
        "author": "5dc6dd664a2890144e3322dd",
        "featured_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSKI624I2emYzE88P8uoWw_VwNTW9WSZLpE3DqKVumbuebwA7aq",
        "__v": 0
    }
    ```
- **Error Response:**

  - **Status:** 401

  - **Content:**

    ```
    {
        "msg": "jwt must be provided"
    }
    ```
  - **Status:** 404

  - **Content:**

    ```
    {
        "msg": "Data not found"
    }
    ```
  - **Status:** 500

  - **Content:**

    ```
    {
        "msg": "Internal Server Error"
    }
    ```

### **Delete One User's Article**
These endpoints require user authorization

- **URL:** `/articles/id`

- **Method:** `DELETE`

- **Headers:** 
    `token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzZkZDY2NGEyODkwMTQ0ZTMzMjJkZCIsImVtYWlsIjoiYW5kcmVAbWFpbC5jb20iLCJpYXQiOjE1NzMzMjQ4NTN9.3_qeSKQTyFo8m0JNyT4dyND4Do6W7LpUe8ArbS2q09o`

- **Body Data:**

  ```
  title: Update Title 1
  content: trying to update one of the article
  ```

- **Success Response:**

  - **Status:** 200

  - **Content:**

    ```
    {
        "n": 1,
        "ok": 1,
        "deletedCount": 1
    }
    ```
- **Error Response:**
  - **Status:** 401

  - **Content:**

    ```
    {
        "msg": "jwt must be provided"
    }
    ```

  - **Status:** 404

  - **Content:**

    ```
    {
        "message": "Data not found"
    }
    ```
  - **Status:** 500

  - **Content:**

    ```
    {
        "msg": "Internal Server Error"
    }
    ```