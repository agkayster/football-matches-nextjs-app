import React, { useState, useContext } from 'react';
import { TokenContext } from '../pages/_app';
import { useRouter } from 'next/router';

function MobileNav({ open, setOpen, token, setToken }) {
	const router = useRouter();

	const logout = () => {
		setTimeout(() => {
			setOpen(!open);
		}, 100);
		// removes token from localStorage //
		localStorage.removeItem('token');
		// sets our token in state to null to remove token set in login code in index.js //
		setToken(null);
		// routes us back to login page //
		router.push('/matches');
	};
	return (
		<div
			className={`absolute top-0 left-0 h-screen z-50 w-[62.5rem] bg-white transform ${
				open ? '-translate-x-0' : '-translate-x-full'
			} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
			<div className='flex items-center justify-center filter drop-shadow-md bg-white h-20'>
				{' '}
				{/*logo container*/}
				<a className='text-xl font-semibold' href='/matches'>
					MatchesApp
				</a>
			</div>
			<div className='flex flex-col ml-4'>
				{token && (
					<button
						className='text-xl font-medium my-4'
						onClick={logout}>
						Sign Out
					</button>
				)}
			</div>
		</div>
	);
}

export default function Navbar() {
	// destructure token and setToken from our context API //
	const { token, setToken } = useContext(TokenContext);
	const [open, setOpen] = useState(false);

	// router to route to a different page/route //
	const router = useRouter();

	const logout = () => {
		// removes token from localStorage //
		localStorage.removeItem('token');
		// sets our token in state to null to remove token set in login code in index.js //
		setToken(null);
		// routes us back to login page //
		router.push('/matches');
	};

	return (
		<nav className='flex md:filter bg-white px-4 py-4 h-15 md:w-auto md:items-center w-[62.5rem]'>
			<MobileNav
				open={open}
				setOpen={setOpen}
				logout={logout}
				token={token}
				setToken={setToken}
			/>
			<div className='w-3/12 flex items-center'>
				<a className='text-2xl font-semibold' href='/matches'>
					MatchesApp
				</a>
			</div>
			<div className='w-9/12 flex justify-end items-center'>
				<div
					className='z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden'
					onClick={() => {
						setOpen(!open);
					}}>
					{/* hamburger button */}
					<span
						className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
							open ? 'rotate-45 translate-y-3.5' : ''
						}`}
					/>
					<span
						className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${
							open ? 'w-0' : 'w-full'
						}`}
					/>
					<span
						className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
							open ? '-rotate-45 -translate-y-3.5' : ''
						}`}
					/>
				</div>
				{/* always use button instead of link, anchor tag or navlink */}
				{token && (
					<div className='hidden md:flex'>
						<button onClick={logout}>Sign Out</button>
					</div>
				)}
			</div>
		</nav>
	);
}
