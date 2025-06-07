/*
  Warnings:

  - Added the required column `user_id` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `shelf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `shelf` ADD COLUMN `user_id` INTEGER NOT NULL;
