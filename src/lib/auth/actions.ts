"use server";

import { cookies, headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { guests } from "@/lib/db/schema/index";
import { and, eq, lt } from "drizzle-orm";
import { randomUUID } from "crypto";
import { signInSchema, signUpSchema } from "@/lib/validation/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const COOKIE_OPTIONS = {
  httpOnly: true as const,
  secure: true as const,
  sameSite: "strict" as const,
  path: "/" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export async function createGuestSession() {
  const cookieStore = await cookies();
  const existing = cookieStore.get("guest_session");
  if (existing?.value) {
    return { ok: true, sessionToken: existing.value };
  }

  const sessionToken = randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + COOKIE_OPTIONS.maxAge * 1000);

  await db.insert(guests).values({
    sessionToken,
    expiresAt,
  });

  cookieStore.set("guest_session", sessionToken, COOKIE_OPTIONS);
  return { ok: true, sessionToken };
}

export async function guestSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("guest_session")?.value;
  if (!token) {
    return { sessionToken: null };
  }

  const now = new Date();
  await db
    .delete(guests)
    .where(and(eq(guests.sessionToken, token), lt(guests.expiresAt, now)));

  return { sessionToken: token };
}

export async function signUp(formData: z.infer<typeof signUpSchema>) {
  try {
    const data = signUpSchema.parse(formData);

    const res = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });

    await migrateGuestToUser();
    return { ok: true, userId: res.user?.id };
  } catch (error) {
    return {
      ok: false,
      message: (error as Error).message || "Failed to create account",
    };
  }
}

export async function signIn(formData: z.infer<typeof signInSchema>) {
  try {
    const data = signInSchema.parse(formData);

    const res = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });

    await migrateGuestToUser();
    return { ok: true, userId: res.user?.id };
  } catch (error) {
    return {
      ok: false,
      message: (error as Error).message || "Invalid credentials",
    };
  }
}

export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user ?? null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function signOut() {
  await auth.api.signOut({ headers: {} });

  return { ok: true };
}

export async function mergeGuestCartWithUserCart() {
  await migrateGuestToUser();
  return { ok: true };
}

async function migrateGuestToUser() {
  const cookieStore = await cookies();
  const token = (await cookieStore).get("guest_session")?.value;
  if (!token) return;

  await db.delete(guests).where(eq(guests.sessionToken, token));
  (await cookieStore).delete("guest_session");
}
