-- AlterTable
ALTER TABLE `cart` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    MODIFY `deactivatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    MODIFY `deactivatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `selleruser` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `deactivatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    MODIFY `deactivatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `warehouse` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    MODIFY `deactivatedAt` DATETIME(3) NULL;
