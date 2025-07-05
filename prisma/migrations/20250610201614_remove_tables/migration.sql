/*
  Warnings:

  - You are about to drop the column `image` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `shelf_id` on the `product` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Enum(EnumId(2))`.
  - You are about to alter the column `lote_type` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `Enum(EnumId(3))`.
  - You are about to drop the column `image` on the `product_template` table. All the data in the column will be lost.
  - You are about to drop the column `lote_amount` on the `product_template` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `product_template` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `product_template` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(2))`.
  - You are about to alter the column `lote_type` on the `product_template` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(3))`.
  - You are about to drop the `shelf` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_shelf_id_fkey`;

-- DropForeignKey
ALTER TABLE `shelf` DROP FOREIGN KEY `Shelf_stock_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `Stock_user_id_fkey`;

-- DropIndex
DROP INDEX `Product_shelf_id_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `image`,
    DROP COLUMN `shelf_id`,
    ADD COLUMN `shelf` INTEGER NULL,
    MODIFY `type` ENUM('GENERICO', 'LIMPEZA', 'CONSERVA', 'PERESIVEL', 'BEBIDAS') NOT NULL DEFAULT 'GENERICO',
    MODIFY `lote_type` ENUM('UNIDADE', 'CAIXA', 'ENGRADADO', 'PACOTE', 'FARDO') NOT NULL DEFAULT 'UNIDADE',
    MODIFY `lote_amount` INTEGER NULL,
    MODIFY `quantity` INTEGER NULL,
    MODIFY `row` INTEGER NULL;

-- AlterTable
ALTER TABLE `product_template` DROP COLUMN `image`,
    DROP COLUMN `lote_amount`,
    DROP COLUMN `weight`,
    MODIFY `type` ENUM('GENERICO', 'LIMPEZA', 'CONSERVA', 'PERESIVEL', 'BEBIDAS') NOT NULL DEFAULT 'GENERICO',
    MODIFY `lote_type` ENUM('UNIDADE', 'CAIXA', 'ENGRADADO', 'PACOTE', 'FARDO') NOT NULL DEFAULT 'UNIDADE';

-- DropTable
DROP TABLE `shelf`;

-- DropTable
DROP TABLE `stock`;

-- CreateIndex
CREATE INDEX `product_user_id_fkey` ON `product`(`user_id`);

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
