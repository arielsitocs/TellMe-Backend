-- CreateTable
CREATE TABLE "commentary" (
    "commentaryid" SERIAL NOT NULL,
    "content" VARCHAR NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "userid" INTEGER,
    "publicationid" INTEGER,

    CONSTRAINT "commentary_pkey" PRIMARY KEY ("commentaryid")
);

-- CreateTable
CREATE TABLE "like" (
    "likeid" SERIAL NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "userid" INTEGER NOT NULL,
    "publicationid" INTEGER NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("likeid")
);

-- CreateTable
CREATE TABLE "notification" (
    "notificationid" SERIAL NOT NULL,
    "type" VARCHAR NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "userid" INTEGER,
    "senderid" INTEGER,
    "publicationid" INTEGER,
    "commentaryid" INTEGER,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("notificationid")
);

-- CreateTable
CREATE TABLE "publication" (
    "publicationid" SERIAL NOT NULL,
    "content" VARCHAR NOT NULL,
    "imageurl" VARCHAR,
    "likes" INTEGER DEFAULT 0,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "userid" INTEGER,

    CONSTRAINT "publication_pkey" PRIMARY KEY ("publicationid")
);

-- CreateTable
CREATE TABLE "user" (
    "userid" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "lastname" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "color" VARCHAR NOT NULL,
    "imageurl" VARCHAR,
    "followers" INTEGER DEFAULT 0,
    "following" INTEGER DEFAULT 0,
    "posts" INTEGER DEFAULT 0,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userid")
);

-- CreateIndex
CREATE UNIQUE INDEX "like_userid_publicationid_key" ON "like"("userid", "publicationid");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_publicationid_fkey" FOREIGN KEY ("publicationid") REFERENCES "publication"("publicationid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_commentaryid_fkey" FOREIGN KEY ("commentaryid") REFERENCES "commentary"("commentaryid") ON DELETE CASCADE ON UPDATE NO ACTION;
