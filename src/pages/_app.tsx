import "@/styles/globals.css";
import THEME from "@/themes/mui";
import { Alert, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import useMobileWidth from "@/hooks/useMobile";
import PageLayout from "@/components/layouts/PageLayout";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	const { isMobile } = useMobileWidth();

	return (
		<>
			<ThemeProvider theme={THEME}>
				<div className={inter.className}>
					<Navbar />
					{isMobile ? (
					<PageLayout>
						<h2 className="text-h2 bg-primary-error-light rounded-md p-4 text-primary-error-dark">
						Sorry, I am to lazy to make it for mobile! We support only desktop, if you would like to continue, switch to min 1024px screen.
						</h2>
					</PageLayout>
					) : (
						<main className="flex flex-col min-h-screen">
							<Component {...pageProps} />
						</main>
					)}
				</div>
			</ThemeProvider>
		</>
	);
}
