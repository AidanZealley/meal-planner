"use client";

import { api } from "@/trpc/react";

export const UserProfile = () => {
  const [user] = api.users.getCurrentUser.useSuspenseQuery();

  return (
    <div>
      <h3>{user?.name}</h3>
      <p>{user?.email}</p>
    </div>
  );
};
