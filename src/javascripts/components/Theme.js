import { colors } from "material-ui/styles";
import spacing from "material-ui/styles/spacing";
import zIndex from "material-ui/styles/zIndex";

export default {
  spacing,
  zIndex,
  // See also: src/stylesheets/index.scss
  fontFamily: [
    "Roboto",
    "Noto Sans Japanese", "Noto Sans CJK JP",
    "源ノ角ゴシック", "Source Han Sans",
    "Hiragino Sans",
    "游ゴシック", "YuGothic",
    "Hiragino Kaku Gothic ProN",
    "メイリオ", "Meiryo", "sans-serif"
  ].map(f => `"${f}"`).join(", "),
  palette: {
    // TODO: define some colors
    primary1Color: colors.indigo500,
    primary2Color: colors.indigo700,
    primary3Color: colors.indigo100,
    accent1Color: colors.deepOrange500,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey500
    // disabledColor: ColorManipulator.fade(colors.darkBlack, 0.3),
    // pickerHeaderColor: colors.cyan500
    // clockCircleColor
    // shadowColor
  }
};
