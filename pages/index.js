import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { axiosInstance } from '../Utils/API';
import { TokenContext } from './_app';

export default function Home() {
	const [formData, setFormData] = useState({});
	const { setToken } = useContext(TokenContext);

	// use push to redirect to a new route //
	const router = useRouter();

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData((formData) => ({ ...formData, [id]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axiosInstance.post('matches', formData);
			localStorage.setItem('token', data.token);
			setToken(data.token);
			console.log('get token =>', data);

			router.push('/matches/allmatches');
		} catch (error) {
			console.log(error);
			localStorage.removeItem('token');
		}
	};
	console.log('get form data =>', formData);
	return (
		<div>
			<div className='grid h-screen md:place-items-center md:w-auto place-items-center w-[62.5rem]'>
				<form
					className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 w-96 font-["Mukta"]'
					onSubmit={handleSubmit}>
					<h2 className='text-center text-xl'>Login/Register</h2>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='username'>
							Username
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='username'
							type='text'
							value={formData.username || ''}
							onChange={handleInputChange}
						/>
					</div>
					<div className='mb-6'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='password'>
							Password
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
							id='password'
							type='password'
							value={formData.password || ''}
							onChange={handleInputChange}
						/>
					</div>
					<div className='flex w-screen'>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-80'
							type='submit'>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
