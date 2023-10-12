-- CreateEnum
CREATE TYPE "public"."UserGender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "public"."MessageSender" AS ENUM ('owner', 'collaborator');

-- CreateEnum
CREATE TYPE "public"."MessageStatus" AS ENUM ('pending', 'reject', 'done');

-- CreateEnum
CREATE TYPE "public"."ExerciseTag" AS ENUM ('grammar', 'vocabulary', 'listening', 'speaking', 'writing', 'reading');

-- CreateEnum
CREATE TYPE "public"."ExerciseDifficulty" AS ENUM ('easy', 'medium', 'hard');

-- CreateEnum
CREATE TYPE "public"."ExerciseStructure" AS ENUM ('sentence', 'paragraph', 'article');

-- CreateEnum
CREATE TYPE "public"."ExerciseValidityStatus" AS ENUM ('uncertain', 'valid', 'invalid');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT,
    "gender" "public"."UserGender",
    "phone" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Conversation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "owner_id" UUID NOT NULL,
    "title" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT,
    "sender" "public"."MessageSender" NOT NULL,
    "status" "public"."MessageStatus" NOT NULL,
    "conversation_id" UUID NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Exercise" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tag" "public"."ExerciseTag" NOT NULL,
    "difficulty" "public"."ExerciseDifficulty" NOT NULL,
    "structure" "public"."ExerciseStructure" NOT NULL,
    "validity_status" "public"."ExerciseValidityStatus" NOT NULL,
    "conversation_id" UUID NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- CreateIndex
CREATE INDEX "Conversation_owner_id_idx" ON "public"."Conversation"("owner_id");

-- CreateIndex
CREATE INDEX "Message_conversation_id_idx" ON "public"."Message"("conversation_id");

-- CreateIndex
CREATE INDEX "Exercise_conversation_id_idx" ON "public"."Exercise"("conversation_id");

-- AddForeignKey
ALTER TABLE "public"."Conversation" ADD CONSTRAINT "Conversation_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Exercise" ADD CONSTRAINT "Exercise_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
