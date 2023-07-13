import "@/styles/globals.css";
import THEME from "@/themes/mui";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { Inter } from "next/font/google";
import Navbar from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<ThemeProvider theme={THEME}>
				<SnackbarProvider maxSnack={2} autoHideDuration={3000}>
					<div className={inter.className}>
						<Navbar />
						<main className="flex flex-col min-h-screen">
							<Component {...pageProps} />
						</main>
					</div>
				</SnackbarProvider>
			</ThemeProvider>
		</>
	);
}
