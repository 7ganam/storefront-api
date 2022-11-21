/* Replace with your SQL commands */
CREATE TABLE orders_products (
id SERIAL PRIMARY KEY,
product_id integer REFERENCES products(id),
order_id integer REFERENCES orders(id),
quantity integer NOT NULL
);