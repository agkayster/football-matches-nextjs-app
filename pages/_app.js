import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// we create our context API in App.js and wrap our App.js with it //
export const TokenContext = createContext();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const [token, setToken] = useState('');

	// we get our token from localStorage inside useEffect hook and set it to token using setToken //
	useEffect(() => {
		const getToken =
			typeof window !== 'undefined'
				? localStorage.getItem('token')
				: null;
		setToken(getToken);
	}, []);

	// we pass token and setToken into context API Provider, we can then call this from anywhere in the App //
	return (
		<TokenContext.Provider value={{ token, setToken }}>
			<Navbar />
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</TokenContext.Provider>
	);
}

export default MyApp;
