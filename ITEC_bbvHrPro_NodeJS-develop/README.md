# bbvHrPro Back-end repository

This is the Back-end of bbvHrPro project, a performance review and competency platform to serve for human resource management workflow




## Tech Stack

**Back-end:** NodeJS, ExpressJS, Sequelize ORM, PostgreSQL 



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_USERNAME=your database userName`

`DB_PASSWORD=your database password`

`DB_NAME=your database Name`

`DB_HOST=your database IP, ex: localhost:5678 `

`BACKEND_URL=your backend URL, ex: localhost:8080`

`JWT_KEY=your jwt key to encrypt password`

`STORAGE_URL=assets/images`



## Run Locally

Clone the project

```bash
  git clone https://github.com/votrongdao/ITEC_bbvHrPro_Backend
```

Go to the project directory

```bash
  cd ITEC_bbvHrPro
```

Install dependencies

```bash
  npm install
```

Run migrate for creating database

```bash
  npx sequelize db:migrate  
```

Run migrate for creating database

```bash
  npx sequelize db:seed:all  
```

Start the server

```bash
  npm run dev
```


## Documentation

[Documentation](https://1drv.ms/f/s!AhiqyPAW5UBSgl8ZqdY8XJVbcf85?e=ASSSxG)

[Postman API](https://www.postman.com/lunar-station-333462/workspace/my-workspace)
## Related

Here are some related projects

[Front-end Repository](https://github.com/votrongdao/ITEC_bbvHrPro)


