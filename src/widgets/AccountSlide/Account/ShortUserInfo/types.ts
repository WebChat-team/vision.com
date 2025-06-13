import type { UserDataSlice } from "@/app/store/slices/user/types";
import type { Dispatch, FC, SetStateAction } from "react";

type ShortUserInfo = FC<Readonly<UserDataSlice & { setSection: Dispatch<SetStateAction<any>>}>>

export type { ShortUserInfo };