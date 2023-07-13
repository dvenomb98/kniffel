import { createTheme } from "@mui/material";
const BREAKPOINTS = require("../config/breakpoints.js");

declare module "@mui/material/styles" {
	interface BreakpointOverrides {
		xs: false;
		sm: false;
		md: false;
		lg: false;
		xl: false;
		mobile: true;
		desktop: true;
	}
}

const THEME = createTheme({
	typography: {
		fontSize: 16,
		fontFamily: `"Inter", sans-serif`,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
	breakpoints: {
		values: {
			mobile: 0,
			desktop: BREAKPOINTS.LG.MIN,
		},
	},
	palette: {
		mode: "light",
		divider: "#6b7280",
		primary: {
			light: "#fef3c7",
			main: "#f59e0b",
			dark: "#d97706",
		},
		secondary: {
			light: "#f1f5f9",
			main: "#94a3b8",
			dark: "#475569",
		},
	},
});

export default THEME;
