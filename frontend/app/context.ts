import { createContext } from "react-router";
import type { UserPublic } from "./client";

export const userContext = createContext<UserPublic | null>(null);
