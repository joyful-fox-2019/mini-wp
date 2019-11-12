**Spotlight**
----

access deployed app to: [spotlight.satyowicaksana.online](http://spotlight.satyowicaksana.online)

----

*  **Error Response:** 

**Code:** 400
**Description:** Server cannot process the action due to invalid request <br  />
**Content Example:**

```
{
    "messages": [
        "First name cannot be empty",
        "Last name cannot be empty",
        "Email cannot be empty"
    ]
}
```
**Code:** 401
**Description:** You are not authenticated or authorized to access the data <br  />
**Content Example:**

```
{
	"messages":  [
		"You have to login first"
	]
}
```
**Code:** 404
**Description:** The requested resource could not be found <br  />
**Content Example:**

```
{
	"messages":  [
		"Article not found"
	]
}
```
**Code:** 500
**Description:** There's something wrong in the server. Please try again later. <br  />
**Content Example:**

```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```

---
**POST /users/register**

*  **URL**

`/users/register`

*  **Method:**

`POST`

  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'firstName'`| string | first name of the user |
|`'lastName'`| string | last name of the user |
|`'email'`| string | email of the user |
|`'password'`| string | password of the user |
 
*  **Success Response:**

**Code:** 201<br  />

**Content Example:**

```
{
    "_id": "5dc8a33594ac3005a84d4dc0",
    "email": "satyowicaksana@gmail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM4YTMzNTk0YWMzMDA1YTg0ZDRkYzAiLCJlbWFpbCI6InNhdHlvd2ljYWtzYW5hQGdtYWlsLmNvbSIsImlhdCI6MTU3MzQzMDA2OX0.pp5Pf8vTGx0asnqCiVg5KvcOXM267edY7IxyYfqFOFA"
}
```
---
**POST /users/login**

*  **URL**

`/users/login`

*  **Method:**

`POST`

  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'email'`| string | email of the user |
|`'password'`| string | password of the user |
 
*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "_id": "5dc8a33594ac3005a84d4dc0",
    "email": "satyowicaksana@gmail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM4YTMzNTk0YWMzMDA1YTg0ZDRkYzAiLCJlbWFpbCI6InNhdHlvd2ljYWtzYW5hQGdtYWlsLmNvbSIsImlhdCI6MTU3MzQzMDE2NX0.vXMVYFNpzo_vCUV23ogFkBhxLzh5mfdv-UYIerXefvM"
}
```
---
**POST /users/g-signin**

*  **URL**

`/users/g-signin`

*  **Method:**

`POST`

  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'id_token'`| string | id token from google OAuth |
 
