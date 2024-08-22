import { z } from "zod";

export const createBookmarkSchema = z.object({
  url: z.string().url(),
  collectionId: z.string().min(21).max(21),
});

export const updateBookmarkReadStatusSchema = z.object({
  bookmarkId: z.string().min(21).max(21),
  readAt: z.string().nullable(),
});

export const fetchBookmarksSchema = z.object({
  collectionId: z.string().min(21).max(21),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive().max(100),
});
