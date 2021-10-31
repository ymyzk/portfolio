import { deepOrange, indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
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
});

export default theme;
