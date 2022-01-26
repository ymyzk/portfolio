import { PaletteMode } from "@mui/material";
import { blue, deepOrange, indigo } from "@mui/material/colors";
import { ThemeOptions } from "@mui/material/styles";

export const lightPrimaryMain = indigo[500];

// Create a theme instance based on the design palette
export function getDesignTokens(mode: PaletteMode): ThemeOptions {
  return {
    palette: {
      mode,
      primary: {
        main: (mode === "light") ? lightPrimaryMain : blue.A400,
      },
      secondary: {
        main: deepOrange[500],
      },
    },
    typography: {
      fontFamily: [
        "Roboto",
        "Noto Sans Japanese",
        "Noto Sans CJK JP",
        "源ノ角ゴシック",
        "Source Han Sans",
        "Hiragino Sans",
        "Hiragino Kaku Gothic ProN",
        "游ゴシック", "YuGothic",
        "メイリオ", "Meiryo",
        "sans-serif",
      ].join(","),
    },
  };
}
