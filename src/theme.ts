import { deepOrange, indigo } from "@mui/material/colors";
import { adaptV4Theme, createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme(adaptV4Theme({
  palette: {
    primary: indigo,
    secondary: deepOrange,
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
}));

export default theme;
