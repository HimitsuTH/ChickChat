/*
  Warnings:

  - You are about to drop the column `usersId` on the `chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `chat` DROP FOREIGN KEY `Chat_usersId_fkey`;

-- AlterTable
ALTER TABLE `chat` DROP COLUMN `usersId`;
