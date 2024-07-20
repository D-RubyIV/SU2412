import { Province } from "./Province";

export interface District {
  Id: number;
  code: string;
  name: string;
  province: Province;
}