*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "_id": "5dc8a3c494ac3005a84d4dc1",
    "email": "satyodeveloper@gmail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM4YTNjNDk0YWMzMDA1YTg0ZDRkYzEiLCJlbWFpbCI6InNhdHlvZGV2ZWxvcGVyQGdtYWlsLmNvbSIsImlhdCI6MTU3MzQzMDIzNn0.lZ26Cv_48yDOsaqebkBZHiOF8V3PC8WKMklrorotPUM"
}
```
---
**GET /articles**

*  **URL**

`/articles`

*  **Method:**

`GET`
*  **Data Params**

**query:**

| property | type | description |
|--|--|--|
|`'user'`| string | id of user to get articles of a particular user |
|`'tag'`| string | a tag to get articles of a particular topic |
 
*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
[
    {
        "tags": [
            "Art",
            "Science"
        ],
        "_id": "5dc8a64c94ac3005a84d4dc3",
        "title": "Build a semi-permanent work surface you can put away easily",
        "subtitle": "It’ll fit snugly on top of your saw horses and then snugly against the wall when you’re done.",
        "description": "<div class=\"margin_vertical\" style=\"box-sizing: border-box; margin-bottom: 16px; margin-top: 16px; font-family: Lora; font-size: 20px;\"><section class=\"content\" style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><p class=\"paragraph | margin_bottom_lg margin_centered\" style=\"box-sizing: border-box; margin-right: auto; margin-bottom: 24px; margin-left: auto; line-height: 1.5; max-width: 85%;\">The most basic work surface is just a flat, mostly stable thing big enough to hold whatever you’re working on. But while you might be able to&nbsp;<a href=\"https://www.popsci.com/clean-retro-game-consoles/\" style=\"box-sizing: border-box; color: inherit; border-bottom: 2px solid rgb(244, 188, 168);\">disassemble an old video game console</a>&nbsp;in your lap, a dedicated DIY workspace will make the job exponentially easier.</p></div></section></div><div class=\"margin_vertical\" style=\"box-sizing: border-box; margin-bottom: 16px; margin-top: 16px; font-family: Lora; font-size: 20px;\"><section class=\"content\" style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><p class=\"paragraph | margin_bottom_lg margin_centered\" style=\"box-sizing: border-box; margin-right: auto; margin-bottom: 24px; margin-left: auto; line-height: 1.5; max-width: 85%;\">Still, not everyone has enough space for a full workshop, and some may find it hard to even set aside enough space for a permanent work table. I’m in the latter group, and have been working on top of a flattened cardboard box and two trash cans for several weeks. Things became easier recently when I built myself&nbsp;<a href=\"https://www.popsci.com/build-folding-saw-horse/\" style=\"box-sizing: border-box; color: inherit; border-bottom: 2px solid rgb(244, 188, 168);\">some folding saw horses</a>, but that wasn’t enough—it was time for an upgrade.</p></div></section></div><div class=\"margin_vertical\" style=\"box-sizing: border-box; margin-bottom: 16px; margin-top: 16px; font-family: Lora; font-size: 20px;\"><section class=\"content\" style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><p class=\"paragraph | margin_bottom_lg margin_centered\" style=\"box-sizing: border-box; margin-right: auto; margin-bottom: 24px; margin-left: auto; line-height: 1.5; max-width: 85%;\">The final product here falls somewhere between an actual workbench and a piece of plywood laid across two saw horses. It’s sturdy enough to hold your project, locks in place so it won’t move while you’re working, and can be easily stored against the wall when you’re done.</p></div></section></div>",
        "image": "https://storage.googleapis.com/spotlight-images/1573430860088-8-88458_target-png-clipart-transparent-background-target-png.png",
        "user": {
            "_id": "5dc8a3c494ac3005a84d4dc1",
            "email": "satyodeveloper@gmail.com",
            "firstName": "Satyo",
            "lastName": "Wicaksana",
            "isGoogle": true
        },
        "createdAt": "2019-11-11T00:07:40.999Z",
        "updatedAt": "2019-11-11T00:07:40.999Z"
    }
]
```
---
**Authorization**
Aside from register and login, you need authentication using token that you got from register/log in and send it as headers

**headers:**

| property | type | description |
|--|--|--|
|`'access_token'`| string | access token for authentication |

---
**POST /articles**

*  **URL**

`/articles`

*  **Method:**

