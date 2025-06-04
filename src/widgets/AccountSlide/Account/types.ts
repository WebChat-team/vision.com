import { UserDataSlice } from "@/app/store/slices/user/types";
import { FC } from "react";

type Account = FC<Readonly<UserDataSlice>>

export type { Account };