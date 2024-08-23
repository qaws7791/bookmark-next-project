import { type NextRequest } from "next/server";
import { updateSession } from "../supabase/middleware";

export async function middleware(request: NextRequest) {
  // update user's auth session
  return await updateSession(request);
}

export const config = {
  matcher: [
    // eslint-disable-next-line unicorn/prefer-string-raw
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
