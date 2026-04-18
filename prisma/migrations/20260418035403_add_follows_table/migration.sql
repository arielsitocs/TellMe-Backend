/*
  Warnings:

  - The primary key for the `like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `likeid` on the `like` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_publicationid_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_userid_fkey";

-- DropIndex
DROP INDEX "like_userid_publicationid_key";

-- AlterTable
ALTER TABLE "like" DROP CONSTRAINT "like_pkey",
DROP COLUMN "likeid",
ADD CONSTRAINT "like_pkey" PRIMARY KEY ("userid", "publicationid");

-- CreateTable
CREATE TABLE "follow" (
    "followerid" INTEGER NOT NULL,
    "followedid" INTEGER NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("followerid","followedid")
);

-- AddForeignKey
ALTER TABLE "commentary" ADD CONSTRAINT "commentary_publicationid_fkey" FOREIGN KEY ("publicationid") REFERENCES "publication"("publicationid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "commentary" ADD CONSTRAINT "commentary_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_publicationid_fkey" FOREIGN KEY ("publicationid") REFERENCES "publication"("publicationid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_publicationid_fkey" FOREIGN KEY ("publicationid") REFERENCES "publication"("publicationid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_senderid_fkey" FOREIGN KEY ("senderid") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followedid_fkey" FOREIGN KEY ("followedid") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerid_fkey" FOREIGN KEY ("followerid") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE NO ACTION;
