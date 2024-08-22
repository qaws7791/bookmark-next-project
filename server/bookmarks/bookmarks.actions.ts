"use server";
import { nanoid } from "nanoid";
import path from "node:path";
import { createClient } from "../../supabase/server";
import { downloadImage, scrapLinkInfo } from "../scraping";
import {
  createBookmarkSchema,
  fetchBookmarksSchema,
  updateBookmarkReadStatusSchema,
} from "./bookmarks.schemas";

export async function createBookmark(input: {
  url: string;
  collectionId: string;
}) {
  const inputResult = createBookmarkSchema.safeParse({
    url: input.url,
    collectionId: input.collectionId,
  });

  if (!inputResult.success) {
    return { error: "Invalid input" };
  }

  const { url, collectionId } = inputResult.data;

  const linkInfo = await scrapLinkInfo(url);
  if (linkInfo.error) {
    return { error: linkInfo.error };
  }

  // upload image and favicon
  const newBookmarkId = nanoid();
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (!user) {
    return { error: "User not found" };
  }
  let imageUrl: string | null = null;
  let faviconUrl: string | null = null;
  try {
    const ogimage = linkInfo.image ? await downloadImage(linkInfo.image) : null;
    const favicon = linkInfo.favicon
      ? await downloadImage(linkInfo.favicon)
      : await downloadImage(path.join(new URL(url).origin, "/favicon.ico"));

    if (ogimage?.image) {
      console.log("update image:", linkInfo.image);
      const { data, error } = await supabase.storage
        .from("bookmarks")
        .upload(
          `${newBookmarkId}/image`,
          await ogimage.image,
          ogimage.contentType ? { contentType: ogimage.contentType } : {},
        );
      if (error) {
        console.error("Failed to upload image:", error);
        return { error: "Failed to upload image" };
      }
      imageUrl = data.fullPath;
    }
    if (favicon?.image) {
      console.log("update favicon:", linkInfo.favicon);
      const { data, error } = await supabase.storage
        .from("bookmarks")
        .upload(
          `${newBookmarkId}/favicon`,
          await favicon.image,
          favicon.contentType ? { contentType: favicon.contentType } : {},
        );
      if (error) {
        console.error("Failed to upload favicon:", error);
        return { error: "Failed to upload favicon" };
      }
      faviconUrl = data.fullPath;
    }
  } catch (error) {
    console.error("Image download failed", error);
  }

  const { error } = await supabase.from("bookmarks").insert([
    {
      id: newBookmarkId,
      title: linkInfo.title || new URL(url).origin,
      description: linkInfo.description || "",
      collection_id: collectionId,
      image_url: imageUrl || null,
      favicon_url: faviconUrl || null,
      read_at: null,
      site_url: url,
      user_id: user.data.user?.id,
    },
  ]);

  if (error) {
    console.error("Failed to create bookmark:", error);
    return { error: "Failed to create bookmark" };
  }
  return linkInfo;
}

export async function updateBookmarkReadStatus(input: {
  bookmarkId: string;
  readAt: string | null;
}) {
  const inputResult = updateBookmarkReadStatusSchema.safeParse({
    bookmarkId: input.bookmarkId,
    readAt: input.readAt,
  });

  if (!inputResult.success) {
    return { error: "Invalid input" };
  }

  const { bookmarkId, readAt } = input;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .update({ read_at: readAt })
    .eq("id", bookmarkId);
  if (error) {
    console.error("Failed to change read status:", error);
    throw new Error("Failed to change read status");
  }
  return data;
}

export async function fetchBookmarks(input: {
  collectionId: string;
  page: number;
  pageSize: number;
}) {
  const inputResult = fetchBookmarksSchema.safeParse({
    collectionId: input.collectionId,
    page: input.page,
    pageSize: input.pageSize,
  });

  if (!inputResult.success) {
    throw new Error("Invalid input");
  }

  const { collectionId, page, pageSize } = inputResult.data;

  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Failed to fetch user");
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("user_id", user.id)
    .eq("collection_id", collectionId)
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (error) {
    console.error("Failed to fetch bookmarks:", error);
    throw new Error("Failed to fetch bookmarks");
  }

  return data;
}
