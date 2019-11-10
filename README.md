**Mini Wordpress**
----
  Simple Wordpress Dashboard with authentication and authorization API build using Express JS, Mongoose, and JSON Web Token in the server side. As for the client side, it was built using Vue 2.x and Bootstrap 4. 

## List of API Routers

Route | HTTP | Description
----- | ---- | -----------
/register | POST | Route used to register a new account
/login | POST | Route used to let user login to app
/gsignin | POST | Route used to let user register or login to app via Google account join their group
/ | GET | Route used to display all users to follow
/following | GET | Route used to display all following users
/followers | GET | Route used to display all followers users
/follow/:id | PATCH | Route used to let user follow another user
/unfollow/:id | PATCH | Route used to let user unfollow another user
/posts | GET | Route used to retrieve all posts belongs to a user
/posts/liked | GET | Route used to retrieve all liked posts that belongs to user
/posts/popular | GET | Route used to retrieve all popular posts based on like's count
/posts/following | GET | Route used to retrieve all posts that belongs to following users
/posts | POST | Route used to create a post
/posts/:id | PATCH | Route used to edit and update a post
/posts/like/:id | PATCH | Route used to like and unlike a post
/posts/:id | DELETE | Route used to delete a post
/img/:upload | POST | Route used to upload an image
/tags | GET | Route used to retrieve all tags in database
/tags/:id | GET | Route used to retrieve all post that contains the requested tag
/tags/filtered/:id | GET | Route used to retrieve all tags that already filtered by the choosen post's tags
/tags | POST | Route used create a new tag






## Usage

With only npm: 

```javascript
npm install in server and client folder
npm run dev in server folder
run index.html using parcel index.html in client folder
```

**Register**
----
  Register new account to the database and returns a json response if succeeded.

* **URL**

  /register

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Name<br />
  Email<br />
  Password

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ success: true, message: Successfully registered }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`


**Log In**
----
  Verify user's authentication and returns token if data is valid.

* **URL**

  /login

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Username<br />
  Password

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ token: token retrieved from server generated using json web token }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Wrong username or password" }`


**Google Log In**
----
  Let user skip registration phase by registering into the app using information from their Google account. Returns token if succeeded.

* **URL**

  /gsignin

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ token: token retrieved from server generated using json web token }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Invite to Project**
----
  Let user invite another user to project

* **URL**

  /invite/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id (User's id)

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg:  Invitation is sent}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`


**Display User's to Follow**
----
  Request to retrieve all users that can be followed

* **URL**

  /

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all users data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Display User's Following User**
----
  Request to retrieve all following user that belong to logged in user

* **URL**

  /following

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all users data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Display User's Followers User**
----
  Request to retrieve all followers user that belong to logged in user

* **URL**

  /followers

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ users }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Follow a User**
----
  Let user to follow another user

* **URL**

  /follow/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id (User's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Successfully following }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Unollow a User**
----
  Let user to follow another user

* **URL**

  /unfollow/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id (User's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Successfully unfollowing }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`



**Get User's Posts**
----
  Request to retrieve user's personal posts.

* **URL**

  /posts

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all posts data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

**Get User's Following Posts**
----
  Request to retrieve user's following user's posts.

* **URL**

  /posts/following

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all posts data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Get Popular Posts**
----
  Request to retrieve popular posts based on like's count.

* **URL**

  /posts/popular

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all posts data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`


**Get User's Liked Posts**
----
  Request to retrieve user's liked posts.

* **URL**

  /posts/liked

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all posts data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

**Create a Post**
----
  Post request to server to create a post.

* **URL**

  /posts

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Title<br />
  Description

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ posts_data : post data}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

**Edit Post**
----
  Edit post and update the existing data in the database.

* **URL**

  /posts/:id

* **Method:**
  
  `PUT`

* **URL Params**

  id (post's id)

* **Data Params**

  Title<br />
  Content<br />
  Tags<br />
  Image<br />

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully updated post }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Delete Post**
----
  Delete post from the database and remove post data from user's.

* **URL**

  /posts/:id

* **Method:**
  
  `DELETE`

* **URL Params**

  id (Post's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully deleted post }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

**Upload an image**
----
  Upload an image for create and edit a post

* **URL**

  /img/upload

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  cloudStoragePublicUrl

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`


**Get all Tags**
----
  Request to retrieve all tags data.

* **URL**

  /tags

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Get One Tag Data**
----
  Request to retrieve one tags data.

* **URL**

  /tags/:id

* **Method:**
  
  `GET`

* **URL Params**

  id(Tags's id)

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Get One Tag Filtered Data**
----
 Request to retrieve all tags that already filtered by the choosen post's tags

* **URL**

  /tags/filtered/:id

* **Method:**
  
  `GET`

* **URL Params**

  id(Post's id)

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Create a Tag**
----
 Post request to server to create a tag.

* **URL**

  /tags

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 201 CREATED <br />

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`