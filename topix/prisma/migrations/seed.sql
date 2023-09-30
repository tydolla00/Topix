CREATE TYPE "Provider" AS ENUM ('google', 'github', 'credentials');

-- CreateEnum
CREATE TYPE "Pronouns" AS ENUM ('HeHim', 'SheHer', 'Other');

-- CreateTable
CREATE TABLE "contact" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" VARCHAR(50) NOT NULL,
    "subject" VARCHAR(30) NOT NULL,
    "message" VARCHAR(3000) NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scores" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER,
    "movie_id" INTEGER,
    "tv_id" INTEGER,

    CONSTRAINT "Scores_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "quiz" (
    "id" SERIAL NOT NULL,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "choiceOne" TEXT NOT NULL,
    "choiceTwo" TEXT NOT NULL,
    "choiceThree" TEXT NOT NULL,
    "choiceFour" TEXT NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "img" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "created_by" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "img" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "img" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie" (
    "id" SERIAL NOT NULL,
    "created_by" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,
    "img" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tvs" (
    "id" SERIAL NOT NULL,
    "img" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "tvs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tv" (
    "id" SERIAL NOT NULL,
    "created_by" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tv_id" TEXT NOT NULL,
    "img" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "tv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topix" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "game_id" TEXT,
    "movie_id" TEXT,
    "tv_id" TEXT,
    "img" TEXT,
    "link" TEXT,

    CONSTRAINT "topix_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "quiz_quizId_key" ON "quiz"("quizId");

-- CreateIndex
CREATE UNIQUE INDEX "games_path_key" ON "games"("path");

-- CreateIndex
CREATE UNIQUE INDEX "game_game_id_key" ON "game"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "movies_path_key" ON "movies"("path");

-- CreateIndex
CREATE UNIQUE INDEX "movie_movie_id_key" ON "movie"("movie_id");

-- CreateIndex
CREATE UNIQUE INDEX "tvs_path_key" ON "tvs"("path");

-- CreateIndex
CREATE UNIQUE INDEX "tv_tv_id_key" ON "tv"("tv_id");

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
ALTER TABLE "Scores" ADD CONSTRAINT "Scores_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scores" ADD CONSTRAINT "Scores_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scores" ADD CONSTRAINT "Scores_tv_id_fkey" FOREIGN KEY ("tv_id") REFERENCES "tv"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("quizId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topix" ADD CONSTRAINT "topix_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("game_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topix" ADD CONSTRAINT "topix_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("movie_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topix" ADD CONSTRAINT "topix_tv_id_fkey" FOREIGN KEY ("tv_id") REFERENCES "tv"("tv_id") ON DELETE SET NULL ON UPDATE CASCADE;

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
