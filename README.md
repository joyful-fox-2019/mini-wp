# Hacktiv WP

## Author : Luky Winata

#### **How To**

```
Client Site: http://project-mini-wp.lukywinata.com/
Server Site: http://35.197.134.160/
```

#### **Errors:**

| Code | Name                  | Description          |
| :--- | :-------------------- | :------------------- |
| 400  | Bad Request           | Client's Mistake     |
| 401  | Authentication Failed | Unauthorized Access  |
| 403  | Unauthorized Access   | Invalid Access Token |
| 500  | Internal Server Error | Internal Error       |

**400:**

```
{
    [
        "Name is required",
        "E-mail is required",
        "Password is required"
    ]
}
```

**401:**

```
{
    "message": "User is unauthorized for this access"
}
```

**403:**

```
{
    "message": "User's session has been expired"
}
```

**500:**

```
{
    "message": "Internal Server Error"
}
```



### **Register User**

- **URL:** `/users/register`

- **Method:** `POST`

- **Body Data:**

  ```
  name: Luky Winata
  email: lukywinata@outlook.com
  password: 123456
  ```

- **Success Response:**

  - **Status:** 201 

  - **Content:**

    ```
    {
        "_id": "5dbd4a607ad5b61201781b95",
        "name": "Luky Winata",
        "email": "lukywinata@outlook.com",
        "password": "$2a$10$dSgyVFM47duFThRKlEBJG.paG2GMt.pMbcsBKgWcjlfDVSZQmLdO6",
        "__v": 0
    }
    ```



### **Login User**

- **URL:** `/users/login`

- **Method:** `POST`

- **Body Data:**

  ```
  email: lukywinata@outlook.com
  password: 123456
  ```

- **Success Response:**

  - **Status:** 200 

  - **Content:**

    ```
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```



### **Create New Article**

- **URL:** `/articles`

- **Method:** `POST`

- **Headers:** `access_token = [string]`

- **Body Data:**

  ```
  title: Vue JS
  description: (allow empty)
  content: Phase 2 itu sangat sangat menyenangkan
  ```

- **Success Response:**

  - **Status:** 201 

  - **Content:**

    ```
    {
        "tags": [],
        "_id": "5dc695a0fa4b885a2c992fb8",
        "UserId": "5dc68fe39b55455664c1e7c8",
        "title": "Vue JS",
        "content": "Phase 2 itu sangat sangat menyenangkan",
        "isActive": false,
        "createdAt": "2019-11-09T10:32:00.111Z",
        "updatedAt": "2019-11-09T10:32:00.111Z",
        "slug": "vue-js",
        "__v": 0
    }
    ```



### **List All Articles**

- **URL:** `/articles`

- **Method:** `GET`

- **Headers:** `access_token = [string]`

- **Success Response:**

  - **Status:** 201 

  - **Content:**

    ```
    [
        {
            "tags": [],
            "_id": "5dc69527f535ae59983e5351",
            "UserId": {
                "_id": "5dc68fe39b55455664c1e7c8",
                "name": "Luky Winata",
                "email": "luky@mail.com",
                "password": ,
                "createdAt": "2019-11-09T10:07:31.180Z",
                "updatedAt": "2019-11-09T10:07:31.180Z",
                "__v": 0
            },
            "title": "Javascript",
            "content": "Javascript",
            "isActive": false,
            "createdAt": "2019-11-09T10:29:59.160Z",
            "updatedAt": "2019-11-09T10:29:59.160Z",
            "slug": "Javascript",
            "__v": 0
        },
       ...
    ]
    ```



## **Search Articles by Title** 

- **URL:** `/articles/q?title=`

- **Method:** `GET`

- **Headers:** `access_token = [string]`

- **Query:** `title`

- **Success Response:**

  - **Status:** 200 

  - **Content:**

    ```
    [
        {
            "tags": [
                "hacktiv8",
                "startup",
                "indonesia"
            ],
            "_id": "5dc698a0d54fd35b359a3bb1",
            "UserId": "5dc68fe39b55455664c1e7c8",
            "title": "Hacktiv8",
            "content": "Belajar di Hacktiv8 itu semua serba sendiri",
            "isActive": false,
            "createdAt": "2019-11-09T10:44:48.284Z",
            "updatedAt": "2019-11-09T10:44:48.284Z",
            "slug": "hacktiv8",
            "__v": 0
        }
    ]
    ```



