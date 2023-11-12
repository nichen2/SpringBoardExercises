-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  release_date DATE NOT NULL
);

CREATE TABLE producers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  album_id INTEGER REFERENCES albums
);

CREATE TABLE song_artists (
  song_id INTEGER REFERENCES songs,
  artist_id INTEGER REFERENCES artists
);

CREATE TABLE song_producers (
  song_id INTEGER REFERENCES songs,
  producer_id INTEGER REFERENCES producers
);


-- Insert data into artists
INSERT INTO artists (name) VALUES
    ('Hanson'),
    ('Queen'),
    ('Mariah Cary'),
    ('Boyz II Men'),
    ('Lady Gaga'),
    ('Bradley Cooper'),
    ('Nickelback'),
    ('Jay Z'),
    ('Alicia Keys'),
    ('Katy Perry'),
    ('Juicy J'),
    ('Maroon 5'),
    ('Christina Aguilera'),
    ('Avril Lavigne'),
    ('Destiny''s Child');

-- Insert data into albums
INSERT INTO albums (title, release_date) VALUES
    ('Middle of Nowhere', '1997-04-15'),
    ('A Night at the Opera', '1975-10-31'),
    ('Daydream', '1995-11-14'),
    ('A Star Is Born', '2018-09-27'),
    ('Silver Side Up', '2001-08-21'),
    ('The Blueprint 3', '2009-10-20'),
    ('Prism', '2013-12-17'),
    ('Hands All Over', '2011-06-21'),
    ('Let Go', '2002-05-14'),
    ('The Writing''s on the Wall', '1999-11-07');

-- Insert data into producers
INSERT INTO producers (name) VALUES
    ('Dust Brothers'),
    ('Stephen Lironi'),
    ('Roy Thomas Baker'),
    ('Walter Afanasieff'),
    ('Benjamin Rice'),
    ('Rick Parashar'),
    ('Al Shux'),
    ('Max Martin'),
    ('Cirkut'),
    ('Shellback'),
    ('Benny Blanco'),
    ('The Matrix'),
    ('Darkchild');

-- Insert data into songs and link to albums
INSERT INTO songs (title, duration_in_seconds, album_id) VALUES
    ('MMMBop', 238, 1),
    ('Bohemian Rhapsody', 355, 2),
    ('One Sweet Day', 282, 3),
    ('Shallow', 216, 4),
    ('How You Remind Me', 223, 5),
    ('New York State of Mind', 276, 6),
    ('Dark Horse', 215, 7),
    ('Moves Like Jagger', 201, 8),
    ('Complicated', 244, 9),
    ('Say My Name', 240, 10);

-- Link songs to artists
INSERT INTO song_artists (song_id, artist_id) VALUES
    (1, 1), -- Mmmbop by Hanson
    (2, 2), -- Bohemian Rhapsody by Queen
    (3, 3), (3, 4); -- One Sweet Day by Mariah Cary and Boyz II Men

-- Link songs to producers
INSERT INTO song_producers (song_id, producer_id) VALUES
    (1, 1), (1, 2), -- Mmmbop produced by Dust Brothers and Stephen Lironi
    (2, 3);

