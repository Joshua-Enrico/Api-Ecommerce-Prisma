/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `selleruser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `selleruser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `admin_name_key` ON `admin`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `admin_email_key` ON `admin`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `selleruser_name_key` ON `selleruser`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `selleruser_email_key` ON `selleruser`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `user_name_key` ON `user`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);
