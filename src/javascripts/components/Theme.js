import { colors } from "material-ui/styles";
import spacing from "material-ui/styles/spacing";
import zIndex from "material-ui/styles/zIndex";

export default {
  spacing,
  zIndex,
  // See also: src/stylesheets/index.scss
  fontFamily: "Roboto, source-han-sans-japanese, \"Noto Sans Japanese\", sans-serif",
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
