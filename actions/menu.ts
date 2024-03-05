"use server";

import { getMenuByRole } from "@/data/menu";
import { currentRole } from "@/lib/auth";
import { Menu } from "@prisma/client";

export const getMenu = async (): Promise<Menu | null> => {
  const role = await currentRole();
  if (!role) return null;
  return await getMenuByRole(role);
};
