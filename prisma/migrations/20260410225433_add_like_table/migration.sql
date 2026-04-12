-- CreateTable
CREATE TABLE "Like" (
    "likeid" SERIAL NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "userid" INTEGER NOT NULL,
    "publicationid" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("likeid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_userid_publicationid_key" ON "Like"("userid", "publicationid");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_publicationid_fkey" FOREIGN KEY ("publicationid") REFERENCES "Publication"("publicationid") ON DELETE CASCADE ON UPDATE CASCADE;
