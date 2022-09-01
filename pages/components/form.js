import React, { useContext } from 'react';
import Button from './button';
import { MatchesContext } from '../matches/allmatches';

// exported to allmatches.js as Child component //
function Form() {
	const { formData, handleSubmit, handleChange } = useContext(MatchesContext);
	return (
		<>
			<h1 className='text-center font-["Mukta"] text-2xl pt-3'>
				Create a match
			</h1>
			<form className='font-["Mukta"]' onSubmit={handleSubmit}>
				<div className='w-screen grid grid-cols-3 gap-4 ml-44 md:ml-0 md:flex md:justify-between px-3 pt-5'>
					<div>
						<label className='block text-center'>Home Team</label>
						<input
							type='text'
							className='border-2 rounded-md pl-2'
							name='homeTeam'
							value={formData.homeTeam || ''}
							onChange={handleChange}
						/>
					</div>
					<div className='ml-3'>
						<label className='block text-center'>Away Team</label>
						<input
							type='text'
							className='border-2 rounded-md pl-2'
							name='awayTeam'
							value={formData.awayTeam || ''}
							onChange={handleChange}
						/>
					</div>
					<div className='ml-3'>
						<label className='block text-center'>Time</label>
						<input
							type='text'
							className='border-2 rounded-md pl-2'
							name='time'
							value={formData.time || ''}
							onChange={handleChange}
						/>
					</div>
					<div className='ml-3'>
						<label className='block text-center'>Venue</label>
						<input
							type='text'
							className='border-2 rounded-md pl-2'
							name='venue'
							value={formData.venue || ''}
							onChange={handleChange}
						/>
					</div>
					<div className='ml-3'>
						<label className='block text-center'>Date</label>
						<input
							type='text'
							className='border-2 rounded-md pl-2'
							name='date'
							value={formData.date || ''}
							onChange={handleChange}
						/>
					</div>
					<div className='ml-3'>
						<label className='block text-center'>Year</label>
						<input
							type='text'
							className='border-2 rounded-md pl-2'
							name='year'
							value={formData.year || ''}
							onChange={handleChange}
						/>
					</div>
				</div>
				<Button />
			</form>
			<hr className='mt-4' />
		</>
	);
}

export default Form;
