/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from "jss";
import { createMuiTheme, createGenerateClassName } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import indigo from "@material-ui/core/colors/indigo";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
    },
    secondary: {
      light: deepOrange[300],
      main: deepOrange[500],
      dark: deepOrange[700],
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
    ],
  },
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
