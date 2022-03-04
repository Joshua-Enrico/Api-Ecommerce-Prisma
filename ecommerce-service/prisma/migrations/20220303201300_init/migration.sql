-- AlterTable
ALTER TABLE `admin` MODIFY `password` VARCHAR(65) NOT NULL;

-- AlterTable
ALTER TABLE `selleruser` MODIFY `password` VARCHAR(65) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(65) NOT NULL;
