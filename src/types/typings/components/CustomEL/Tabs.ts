import { TabNavProps, TabPaneProps } from "element-plus";

type TempTabPanesList = keyof TabPaneProps;
type TempTabPanes = {
  [k in TempTabPanesList]?: unknown;
};
export type TabPane = TempTabPanes;

type TempTabNavList = keyof TabNavProps;
type TempTabNav = {
  [k in TempTabNavList]?: unknown;
};
export interface TabsConfig extends TempTabNav {
  tabPanes: Array<TabPane>;
}
