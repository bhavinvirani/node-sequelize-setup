
# Node-Sequelize-Setup

A robust and clean boilerplate/starter project with proper error handling for quickly building RESTful APIs using Node.js, Express, and Sequelize ORM.

## Installation
 
steps:
1. Clone the repo:
```

git  clone  https://github.com/bhavinvirani/node-sequelize-setup.git

cd <project_directory>

```
2. Install the dependencies:
```sh

npm  install

```
3. Set the environment variables:
```sh

cp  .env.example  .env

```
## Sample .ENV

```sh

PORT=8080

CORS_ORIGIN="*"

NODE_ENV  =  "development"


# Database (Postgres)

DB_USERNAME  =  ""

DB_PASSWORD  =  ""

DB_NAME  =  ""

DB_HOST  =  "localhost"

DB_DIALECT  =  ""

DB_PORT  =  5432

  
# JWT

JWT_SECRET  =  "jwtsecreatkey"

JWT_EXPIRATION  =  "1d"

ACCESS_TOKEN_SECRET  =  "jwtsecreatkey"

ACCESS_TOKEN_EXPIRATION_MINUTES  =  7

REFRESH_TOKEN_SECRET  =  "jwtsecreatkey"

REFRESH_TOKEN_EXPIRATION_DAYS  =  90

RESET_PASSWORD_TOKEN_EXPIRATION_MINUTES  =  10

VERIFY_EMAIL_TOKEN_EXPIRATION_MINUTES  =  10

  
# Email (NodeMailer)(Ethereal mail)

SMTP_HOST  =  'smtp.ethereal.email'

SMTP_PORT  =  587

SMTP_USERNAME  =  ''

SMTP_PASSWORD  =  ''

SMTP_EMAIL_FROM  =  ''

  
# Password reset token

PASSWORD_TOKEN_BYTES  =  32

PASSWORD_TOKEN_TYPE  =  "hex"

PASSWORD_TOKEN_EXPIRATION_DURATION  =  600


# Cloudinary

CLOUDINARY_CLOUD_NAME  =  ""

CLOUDINARY_API_KEY  =  ""

CLOUDINARY_API_SECRET  =  ""

```
 
## Development
```sh

npm  run  dev

```
## Project Structure
```
project-root/
|--db/
|	|--migration
|	|--seeder
|--public/
|	|--images
|	|--logs             # logs
|--src/
|	|--api/
|		|--controllers. # Route Controler
|		|--models       # Sequelize models 
|		|--services.    # service
|	|--config.          # project config
|	|--middlewares      # custom express middlewares
|	|--routs. 			# Express routs
|	|--utils. 			# Utility functions
|	|--validatios.  	# Data validation schema
|--app.js. 				# Express app
|--server.js. 			# Entry point
```
## API Endpoints
List of available routes:

**General routes**: <br>

`GET api/` - get server status <br>

`PATCH api/sync` - Sync model with database <br>

  

**Auth routes**: <br>

`POST api/v1/auth/register` - register <br>

`POST api/v1/auth/login` - login <br>

`POST api/v1/auth/forgot-password` - send reset password email <br>

`POST api/v1/auth/reset-password` - reset password <br>

`POST api/v1/auth/logout` - logout <br>

`POST api/v1/auth/refresh-tokens` - refresh access and refresh tokens <br>

`POST api/v1/auth/send-verification-email` - send verification email <br>

`GET api/v1/auth/verify-email` - verify email <br>

**User routes**: <br>

`GET api/v1/user` - get all users <br>

`GET api/v1/user/:userId` - get all users <br>

`PUT api/v1/user/:userId` - update users <br>

`DELETE api/v1/user/:userId` - delete user <br>

## Contributing and Bug Reporting

 If you come across any bugs or have suggestions for improvements, we encourage you to contribute to the project. Please follow these guidelines when reporting issues or submitting pull requests: 
 
### Bug Reports 
If you find a bug or unexpected behavior, kindly create a new issue in the [Issues](https://github.com/bhavinvirani/node-sequelize-setup/issues) section of this repository. When reporting a bug, please provide as much detail as possible, including steps to reproduce the issue, your environment (operating system, browser, etc.), and any error messages you may have encountered. 

### Pull Requests 

I welcome contributions! If you have enhancements or bug fixes you'd like to share, please follow these steps: 
1. Fork the repository and create your branch from `main`. 
2. Make your changes and ensure they adhere to the coding standards.  
3. Test your changes thoroughly. 
4. Update the README if needed. 
5. Submit a pull request, clearly describing the changes you've made. 

I appreciate your help in improving this project!
