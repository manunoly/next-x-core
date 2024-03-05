import { db } from "@/lib/db";
import { Menu } from "@prisma/client";

export const getMenuByRole = async (role: string): Promise<Menu | null> => {
  try {
    return await db.menu.findFirst({
      where: {
        role,
      },
    });
  } catch {
    return null;
  }
};
