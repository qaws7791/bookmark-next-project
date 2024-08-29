"use server";
import { nanoid } from "nanoid";
import { createClient } from "../../supabase/server";
import { createCollectionSchema } from "./collections.schemas";

export async function createCollection(input: {
  name: string;
  description: string;
  colorCode: string;
}) {
  const inputResult = createCollectionSchema.safeParse({
    name: input.name,
    description: input.description,
    colorCode: input.colorCode,
  });

  if (!inputResult.success) {
    return { error: "Invalid input" };
  }

  const { name, description, colorCode } = inputResult.data;

  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Failed to get user:", userError);
    throw new Error("Failed to get user");
  }

  const { data, error } = await supabase.from("collections").insert([
    {
      id: nanoid(),
      user_id: user.id,
      name,
      description,
      color_code: colorCode,
    },
  ]);
  if (error) {
    console.error("Failed to create collection:", error);
    throw new Error("Failed to create collection");
  }
  return data;
}

export async function fetchCollections(userId: string) {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Failed to get user:", userError);
    throw new Error("Failed to get user");
  }

  if (user.id !== userId) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error("Failed to fetch collections:", error);
    throw new Error("Failed to fetch collections");
  }
  return data;
}

export async function fetchCollection(collectionId: string) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Failed to get user:", userError);
    throw new Error("Failed to get user");
  }

  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("user_id", user.id)
    .eq("id", collectionId)
    .single();
  if (error) {
    console.error("Failed to fetch collection:", error);
    throw new Error("Failed to fetch collection");
  }
  return data;
}
