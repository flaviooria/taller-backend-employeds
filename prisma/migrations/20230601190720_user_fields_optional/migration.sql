-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tokenAuth" TEXT,
    "isAdmin" BOOLEAN DEFAULT true,
    "isVerify" BOOLEAN DEFAULT false
);
INSERT INTO "new_User" ("email", "id", "isAdmin", "isVerify", "name", "password", "tokenAuth") SELECT "email", "id", "isAdmin", "isVerify", "name", "password", "tokenAuth" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
