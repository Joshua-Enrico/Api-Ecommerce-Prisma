-- AlterTable
ALTER TABLE `admin` ADD COLUMN `userType` VARCHAR(20) NOT NULL DEFAULT 'admin';

-- AlterTable
ALTER TABLE `selleruser` ADD COLUMN `userType` VARCHAR(20) NOT NULL DEFAULT 'selleruser';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `userType` VARCHAR(20) NOT NULL DEFAULT 'user';
