/*
  Warnings:

  - You are about to alter the column `type` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Enum(EnumId(4))`.
  - You are about to alter the column `lote_type` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `Enum(EnumId(3))`.
  - You are about to alter the column `type` on the `product_template` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(4))`.
  - You are about to alter the column `lote_type` on the `product_template` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(3))`.
  - You are about to alter the column `destination` on the `shelf` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `type` ENUM('GENERICO', 'LIMPEZA', 'CONSERVA', 'PERESIVEL', 'BEBIDAS') NOT NULL DEFAULT 'GENERICO',
    MODIFY `lote_type` ENUM('UNIDADE', 'CAIXA', 'ENGRADADO', 'PACOTE', 'FARDO') NOT NULL DEFAULT 'UNIDADE';

-- AlterTable
ALTER TABLE `product_template` MODIFY `type` ENUM('GENERICO', 'LIMPEZA', 'CONSERVA', 'PERESIVEL', 'BEBIDAS') NOT NULL DEFAULT 'GENERICO',
    MODIFY `lote_type` ENUM('UNIDADE', 'CAIXA', 'ENGRADADO', 'PACOTE', 'FARDO') NOT NULL DEFAULT 'UNIDADE';

-- AlterTable
ALTER TABLE `shelf` MODIFY `destination` ENUM('GENERICO', 'LIMPEZA', 'CONSERVA', 'PERESIVEL', 'BEBIDAS') NOT NULL DEFAULT 'GENERICO';
