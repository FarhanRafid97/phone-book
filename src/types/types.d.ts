import { IThemes } from './Themes';

type ThemeConfig = typeof themeConfig;
declare module '@emotion/react' {
  export interface Theme extends IThemes {}
}
