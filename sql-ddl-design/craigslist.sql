-- from the terminal run:
-- psql < craigslist.sql

DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    region_id INTEGER REFERENCES region
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    content TEXT,
    location TEXT,
    user_id INTEGER REFERENCES users,
    region_id INTEGER REFERENCES region,
    category_id INTEGER REFERENCES category
);


INSERT INTO region (name) VALUES ('San Francisco'), ('Atlanta'), ('Seattle');

INSERT INTO users (username, password, region_id) VALUES 
('johndoe', 'password123', 1), 
('janedoe', 'password123', 2),
('alexsmith', 'password123', 3);

INSERT INTO category (name) VALUES ('Electronics'), ('Furniture'), ('Vehicles');

INSERT INTO post (content, location, user_id, region_id, category_id) VALUES 
('Selling iPhone X, slightly used', 'Market Street', 1, 1, 1),
('Vintage couch in good condition', 'Peachtree Street', 2, 2, 2),
('2018 Toyota Camry, low mileage', 'Pike Place', 3, 3, 3);
