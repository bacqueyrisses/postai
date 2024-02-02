import { Favorite } from "@prisma/client";

export type Postcard = Omit<Favorite, "userId" | "createdAt">;
