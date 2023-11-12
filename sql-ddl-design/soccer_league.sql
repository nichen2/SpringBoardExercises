-- from the terminal run:
-- psql < soccer_league.sql

DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE player (
    id SERIAL PRIMARY KEY,
    name TEXT,
    height DECIMAL,
    position TEXT,
    team_id INTEGER REFERENCES team
);

CREATE TABLE referee (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE season (
    id SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE
);

CREATE TABLE match (
    id SERIAL PRIMARY KEY,
    team1_id INTEGER REFERENCES team,
    team2_id INTEGER REFERENCES team,
    season_id INTEGER REFERENCES season,
    team1_score INTEGER,
    team2_score INTEGER
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES match,
    player_id INTEGER REFERENCES player,
    minute INTEGER
);

CREATE TABLE referee_match (
    id SERIAL PRIMARY KEY,
    referee_id INTEGER REFERENCES referee,
    match_id INTEGER REFERENCES match
);

INSERT INTO team (name) VALUES ('FC Barcelona'), ('Real Madrid'),('Manchester United');

INSERT INTO player (name, height, position, team_id) 
VALUES ('Lionel Messi', 170, 'Forward', 1),
('Cristiano Ronaldo', 187, 'Forward', 2),
('Paul Pogba', 191, 'Midfielder', 3);

INSERT INTO referee (name) VALUES ('Mark Clattenburg'), ('Pierluigi Collina');

INSERT INTO season (start_date, end_date) VALUES ('2021-08-01', '2022-05-31');

INSERT INTO match (team1_id, team2_id, season_id, team1_score, team2_score) VALUES (1, 2, 1, 3, 2);
INSERT INTO match (team1_id, team2_id, season_id, team1_score, team2_score) VALUES (2, 3, 1, 1, 1);

INSERT INTO goals (match_id, player_id, minute) VALUES (1, 1, 55);
INSERT INTO goals (match_id, player_id, minute) VALUES (1, 2, 60);

INSERT INTO referee_match (referee_id, match_id) VALUES (1, 1);
INSERT INTO referee_match (referee_id, match_id) VALUES (2, 2);
