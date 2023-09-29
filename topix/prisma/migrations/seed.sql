-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('google', 'github', 'credentials');

-- CreateEnum
CREATE TYPE "Pronouns" AS ENUM ('HeHim', 'SheHer', 'Other');

-- CreateTable
CREATE TABLE "contact" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "subject" VARCHAR(30) NOT NULL,
    "message" VARCHAR(3000) NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "games_id" INTEGER,
    "name" VARCHAR(100) NOT NULL,
    "brand" VARCHAR(100),
    "timeline" DATE NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "movies_id" INTEGER,
    "name" VARCHAR(100) NOT NULL,
    "genre" VARCHAR(100) NOT NULL,
    "timeline" DATE NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizzes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "path" VARCHAR(100),
    "url" TEXT NOT NULL,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schema" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(10),
    "name" VARCHAR(100),
    "path" VARCHAR(100),

    CONSTRAINT "schema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topix" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "path" VARCHAR(100),

    CONSTRAINT "topix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tv" (
    "id" SERIAL NOT NULL,
    "tv_id" INTEGER,
    "name" VARCHAR(100) NOT NULL,
    "genre" VARCHAR(100) NOT NULL,
    "channel" VARCHAR(100) NOT NULL,
    "timeline" DATE NOT NULL,

    CONSTRAINT "tv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50),
    "first_name" TEXT,
    "last_name" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "birthday" TIMESTAMP(3),
    "pronouns" "Pronouns",
    "provider" "Provider",
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "quizzes_name_key" ON "quizzes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "quizzes_url_key" ON "quizzes"("url");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_providerAccountId_key" ON "account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "session_sessionToken_key" ON "session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationToken_token_key" ON "verificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationToken_identifier_token_key" ON "verificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "fk_games" FOREIGN KEY ("games_id") REFERENCES "schema"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "fk_movies" FOREIGN KEY ("movies_id") REFERENCES "schema"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tv" ADD CONSTRAINT "fk_tv" FOREIGN KEY ("tv_id") REFERENCES "schema"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO quizzes (name, description, path, url)
VALUES
  ('Football Quiz', 'How well do you know football?', 'Madden', 'madden'),
  ('Math Quiz', 'Challenge your friends and have fun with this Math Quiz, updated every week!', 'Math', 'math'),
  ('Basketball Quiz', 'How well do you know basketball?', 'NBA', 'nba'),
  ('RDC Quiz', 'Do you think you know RDC', 'RDC', 'rdc'),
  ('Guess the Video Game Theme Songs', 'Can you correctly guess all of these nostalgic theme songs?', 'VideoGame', 'videogamethemesongs'),
  ('Harry Potter Quiz', 'Test your knowledge on this magical quiz.', 'harry-potter.webp', 'harrypotter');