`POST`
  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'title'`| string | title of article |
|`'content'`| string | content of article |
|`'file'`| file | an image file for the article |
|`'tags'`| array | topics of the article |
 
*  **Success Response:**

**Code:** 201 <br  />

**Content Example:**

```
{
        "tags": [
            "Art",
            "Science"
        ],
        "_id": "5dc8a64c94ac3005a84d4dc3",
        "title": "Build a semi-permanent work surface you can put away easily",
        "subtitle": "It’ll fit snugly on top of your saw horses and then snugly against the wall when you’re done.",
        "description": "<div class=\"margin_vertical\" style=\"box-sizing: border-box; margin-bottom: 16px; margin-top: 16px; font-family: Lora; font-size: 20px;\"><section class=\"content\" style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><p class=\"paragraph | margin_bottom_lg margin_centered\" style=\"box-sizing: border-box; margin-right: auto; margin-bottom: 24px; margin-left: auto; line-height: 1.5; max-width: 85%;\">The most basic work surface is just a flat, mostly stable thing big enough to hold whatever you’re working on. But while you might be able to&nbsp;<a href=\"https://www.popsci.com/clean-retro-game-consoles/\" style=\"box-sizing: border-box; color: inherit; border-bottom: 2px solid rgb(244, 188, 168);\">disassemble an old video game console</a>&nbsp;in your lap, a dedicated DIY workspace will make the job exponentially easier.</p></div></section></div><div class=\"margin_vertical\" style=\"box-sizing: border-box; margin-bottom: 16px; margin-top: 16px; font-family: Lora; font-size: 20px;\"><section class=\"content\" style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><p class=\"paragraph | margin_bottom_lg margin_centered\" style=\"box-sizing: border-box; margin-right: auto; margin-bottom: 24px; margin-left: auto; line-height: 1.5; max-width: 85%;\">Still, not everyone has enough space for a full workshop, and some may find it hard to even set aside enough space for a permanent work table. I’m in the latter group, and have been working on top of a flattened cardboard box and two trash cans for several weeks. Things became easier recently when I built myself&nbsp;<a href=\"https://www.popsci.com/build-folding-saw-horse/\" style=\"box-sizing: border-box; color: inherit; border-bottom: 2px solid rgb(244, 188, 168);\">some folding saw horses</a>, but that wasn’t enough—it was time for an upgrade.</p></div></section></div><div class=\"margin_vertical\" style=\"box-sizing: border-box; margin-bottom: 16px; margin-top: 16px; font-family: Lora; font-size: 20px;\"><section class=\"content\" style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><p class=\"paragraph | margin_bottom_lg margin_centered\" style=\"box-sizing: border-box; margin-right: auto; margin-bottom: 24px; margin-left: auto; line-height: 1.5; max-width: 85%;\">The final product here falls somewhere between an actual workbench and a piece of plywood laid across two saw horses. It’s sturdy enough to hold your project, locks in place so it won’t move while you’re working, and can be easily stored against the wall when you’re done.</p></div></section></div>",
        "image": "https://storage.googleapis.com/spotlight-images/1573430860088-8-88458_target-png-clipart-transparent-background-target-png.png",
        "user": {
            "_id": "5dc8a3c494ac3005a84d4dc1",
            "email": "satyodeveloper@gmail.com",
            "firstName": "Satyo",
            "lastName": "Wicaksana",
            "isGoogle": true
        },
        "createdAt": "2019-11-11T00:07:40.999Z",
        "updatedAt": "2019-11-11T00:07:40.999Z"
}
```
---
**PATCH /articles/:id**

*  **URL**

`/articles/:id`

*  **Method:**

`PATCH`

   *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | id of article |

**body:**

| property | type | description |
|--|--|--|
|`'title'`| string | title of article |
|`'content'`| string | content of article |
|`'file'`| file | an image file for the article |
|`'tags'`| array | topics of the article |
*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
        "tags": [
            "Art",
            "Science",
            "Photography"
        ],
        "_id": "5dc8a64c94ac3005a84d4dc3",
        "title": "Build a semi-permanent work surface you can put away easily",
        "subtitle": "It’ll fit snugly on top of your saw horses and then snugly against the wall when you’re done.",
        "description": "<div class=\"margin_vertical\" style=\"box-sizing: border-box; margin-bottom: 16px; margin-top: 16px; font-family: Lora; font-size: 20px;\"><section class=\"content\" style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><p class=\"paragraph | margin_bottom_lg margin_centered\" style=\"box-sizing: border-box; margin-right: auto; margin-bottom: 24px; margin-left: auto; line-height: 1.5; max-width: 85%;\">The most basic work surface is just a flat, mostly stable thing big enough to hold whatever you’re working on. But while you might be able to&nbsp;<a href=\"https://www.popsci.com/clean-retro-game-consoles/\" style=\"box-sizing: border-box; color: inherit; border-bottom: 2px solid rgb(244, 188, 168);\">disassemble an old video game console</a>&nbsp;in your lap, a dedicated DIY workspace will make the job exponentially easier.</p></div></section></div><div class=\"margin_vertical\" style=\"box-sizing: border-box; margin-bottom: 16px; margin-top: 16px; font-family: Lora; font-size: 20px;\"><section class=\"content\" style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><p class=\"paragraph | margin_bottom_lg margin_centered\" style=\"box-sizing: border-box; margin-right: auto; margin-bottom: 24px; margin-left: auto; line-height: 1.5; max-width: 85%;\">Still, not everyone has enough space for a full workshop, and some may find it hard to even set aside enough space for a permanent work table. I’m in the latter group, and have been working on top of a flattened cardboard box and two trash cans for several weeks. Things became easier recently when I built myself&nbsp;<a href=\"https://www.popsci.com/build-folding-saw-horse/\" style=\"box-sizing: border-box; color: inherit; border-bottom: 2px solid rgb(244, 188, 168);\">some folding saw horses</a>, but that wasn’t enough—it was time for an upgrade.</p></div></section></div><div class=\"margin_vertical\" style=\"box-sizing: border-box; margin-bottom: 16px; margin-top: 16px; font-family: Lora; font-size: 20px;\"><section class=\"content\" style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><p class=\"paragraph | margin_bottom_lg margin_centered\" style=\"box-sizing: border-box; margin-right: auto; margin-bottom: 24px; margin-left: auto; line-height: 1.5; max-width: 85%;\">The final product here falls somewhere between an actual workbench and a piece of plywood laid across two saw horses. It’s sturdy enough to hold your project, locks in place so it won’t move while you’re working, and can be easily stored against the wall when you’re done.</p></div></section></div>",
        "image": "https://storage.googleapis.com/spotlight-images/1573430860088-8-88458_target-png-clipart-transparent-background-target-png.png",
        "user": {
            "_id": "5dc8a3c494ac3005a84d4dc1",
            "email": "satyodeveloper@gmail.com",
            "firstName": "Satyo",
            "lastName": "Wicaksana",
            "isGoogle": true
        },
        "createdAt": "2019-11-11T00:07:40.999Z",
        "updatedAt": "2019-11-11T00:07:40.999Z"
    }
```
---
**DELETE /articles/:id**

