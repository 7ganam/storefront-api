/* Replace with your SQL commands */
CREATE TYPE status_values AS ENUM ('active', 'complete');

CREATE TABLE orders (
id SERIAL PRIMARY KEY,
user_id integer REFERENCES users(id),
status status_values NOT NULL
);