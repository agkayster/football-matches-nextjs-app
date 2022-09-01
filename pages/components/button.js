import React from 'react';
// exported to form.js as Child component //
const Button = () => {
	return (
		<>
			<div className='grid place-items-center mt-3'>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
					Submit
				</button>
			</div>
		</>
	);
};

export default Button;
