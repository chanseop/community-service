/*
  Warnings:

  - Added the required column `category` to the `board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `board` ADD COLUMN `category` INTEGER NOT NULL;
