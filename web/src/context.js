import { atomWithStorage } from "jotai/utils";

export const sessionDataAtom
  = atomWithStorage("sessionData", null);
