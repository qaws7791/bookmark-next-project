"use server";
import { createClient } from "../../supabase/server";

export async function fetchProfile(userId: string) {
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
    .from("profiles")
    .select(`full_name, username, website, avatar_url`)
    .eq("id", userId)
    .single();

  if (error || !data) {
    throw new Error("Profile not found");
  }

  return data;
}
