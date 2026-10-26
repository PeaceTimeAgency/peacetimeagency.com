'use server';

import { cookies } from 'next/headers';
import { getCreatorsFromDb } from '@/lib/creators-db';
import { Creator } from '@/lib/creators';

const SESSION_COOKIE_NAME = 'pta_creator_session';

export async function signInAction(handle: string, password: string) {
  return {
    success: false,
    error: 'Creator accounts are not yet activated. Please check back soon.',
  };

  /*
  const creators = await getCreatorsFromDb();
  
  // Normalize handle (ensure it starts with @)
  const normalizedHandle = handle.startsWith('@') ? handle : `@${handle}`;
  
  const creator = creators.find(
    (c) => c.handle.toLowerCase() === normalizedHandle.toLowerCase() && c.password === password
  );

  if (!creator) {
    return { success: false, error: 'Invalid handle or password' };
  }

  // Set session cookie (HTTP-only)
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, creator.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  return { success: true, creatorId: creator.id };
    */
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return { success: true };
}

export async function getSession(): Promise<Creator | null> {
  return null;
}

import { updateCreatorInDb } from '@/lib/creators-db';

export async function updateCreatorAction(updatedCreator: Creator) {
  const session = await getSession();
  if (!session || session.id !== updatedCreator.id) {
    return { success: false, error: 'Unauthorized' };
  }

  // Protect sensitive fields from being updated via this action
  const { password, id, handle, ...safeData } = updatedCreator;
  const currentCreator = await getSession();
  
  if (!currentCreator) return { success: false, error: 'Unauthorized' };

  const finalUpdate = {
    ...currentCreator,
    ...safeData,
  };

  await updateCreatorInDb(finalUpdate);
  return { success: true, creator: finalUpdate };
}


 // Verification & Password Setup
 // Temporarily disabled until secure account activation is ready.

export async function requestVerificationAction(handle: string) {
  return {
    success: false,
    error: 'Creator account activation is not yet available. Please contact Peace Time Agency.',
  };
}

export async function verifyIdentityAction(handle: string, code: string) {
  return {
    success: false,
    error: 'Account verification is temporarily unavailable.',
  };
}

export async function resetPasswordAction(
  handle: string,
  code: string,
  newPassword: string
) {
  return {
    success: false,
    error: 'Password resets are temporarily unavailable.',
  };
}

