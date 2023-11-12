-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE stars (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE galaxy (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE planets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbit_star_id INTEGER REFERENCES stars,
  galaxy_id INTEGER REFERENCES galaxy
);

CREATE TABLE moons (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE planets_moon (
  id SERIAL PRIMARY KEY,
  planet_id INTEGER REFERENCES planets,
  moon_id INTEGER REFERENCES moons
);

INSERT INTO stars (name) VALUES ('The Sun');
INSERT INTO stars (name) VALUES ('Proxima Centauri');
INSERT INTO stars (name) VALUES ('Gliese 876');

INSERT INTO galaxy (name) VALUES ('Milky Way');

INSERT INTO planets (name, orbital_period_in_years, orbit_star_id, galaxy_id) VALUES ('Earth', 1.00, 1, 1);
INSERT INTO planets (name, orbital_period_in_years, orbit_star_id, galaxy_id) VALUES ('Mars', 1.88, 1, 1);

INSERT INTO moons (name) VALUES ('The Moon');
INSERT INTO moons (name) VALUES ('Phobos');
INSERT INTO moons (name) VALUES ('Deimos');

INSERT INTO planets_moon (planet_id, moon_id) VALUES (1, 1); 
INSERT INTO planets_moon (planet_id, moon_id) VALUES (2, 2); 
INSERT INTO planets_moon (planet_id, moon_id) VALUES (2, 3); 
