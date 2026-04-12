-- CreateTable
CREATE TABLE "Commentary" (
    "commentaryid" SERIAL NOT NULL,
    "content" VARCHAR NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "userid" INTEGER,
    "publicationid" INTEGER,

    CONSTRAINT "Commentary_pkey" PRIMARY KEY ("commentaryid")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notificationid" SERIAL NOT NULL,
    "type" VARCHAR NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "userid" INTEGER,
    "senderid" INTEGER,
    "publicationid" INTEGER,
    "commentaryid" INTEGER,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationid")
);

-- CreateTable
CREATE TABLE "Publication" (
    "publicationid" SERIAL NOT NULL,
    "content" VARCHAR NOT NULL,
    "imageurl" VARCHAR,
    "likes" INTEGER DEFAULT 0,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "userid" INTEGER,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("publicationid")
);

-- CreateTable
CREATE TABLE "User" (
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

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_commentaryid_fkey" FOREIGN KEY ("commentaryid") REFERENCES "Commentary"("commentaryid") ON DELETE CASCADE ON UPDATE NO ACTION;
