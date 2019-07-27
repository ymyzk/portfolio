import deepOrange from "@material-ui/core/colors/deepOrange";
import indigo from "@material-ui/core/colors/indigo";
import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
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
});

export default theme;
