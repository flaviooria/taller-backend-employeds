/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `Employed` table. All the data in the column will be lost.
  - Added the required column `jobPosition` to the `Employed` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employed" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "jobPosition" TEXT NOT NULL
);
INSERT INTO "new_Employed" ("email", "id", "name", "password", "surname") SELECT "email", "id", "name", "password", "surname" FROM "Employed";
DROP TABLE "Employed";
ALTER TABLE "new_Employed" RENAME TO "Employed";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
