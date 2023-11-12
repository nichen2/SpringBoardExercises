-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE city (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE country (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE airline (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  home_city_id INTEGER REFERENCES city,
  home_country_id INTEGER REFERENCES city
);

CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  seat TEXT NOT NULL,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline_id INTEGER REFERENCES airline,
  from_city_id INTEGER REFERENCES city,
  from_country_id INTEGER REFERENCES country,
  to_city_id INTEGER REFERENCES city,
  to_country_id INTEGER REFERENCES country
);

-- Insert data into city and country tables
INSERT INTO city (name) VALUES
    ('Washington DC'),
    ('Tokyo'),
    ('Los Angeles'),
    ('Seattle'),
    ('Paris'),
    ('Dubai'),
    ('New York'),
    ('Cedar Rapids'),
    ('Charlotte'),
    ('Sao Paolo');

INSERT INTO country (name) VALUES
    ('United States'),
    ('Japan'),
    ('United Kingdom'),
    ('France'),
    ('UAE'),
    ('China'),
    ('Brazil'),
    ('Chile'),
    ('Mexico'),
    ('Morocco');

-- Insert data into airline table (using example IDs from city and country)
INSERT INTO airline (name, home_city_id, home_country_id) VALUES
    ('United Airlines', 1, 1),
    ('British Airways', 2, 3),
    ('Delta Airlines', 3, 1),
    ('TUI Fly Belgium', 5, 4),
    ('Air China', 6, 6),
    ('American Airlines', 7, 1),
    ('Avianca Brasil', 10, 7);

-- Insert data into tickets table (using example IDs from airline, city, and country)
INSERT INTO tickets (first_name, last_name, seat, departure, arrival, airline_id, from_city_id, from_country_id, to_city_id, to_country_id) VALUES
    ('Jennifer', 'Finch', '33B', '2018-04-08 09:00:00', '2018-04-08 12:00:00', 1, 1, 1, 4, 1),
    ('Thadeus', 'Gathercoal', '8A', '2018-12-19 12:45:00', '2018-12-19 16:15:00', 2, 2, 2, 3, 3),
    ('Sonja', 'Pauley', '12F', '2018-01-02 07:00:00', '2018-01-02 08:03:00', 3, 3, 1, 9, 1),
    ('Jennifer', 'Finch', '20A', '2018-04-15 16:50:00', '2018-04-15 21:00:00', 3, 4, 1, 9, 9),
    ('Waneta', 'Skeleton', '23D', '2018-08-01 18:30:00', '2018-08-01 21:50:00', 4, 5, 4, 10, 10),
    ('Thadeus', 'Gathercoal', '18C', '2018-10-31 01:15:00', '2018-10-31 12:55:00', 5, 6, 5, 6, 6),
    ('Berkie', 'Wycliff', '9E', '2019-02-06 06:00:00', '2019-02-06 07:47:00', 1, 7, 1, 8, 1),
    ('Alvin', 'Leathes', '1A', '2018-12-22 14:42:00', '2018-12-22 15:56:00', 6, 8, 1, 7, 1),
    ('Berkie', 'Wycliff', '32B', '2019-02-06 16:28:00', '2019-02-06 19:18:00', 6, 8, 1, 9, 1),
    ('Cory', 'Squibbes', '10D', '2019-01-20 19:30:00', '2019-01-20 22:45:00', 7, 10, 7, 10, 8);