## **Search Articles by Tag** 

- **URL:** `/articles/q?tags[0]=hacktiv8&tags[2]=startup`

- **Method:** `GET`

- **Headers:** `access_token = [string]`

- **Query:** `title`

- **Success Response:**

  - **Status:** 200 

  - **Content:**

    ```
    [
        {
            "tags": [
                "hacktiv8",
                "startup",
                "indonesia"
            ],
            "_id": "5dc698a0d54fd35b359a3bb1",
            "UserId": "5dc68fe39b55455664c1e7c8",
            "title": "Hacktiv8",
            "content": "Belajar di Hacktiv8 itu semua serba sendiri",
            "isActive": false,
            "createdAt": "2019-11-09T10:44:48.284Z",
            "updatedAt": "2019-11-09T10:44:48.284Z",
            "slug": "hacktiv8",
            "__v": 0
        }
    ]
    ```



## Get One Article's Data

- **URL:** `/articles/:id`

- **Method:** `GET`

- **Headers:** `access_token = [string]`

- **Params:** `id = [string]`

- **Success Response:**

  - **Status:** 200 **Content:**

    ```
    {
        "tags": [
            "hacktiv8",
            "startup",
            "indonesia"
        ],
        "_id": "5dc698a0d54fd35b359a3bb1",
        "UserId": "5dc68fe39b55455664c1e7c8",
        "title": "Hacktiv8",
        "content": "Belajar di Hacktiv8 itu semua serba sendiri",
        "isActive": false,
        "createdAt": "2019-11-09T10:44:48.284Z",
        "updatedAt": "2019-11-09T10:44:48.284Z",
        "slug": "hacktiv8",
        "__v": 0
    }
    ```



## **Update Article's Data**

- **URL:** `/articles/:id`

- **Method:** `PUT`

- **Headers:** `access_token = [string]`

- **Params:** `id = [string]`

- **Body Data:**

  ```
  title: Vue JS
  description: (allow empty)
  content: Phase 2 itu sangat sangat menyenangkan
  ```

- **Success Response:**

  - **Status:** 200 

  - **Content:**

    ```
    {
        "tags": [
            "hacktiv8",
            "startup"
        ],
        "_id": "5dc698a0d54fd35b359a3bb1",
        "UserId": "5dc68fe39b55455664c1e7c8",
        "title": "Hacktiv8",
        "content": "Belajar di Hacktiv8 itu semua serba sendiri",
        "isActive": false,
        "createdAt": "2019-11-09T10:44:48.284Z",
        "updatedAt": "2019-11-09T10:44:48.284Z",
        "slug": "hacktiv8",
        "__v": 0,
        "featuredImage": http://.../
    }
    ```



## **Publish Article**

- **URL:** `/articles/:id`

- **Method:** `PATCH`

- **Headers:** `access_token = [string]`

- **Params:** `id = [string]`

- **Success Response:**

  - **Status:** 200 

  - **Content:**

    ```
    {
        "tags": [
            "hacktiv8",
            "startup"
        ],
        "_id": "5dc698a0d54fd35b359a3bb1",
        "UserId": "5dc68fe39b55455664c1e7c8",
        "title": "Hacktiv8",
        "content": "Belajar di Hacktiv8 itu semua serba sendiri",
        "isActive": true,
        "createdAt": "2019-11-09T10:44:48.284Z",
        "updatedAt": "2019-11-09T10:44:48.284Z",
        "slug": "hacktiv8",
        "__v": 0,
        "featuredImage": http://.../
    }
    ```



## **Delete Article**

- **URL:** `/articles/:id`

- **Method:** `DELETE`

- **Headers:** `access_token = [string]`

- **Params:** `id = [string]`

- **Success Response:**

  - **Status:** 200 

  - **Content:**

    ```
    {
        "tags": [],
        "_id": "5dc695a0fa4b885a2c992fb8",
        "UserId": "5dc68fe39b55455664c1e7c8",
        "title": "Vue JS",
        "content": "Phase 2 itu sangat sangat menyenangkan",
        "isActive": true,
        "createdAt": "2019-11-09T10:32:00.111Z",
        "updatedAt": "2019-11-09T11:17:27.700Z",
        "slug": "vue-js",
        "__v": 0
    }
    ```