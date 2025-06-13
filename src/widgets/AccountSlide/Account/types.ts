import type { UserDataSlice } from "@/app/store/slices/user/types";
import type { FC } from "react";

type UserAccount = FC<Readonly<UserDataSlice>>

export type { UserAccount };