import { District } from "./District";

export interface Ward {
  Id: number;
  code: string;
  name: string;
  district: District;
}
