# mini-wp
**Base URL: `http://miniwp.sufrendo.com`**

**List of Routes User:**

| **Route**         | **HTTP** | **Description**                                      |
| ----------------- | -------- | ---------------------------------------------------- |
| /register   | POST     | Sign up with new user info                           |
| /login      | POST     | Sign in and get an access token based on credentials |

**List of Routes  Articles:**

| **Route**    | **HTTP** | **Description**                       |
| ------------ | -------- | ------------------------------------- |
| /articles | POST      | Create new todo (login required)           |
| /articles  | GET      | Get todos of current user (login required)           |
| /articles/:id  | PUT      |  Edit article(login required)|
| /articles/:id  | DELETE      | Delete todo (login required)|

**Errors:**

| Code | Name                  | Description                               |
| ---- | --------------------- | ----------------------------------------- |
| 400  | Authentication Failed | Email or Password is incorrect            |
| 401  | Unauthorized Access   | We could not process that action          |
| 404  | Not Found             | The requested resource could not be found |
| 500  | Internal Server Error | We had a problem with our server          |

**Sign Up**
----
* **URL:** `/register`
* **Method:** `POST`
* **URL Params:** `None`
* **Data Params:**
    ```
	{
	"email":"hacktiv8@mail.com", // String, required, need to be valid email
	"password":"123456", // String, required, min 6 chars
	}
    ```

* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "msg": "register successful"
    }
    ```


**Login**
----
* **URL:** `/login`
* **Method:** `POST`
* **URL Params:** `None`
* **Data Params:**
	```
    {
	"email":"hacktiv8@mail.com", //String
	"password":"123456" //String
	}
	```
* **Success Response:**
  * **Status:** `200`
    **Content:** 
    
    ```
    {
        "token":"eyJhbGciOiJIUzI1NiJ9. NWRiZjA1ZjNkMWI5NTAzMGQ3YmE1ODhi.kNk6Y7nMGdC2AdIxMd2HSxz9kPqSYkymSXSfyxy9PFY"
    }
    ```
**Create Article**
----
* **URL:** `/articles`
* **Method:** `POST`
* **URL Params:** `None`
* **Header Params:**
    ```
    {
        token: YOUR_JWT_TOKEN // String, required, obtained after login
    }
    ```
* **Data Params:**
	```
    {
        "title":"like a rubber band",// String, required
        "featureImage":"https://storage.googleapis.com/miniwpcdn/1573428139029-wallhaven-xl6kkd.jpg" // String
        "content":"<u>until you pull too hard</u><br>"// String
    }
	```
* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
    _id
    :5dc89bab2141b266982792a5
    title
    :"like a rubber band"
    content
    :"<u>until you pull too hard</u><br>"
    UserId
    :5dc894372141b266982792a2
    featureImage
    :"https://storage.googleapis.com/miniwpcdn/1573428139029-wallhaven-xl6kk..."
    createdAt
    :2019-11-10T23:22:19.294+00:00
    updatedAt
    :2019-11-10T23:22:19.294+00:00
    __v
    :0
    }
    ```
**Get Articles**
----
* **URL:** `/articles`
* **Method:** `GET`
* **URL Params:** `None`
* **Header Params:**
    ```
    {
        token: YOUR_JWT_TOKEN // String, required, obtained after login
    }
    ```
* **Data Params:** `None`
* **Success Response:**
  * **Status:** `200`
    **Content:** 
    
    ```
    [
        {
    _id:5dc89bab2141b266982792a5
    title:"like a rubber band"
    content:"<u>until you pull too hard</u><br>"
    UserId:5dc894372141b266982792a2
    featureImage:"https://storage.googleapis.com/miniwpcdn/1573428139029-wallhaven-xl6kk..."
    createdAt:2019-11-10T23:22:19.294+00:00
    updatedAt:2019-11-10T23:22:19.294+00:00
    __v:0
     }
    ]
    ```

**Delete Article**
----
* **URL:** `/articles`
* **Method:** `DELETE`
* **URL Params:** `None`
* **Header Params:**
    ```
    {
        token: YOUR_JWT_TOKEN // String, required, obtained after login
    }
    ```
* **Data Params:** `None`
* **Success Response:**
  * **Status:** `204`
    **Content:** 
    
    ```
    None
    ```