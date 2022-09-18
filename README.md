<p align="center"><img src="https://matonoprato.com.br/wp-content/uploads/2020/12/amazonica.png" width="250"></p>

# Regia's move API

Back-end application for Vitória Régia project.

## 🧬 Cloning this project

1. To clone this project with command line you must have <a href="https://git-scm.com/downloads">Git</a> installed on your machine. On your terminal run:

```
git clone https://github.com/amazonsoft-tech/victoria-backend.git
```

2. Access the root folder:

```
cd victoria-backend
```

## 💿 Installing dependencies

1. You must have <a href="https://yarnpkg.com/getting-started/install/">Yarn</a> or NPM installed so you can install the dependencies that this project demands. In the root directory, run:

```
yarn
```

in case you have NPM instead, just run:

```
npm install
```


## 🚀 Running this API locally

1. Duplicate the file <code>.env.example</code> and rename one of them to <code>.env</code>

2. Add the environment variables in the newly created <code>.env</code> file

```
DATABASE_URL =
SECRET = 
```

3. Generate prisma schema with:

```
npx prisma generate
```

4. Sync the database with the prisma schema with:

```
npx prisma db push
```

5. To run this API, run one of the following commands below:

```
yarn dev
```

or

```
npm run dev
```

## 🌿 API Routes

### 1. Login routes
1.1 Log user in: <code>POST</code>  /login
```
{
    "email": "usermail@email.com",
    "password": "1234"
}
```
ℹ The application gets the user's id since the login, dispensing the need to add the user's id in the application's routes.
### 2. User routes
2.1 Create user: <code>POST</code>  /user
```
{
    "name": "Markus Persson",
    "cpf": "111.111.111-11",
    "phone": "(XX) XXXXX-XXXX",
    "email": "markus_persson2112@outlook.com",
    "password": "12345"
}
```
2.2 Read user: <code>GET</code>  /user
</br><i>Return example:</i>
```
{
    "id": "63122b9a213b12451580e909",
    "name": "Markus Persson",
    "cpf": "111.111.111-11",
    "phone": "(XX) XXXXX-XXXX",
    "email": "markus_persson2112@outlook.com",
    "password": "$2a$08$4ZH4bOlbCj3nofYFJ2585ulwFMejnohNvomrTWjedfX0cQXaw7Pza",
    "created_at": "2022-09-02T16:13:14.103Z",
    "updated_at": "2022-09-02T16:13:14.103Z"
}
```
2.3 Read all users: <code>GET</code>  /users
</br><i>Return example:</i>
```
[
    {
        "id": "63122b9a213b12451580e909",
        "name": "Gustav-Dev17",
        "cpf": "111.111.111-11",
        "phone": "(XX) XXXXX-XXXX",
        "email": "gustav-dev17@gmail.com",
        "password": "$2a$08$4ZH4bOlbCj3nofYFJ2585ulwFMejnohNvomrTWjedfX0cQXaw7Pza",
        "created_at": "2022-09-02T16:13:14.103Z",
        "updated_at": "2022-09-02T16:13:14.103Z"
    },
    {
        "id": "63151aca4be411c7455c7604",
        "name": "Markus Persson",
        "cpf": "111.111.111-11",
        "phone": "(XX) XXXXX-XXXX",
        "email": "markus_persson2112@outlook.com",
        "password": "$2a$08$4ZH4bOlbCj3nofYFJ2585ulwFMejnohNvomrTWjedfX0cQXaw7Pza",
        "created_at": "2022-09-02T16:13:14.103Z",
        "updated_at": "2022-09-02T16:13:14.103Z"
    }
]
```
2.4 Update user: <code>PATCH</code>  /user
```
{
    "name": "Markus Persson",
    "cpf": "222.222.222-22",
    "phone": "(YY) YYYYY-YYYY",
    "email": "markus_persson2112@outlook.com",
    "password": "12345678"
}
```
2.5 Delete user: <code>DELETE</code>  /user
</br><i>Return:</i> 204 No Content

## 🛠️ Technologies used in this project
<ul>
<li><a href="https://www.typescriptlang.org/">Typescript</a> – Javascript superset, adding static typing and other features</li>

<li><a href="https://nodejs.org/en/">NodeJS</a> – Javascript execution environment outside the browser</li>

<li><a href="https://expressjs.com/pt-br/">ExpressJs</a> – Framework for NodeJs web applications</li>

<li><a href="https://www.prisma.io/">Prisma ORM</a> – ORM that makes working with databases easy for application developers and features</li>

<li><a href="https://www.mongodb.com/">MongoDB</a> – Open source NoSQL database management program</li>

<li>And more...</li>
</ul>
