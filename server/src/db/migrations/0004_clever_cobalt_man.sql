ALTER TABLE "audio_chunks" RENAME COLUMN "embedding" TO "embeddings";--> statement-breakpoint
CREATE INDEX "embeddingIndex" ON "audio_chunks" USING hnsw ("embeddings" vector_cosine_ops);