import { atomWithStorage } from "jotai/utils";

// Estado global reactivo con los datos de la sesión actual
// Es persistente mediante le localStorage
// Por defacto es nulo
export const sessionDataAtom
  = atomWithStorage("sessionData", null);
