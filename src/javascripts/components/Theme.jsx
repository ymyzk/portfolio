import Colors from '../../../node_modules/material-ui/lib/styles/colors';
import Spacing from '../../../node_modules/material-ui/lib/styles/spacing';
import zIndex from '../../../node_modules/material-ui/lib/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: "Roboto, sans-serif",
  palette: {
    // TODO: define some colors
    primary1Color: Colors.indigo500,
    primary2Color: Colors.indigo700,
    primary3Color: Colors.indigo100,
    accent1Color: Colors.deepOrange500,
    // accent2Color: Colors.grey100,
    // accent3Color: Colors.grey500,
    textColor: Colors.gray900,
    alternateTextColor: Colors.gray600,
    // canvasColor: "#303030",
    borderColor: Colors.grey500,
    // disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    // pickerHeaderColor: Colors.cyan500
  }
};
