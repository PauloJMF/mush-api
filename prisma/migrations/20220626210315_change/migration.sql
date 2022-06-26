/*
  Warnings:

  - Added the required column `email_verification_code` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recovery_passwords" DROP CONSTRAINT "recovery_passwords_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email_verification_code" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "recovery_passwords" ADD CONSTRAINT "recovery_passwords_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
