# <p align = "center"> BoardCamp Backend </p>


##  :clipboard: Description

A board game rental management system.

***

## :computer:	 Technologies and Concepts

- REST APIs
- Node.js
- JavaScript
- Postgres
- Dayjs
- Joi
- Nodemon

***

## :rocket: Routes

```yml
POST /categories
    - Route to register a new category
    - headers: {}
    - body: {
        "name": "Lorem Ipsum"
}
```
    
```yml 
GET /categories
    - Route to list all categories
```

```yml
POST /games
    - Route to add a new game
    - headers: {}
    - body: {
        "name": "Lorem",
        "image": "https://remarkable-hackwork.info", 
        "stockTotal": 10, 
        "pricePerDay": 1000, 
        "categoryId": 1 
    }
```
    
```yml 
GET /games
    - Route to list games
```

```yml
POST /customers
    - Route to add a new customer
    - headers: {}
    - body: {
         "name": "Lorem Ipsum",
         "phone": "1499998888",
         "cpf": "12312312312345",
         "birthday": "10/10/2000"
    }
``` 

```yml 
GET /customers
    - Route to list all customers
```

```yml 
GET /customers/:id
    - Route to list customers by id
```

```yml 
PUT /customers/:id
    - Route to edit informations from customer
    - headers: {}
    - body: {
         "name": "Lorem Ipsum",
         "phone": "1499998888",
         "cpf": "12312312312345",
         "birthday": "10/10/2000"
    }
```

```yml
POST /rentals
    - Route to add a new rental
    - headers: {}
    - body: {
        "customerId": 1,
        "gameId": 1,
        "daysRented": 3,
    }
``` 

```yml
POST /rentals/:id/return
    - Route to close a rental
    - headers: {}
    - body: {
        "customerId": 1,
        "gameId": 1,
        "daysRented": 3,
    }
``` 

```yml 
GET /rentals
    - Route to list rentals from costumer
```

```yml 
DELETE /rentals/:id
    - Route to delete a rental
```

```yml 
GET /rentals/metrics
    - Route to return metrics of rentals by date
```



## 🏁 Running the application

This project was started with the [Express](https://www.npmjs.com/package/express), so make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.


First, clone this repository on your machine:

```
git clone https://github.com/williameiji/boardcamp
```

Then, inside the folder, run the following command to install the dependencies.

```
npm install
```

Finished the process, just start the server
```
npm start
```


