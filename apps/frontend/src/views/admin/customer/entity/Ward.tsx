import { District } from "./District";

export interface Ward {
  id: number;
  code: string;
  name: string;
  district: District;
}
