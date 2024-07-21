import { Province } from "./Province";

export interface District {
  id: number;
  code: string;
  name: string;
  province: Province;
}
