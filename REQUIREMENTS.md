# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

`Get /api/v1/products` - Read all products.
`POST /api/v1/products` - Create a new product [Requires Token]
`GET /api/v1/products/:id` -Read product by id
`DELETE /api/v1/products/id` - Delete product by id [Requires Token]

#### Users

`GET /api/v1/users` - Read all users [requires token]
`POST /api/v1/users/signup` - Create new user and get a token.
`GET /api/v1/users/login/:user_id` - Get a token using user id and password.
`DELETE /api/v1/users/15` - Delete a user [requires token]

#### Orders

`GET http://localhost:3000/api/v1/orders` -Read all orders
`POST http://localhost:3000/api/v1/orders` -Create new order [requires token]
`GET http://localhost:3000/api/v1/orders/:id` -Read order by id
`GET http://localhost:3000/api/v1/orders/users/:user_id` -Get all orders of a specific user [requires token]
`GET http://localhost:3000/api/v1/orders/completed/users/:user_id` -Get all completed orders of a specific user [requires token]
`DELETE http://localhost:3000/api/v1/orders/:id` - Delete an order by id [requires token]
`POST http://localhost:3000/api/v1/orders/:id/products` - Add a product to an order [requires token]
`PUT http://localhost:3000/api/v1/orders/18/complete` - mark order as complete [requires token]

## Database schemas
                                                         Table "public.products"
  Column  |          Type          | Collation | Nullable |               Default                | Storage  | Stats target | Description 
----------+------------------------+-----------+----------+--------------------------------------+----------+--------------+-------------
 id       | integer                |           | not null | nextval('products_id_seq'::regclass) | plain    |              | 
 name     | character varying(100) |           | not null |                                      | extended |              | 
 price    | real                   |           | not null |                                      | plain    |              | 
 category | text                   |           |          |                                      | extended |              | 

                                                   Table "public.orders"
 Column  |     Type      | Collation | Nullable |              Default               | Storage | Stats target | Description 
---------+---------------+-----------+----------+------------------------------------+---------+--------------+-------------
 id      | integer       |           | not null | nextval('orders_id_seq'::regclass) | plain   |              | 
 user_id | integer       |           |          |                                    | plain   |              | 
 status  | status_values |           | not null |                                    | plain   |              | 

                                                  Table "public.orders_products"
   Column   |  Type   | Collation | Nullable |                   Default                   | Storage | Stats target | Description 
------------+---------+-----------+----------+---------------------------------------------+---------+--------------+-------------
 id         | integer |           | not null | nextval('orders_products_id_seq'::regclass) | plain   |              | 
 product_id | integer |           |          |                                             | plain   |              | 
 order_id   | integer |           |          |                                             | plain   |              | 
 quantity   | integer |           | not null |                                             | plain   |              | 

                                                  Table "public.users"
  Column   |  Type   | Collation | Nullable |              Default              | Storage  | Stats target | Description 
-----------+---------+-----------+----------+-----------------------------------+----------+--------------+-------------
 id        | integer |           | not null | nextval('users_id_seq'::regclass) | plain    |              | 
 firstname | text    |           | not null |                                   | extended |              | 
 lastname  | text    |           | not null |                                   | extended |              | 
 password  | text    |           | not null |                                   | extended |              | 

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
