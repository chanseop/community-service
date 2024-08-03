/*
  Warnings:

  - You are about to drop the column `titile` on the `board` table. All the data in the column will be lost.
  - Added the required column `title` to the `board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `board` DROP COLUMN `titile`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
