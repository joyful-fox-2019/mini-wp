# Mini-WP

Mini-WP is simpel CMS web-application to manage your blog.

Fitur:

1. Read, update, delete all of your post.
2. Read all of user post.
3. Live search post based on title.
4. Third-party signin.
5. Upload image in Google Cloud Storage.

 Here's the documentation:

## User

- **/wp/register**

| Method | Header | Params | Data                                                         |
| ------ | ------ | ------ | ------------------------------------------------------------ |
| `POST` | `none` | `none` | username: `string`<br>email: `string` <br> password: `string` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `201` <br> Content: `{message, newUser: {_id, username, email, password, profile_img}`} | Status: `400` <br> Content: `{"error": ["username is required!",    "email is required!", "password min 8 char"]}` |


- **/wp/login**

| Method | Header | Params | Data                                       |
| ------ | ------ | ------ | ------------------------------------------ |
| `POST` | `none` | `none` | identity: `string` <br> password: `string` |

| Success Response                               | Error Response                                               |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message, token}` | Status: `403` <br> Content: `{"message": "Email/Password is wrong"}` |


- **/wp/loginGoogle**

| Method | Header                            | Params | Data   |
| ------ | --------------------------------- | ------ | ------ |
| `POST` | Google `id_token`,`name`, `email` | `none` | `none` |

| Success Response                      | Error Response                                               |
| ------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{token}` | Status: `400` <br> Content: `{"message": "The verifyIdToken method requires an ID Token"}` |

## Article

This end point need authentication from verified user.

- **/wp/articles**
  Get all articles.

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                               | Error Response                                               |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `array of objects` | Status: `403` <br> Content: `{"message": "Jwt must be provided"}` |

- **/wp/articlesUser**
  Get all articles from authenticated user

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                               | Error Response                                               |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `array of objects` | Status: `403` <br> Content: `{"message": "Jwt must be provided"}` |

- **/wp/articles/**
  Create article for authenticated user.

| Method | Header  | Params | Data                                                        |
| ------ | ------- | ------ | ----------------------------------------------------------- |
| `POST` | `token` | `none` | title: `string`<br/>content: `string` <br/> image: `string` |

| Success Response                                 | Error Response                                               |
| ------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `object of articles` | Status: `403` <br> Content: `{"error": ["title can't be empty", "content can't be empty"}` |

- **/wp/articles/:id**
  Get one article from authenticated user with specific article`id`. This end point need authorization from verified user.

| Method | Header  | Params       | Data   |
| ------ | ------- | ------------ | ------ |
| `GET`  | `token` | id: `string` | `none` |

| Success Response                                | Error Response                                              |
| ----------------------------------------------- | ----------------------------------------------------------- |
| Status: `200` <br> Content: `object of article` | Status: `404` <br> Content: `{"message": "Data not found"}` |


- **/wp/articles/:id**
  Update article's `title` and `content`.  This end point need authorization from verified user.

| Method | Header  | Params       | Data   |
| ------ | ------- | ------------ | ------ |
| `PUT`  | `token` | id: `string` | `none` |

| Success Response                                        | Error Response                                     |
| ------------------------------------------------------- | -------------------------------------------------- |
| Status: `200` <br> Content: `object of updated article` | Status: `404` <br> Content: `{"message": "error"}` |


- **/wp/articles/:id**
  Delete `todo`.

| Method   | Header  | Params       | Data   |
| -------- | ------- | ------------ | ------ |
| `DELETE` | `token` | id: `string` | `none` |

| Success Response                            | Error Response                                         |
| ------------------------------------------- | ------------------------------------------------------ |
| Status: `200` <br> Content: `succes delete` | Status: `404` <br> Content: `{"message": "Not found"}` |

## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```

## 

