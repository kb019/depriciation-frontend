import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface NavBarItem {
  name: string;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  path: string;
  subItems?: Omit<NavBarItem, "subItems">[];
}
