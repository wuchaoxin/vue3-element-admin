export interface SettingState {
  fixedHeader: boolean;
  sidebarLogo: boolean;
  tagsView: boolean;
}

export interface SettingData {
  key: keyof SettingState;
  value: boolean;
}
