-- CreateTable
CREATE TABLE "Loaner" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "photo" JSONB,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "groupId" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Loaner" ADD FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
