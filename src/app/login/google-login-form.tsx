"use client";
import { createClient } from "../../../supabase/client";

export default function GoogleLoginForm() {
  const supabase = createClient();

  return (
    <div className="w-40 h-40">
      <button
        onClick={() => {
          void supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: "http://localhost:3000/auth/callback",
            },
          });
        }}
      >
        구글 로그인
      </button>
    </div>
  );
}
