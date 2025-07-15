ALTER TABLE "audio_chunks" ADD COLUMN "embedding" vector(768) NOT NULL;--> statement-breakpoint
ALTER TABLE "audio_chunks" DROP COLUMN "embeddings";