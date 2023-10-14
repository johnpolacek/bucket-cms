import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";

interface SessionUser {
  name: string;
  email?: string;
}

export const getSessionUser = async (): Promise<SessionUser | undefined> => {
  const user: User | null = await currentUser();

  if (!user) {
    return undefined;
  }

  let username = user.username;
  if (!username && user.firstName && user.lastName) {
    // If there is no username, but both first and last name are available, use them
    username = `${user.firstName} ${user.lastName}`;
  }

  return {
    name: username || "",
    email: user.primaryEmailAddressId || undefined,
  };
};