*  **URL**

`/articles/:id`

*  **Method:**

`DELETE`

   *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | id of article |


*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
        "tags": [
            "Art",
            "Science",
            "Photography"
        ],
        "_id": "5dc8a64c94ac3005a84d4dc3",
        "title": "Build a semi-permanent work surface you can put away easily",
        "subtitle": "It’ll fit snugly on top of your saw horses and then snugly against the wall when you’re done.",
        "description": "<div class=\"margin_vertical\" style=\"box-sizing: border-box; margin-bottom: 16px; margin-top: 16px; font-family: Lora; font-size: 20px;\"><section class=\"content\" style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><p class=\"paragraph | margin_bottom_lg margin_centered\" style=\"box-sizing: border-box; margin-right: auto; margin-bottom: 24px; margin-left: auto; line-height: 1.5; max-width: 85%;\">The most basic work surface is just a flat, mostly stable thing big enough to hold whatever you’re working on. But while you might be able to&nbsp;<a href=\"https://www.popsci.com/clean-retro-game-consoles/\" style=\"box-sizing: border-box; color: inherit; border-bottom: 2px solid rgb(244, 188, 168);\">disassemble an old video game console</a>&nbsp;in your lap, a dedicated DIY workspace will make the job exponentially easier.</p></div></section></div><div class=\"margin_vertical\" style=\"box-sizing: border-box; margin-bottom: 16px; margin-top: 16px; font-family: Lora; font-size: 20px;\"><section class=\"content\" style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><p class=\"paragraph | margin_bottom_lg margin_centered\" style=\"box-sizing: border-box; margin-right: auto; margin-bottom: 24px; margin-left: auto; line-height: 1.5; max-width: 85%;\">Still, not everyone has enough space for a full workshop, and some may find it hard to even set aside enough space for a permanent work table. I’m in the latter group, and have been working on top of a flattened cardboard box and two trash cans for several weeks. Things became easier recently when I built myself&nbsp;<a href=\"https://www.popsci.com/build-folding-saw-horse/\" style=\"box-sizing: border-box; color: inherit; border-bottom: 2px solid rgb(244, 188, 168);\">some folding saw horses</a>, but that wasn’t enough—it was time for an upgrade.</p></div></section></div><div class=\"margin_vertical\" style=\"box-sizing: border-box; margin-bottom: 16px; margin-top: 16px; font-family: Lora; font-size: 20px;\"><section class=\"content\" style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><p class=\"paragraph | margin_bottom_lg margin_centered\" style=\"box-sizing: border-box; margin-right: auto; margin-bottom: 24px; margin-left: auto; line-height: 1.5; max-width: 85%;\">The final product here falls somewhere between an actual workbench and a piece of plywood laid across two saw horses. It’s sturdy enough to hold your project, locks in place so it won’t move while you’re working, and can be easily stored against the wall when you’re done.</p></div></section></div>",
        "image": "https://storage.googleapis.com/spotlight-images/1573430860088-8-88458_target-png-clipart-transparent-background-target-png.png",
        "user": {
            "_id": "5dc8a3c494ac3005a84d4dc1",
            "email": "satyodeveloper@gmail.com",
            "firstName": "Satyo",
            "lastName": "Wicaksana",
            "isGoogle": true
        },
        "createdAt": "2019-11-11T00:07:40.999Z",
        "updatedAt": "2019-11-11T00:07:40.999Z"
    }
```