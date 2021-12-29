export type Device = "desktop" | "mobile";

export interface AppState {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  device: Device;
}
