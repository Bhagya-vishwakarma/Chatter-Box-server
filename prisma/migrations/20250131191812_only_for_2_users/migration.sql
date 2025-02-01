/*
  Warnings:

  - You are about to drop the `ChatUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userOneId,userTwoId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userOneId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userTwoId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChatUser" DROP CONSTRAINT "ChatUser_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatUser" DROP CONSTRAINT "ChatUser_userId_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "userOneId" TEXT NOT NULL,
ADD COLUMN     "userTwoId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ChatUser";

-- CreateIndex
CREATE UNIQUE INDEX "Chat_userOneId_userTwoId_key" ON "Chat"("userOneId", "userTwoId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userOneId_fkey" FOREIGN KEY ("userOneId") REFERENCES "AllUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userTwoId_fkey" FOREIGN KEY ("userTwoId") REFERENCES "AllUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
