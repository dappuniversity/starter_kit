-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "domain" TEXT,
    "account" TEXT,
    "short_id" TEXT,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);
