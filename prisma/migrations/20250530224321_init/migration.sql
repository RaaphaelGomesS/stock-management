-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shelf` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stock_id` INTEGER NOT NULL,
    `columns` INTEGER NOT NULL,
    `rows` INTEGER NOT NULL,
    `destination` ENUM('GENERAL', 'CLEANING', 'PRESERVE', 'PERISHABLE', 'DRINKS') NOT NULL DEFAULT 'GENERAL',
    `restriction` VARCHAR(191) NULL,
    `full` BOOLEAN NOT NULL DEFAULT false,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_Template` (
    `ean` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `type` ENUM('GENERAL', 'CLEANING', 'PRESERVE', 'PERISHABLE', 'DRINKS') NOT NULL DEFAULT 'GENERAL',
    `lote_type` ENUM('UNIT', 'BOX', 'BUNDLE', 'PACK', 'PACKAGE', 'BURDEN') NOT NULL DEFAULT 'UNIT',
    `weight` DECIMAL(5, 2) NULL,
    `lote_amount` INTEGER NOT NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`ean`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shelf_id` INTEGER NOT NULL,
    `template_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `type` ENUM('GENERAL', 'CLEANING', 'PRESERVE', 'PERISHABLE', 'DRINKS') NOT NULL DEFAULT 'GENERAL',
    `lote_type` ENUM('UNIT', 'BOX', 'BUNDLE', 'PACK', 'PACKAGE', 'BURDEN') NOT NULL DEFAULT 'UNIT',
    `weight` DECIMAL(5, 2) NULL,
    `lote_amount` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `validity` VARCHAR(191) NULL,
    `column` INTEGER NULL,
    `row` INTEGER NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shelf` ADD CONSTRAINT `Shelf_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `Stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_shelf_id_fkey` FOREIGN KEY (`shelf_id`) REFERENCES `Shelf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_template_id_fkey` FOREIGN KEY (`template_id`) REFERENCES `product_template`(`ean`) ON DELETE RESTRICT ON UPDATE CASCADE;
