import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const UserAtom = atom({
  key: "userAtom",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
