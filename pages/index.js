export default function Home() {
	return (
		<div>
			<h1 className='text-3xl font-normal font-["Mukta"]'>Home Page</h1>
			<div className='grid h-screen place-items-center'>
				<form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 w-96 font-["Mukta"]'>
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
						/>
					</div>
					<div className='flex w-screen'>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-80'
							type='button'>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
