import NextAuth from 'next-auth';
import Providers from 'next-auth/react';
import axios from 'axios';

export default NextAuth({
	providers: [],
	pages: {
		signIn: '/matches/allmatches',
	},
});
