/*
  Warnings:

  - The primary key for the `product_template` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_shelf_id_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_template_id_fkey`;

-- DropForeignKey
ALTER TABLE `shelf` DROP FOREIGN KEY `Shelf_stock_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `Stock_user_id_fkey`;

-- AlterTable
ALTER TABLE `product` MODIFY `template_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product_template` DROP PRIMARY KEY,
    MODIFY `ean` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`ean`);

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `Product_shelf_id_fkey` FOREIGN KEY (`shelf_id`) REFERENCES `shelf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `Product_template_id_fkey` FOREIGN KEY (`template_id`) REFERENCES `product_template`(`ean`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shelf` ADD CONSTRAINT `Shelf_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `stock`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `Stock_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
