DROP TABLE IF EXISTS "notification" CASCADE;
DROP TABLE IF EXISTS "like" CASCADE;
DROP TABLE IF EXISTS "commentary" CASCADE;
DROP TABLE IF EXISTS "publication" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

CREATE TABLE "user" (
	userid SERIAL NOT NULL PRIMARY KEY,
	email VARCHAR NOT NULL UNIQUE,
	firstname VARCHAR NOT NULL,
	lastname VARCHAR NOT NULL,
	username VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL,
	description VARCHAR NOT NULL,
	color VARCHAR NOT NULL,
	imageurl VARCHAR,
	followers INT DEFAULT 0,
	following INT DEFAULT 0,
	posts INT DEFAULT 0
);

CREATE TABLE "publication" (
	publicationid SERIAL NOT NULL PRIMARY KEY,
	content VARCHAR NOT NULL,
	imageurl VARCHAR,
	likes INT DEFAULT 0,
	createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	userid INT REFERENCES "user"(userid) ON DELETE CASCADE
);

CREATE TABLE "commentary" (
	commentaryid SERIAL NOT NULL PRIMARY KEY,
	content VARCHAR NOT NULL,
	createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	userid INT REFERENCES "user"(userid) ON DELETE CASCADE,
	publicationid INT REFERENCES "publication"(publicationid) ON DELETE CASCADE
);

CREATE TABLE "like" (
	likeid SERIAL NOT NULL PRIMARY KEY,
	createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	userid INT REFERENCES "user"(userid) ON DELETE CASCADE,
	publicationid INT REFERENCES "publication"(publicationid) ON DELETE CASCADE,
	CONSTRAINT unique_user_publication_like UNIQUE (userid, publicationid)
);

CREATE TABLE "notification" (
	notificationid SERIAL NOT NULL PRIMARY KEY,
	type VARCHAR NOT NULL,
	createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	userid INT REFERENCES "user"(userid) ON DELETE CASCADE,
	senderid INT REFERENCES "user"(userid) ON DELETE CASCADE,
	publicationid INT REFERENCES "publication"(publicationid) ON DELETE CASCADE,
	commentaryid INT REFERENCES "commentary"(commentaryid) ON DELETE CASCADE
);

INSERT INTO "user" (firstname, lastname, username, password, description, color, followers, following, posts)
VALUES ('Ariel', 'Escobar', 'arielescobar', 'password_segura_123', 'Ingeniero Informático y Desarrollador Full Stack.', '#6D28D9', 1200, 380, 1);

INSERT INTO "user" (firstname, lastname, username, password, description, color, followers, following, posts)
VALUES ('Juan', 'Díaz', 'juandiaz_dev', 'abc12345', 'Aprendiendo cada día.', '#EF4444', 500, 100, 0);

INSERT INTO "publication" (content, imageurl, userid, likes)
VALUES ('¡Acabo de terminar el esquema de la base de datos de TellMe! 🚀', 'https://tu-cdn.com/post-schema.jpg', 1, 10);

INSERT INTO "commentary" (content, userid, publicationid)
VALUES ('¡Quedó de lujo esa arquitectura, colega! xd', 2, 1);

INSERT INTO "notification" (type, userid, senderid, publicationid)
VALUES ('like_post', 1, 2, 1);

INSERT INTO "notification" (type, userid, senderid, publicationid, commentaryid)
VALUES ('comment_post', 1, 2, 1, 1);

SELECT * FROM "user";
SELECT * FROM "publication";
SELECT * FROM "commentary";
SELECT * FROM "notification";
SELECT * FROM "like";

SELECT * FROM "publication" INNER JOIN "user" ON "publication".userid = "user".userid;
