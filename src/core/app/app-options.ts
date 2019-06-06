export interface AppOptions {
  width: number;
  height: number;
  background: string;

  fps: number;
}

export const DEFAULT_APP_OPTIONS: AppOptions = {
  width: 800,
  height: 800,
  background: '#ccc',

  fps: 30
};
