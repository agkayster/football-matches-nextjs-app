import React, { useContext } from 'react';
import { MatchContext } from '../matches/[matchID]';
import Button from './button';

const SingleMatchForm = () => {
	const {
		homeTeam,
		formData,
		handleChange,
		awayTeam,
		time,
		venue,
		date,
		year,
		handleSubmit,
	} = useContext(MatchContext);
	return (
		<>
			<form className='font-["Mukta"]' onSubmit={handleSubmit}>
				<div className='w-screen grid grid-cols-3 md:flex md:justify-between px-3'>
					<div>
						<label className='block text-center'>Home Team</label>
						<input
							type='text'
							className='border-2 rounded-md pl-2'
							name='homeTeam'
							placeholder={homeTeam}
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
							placeholder={awayTeam}
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
							placeholder={time}
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
							placeholder={venue}
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
							placeholder={date}
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
							placeholder={year}
							value={formData.year || ''}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='md:flex md:items-center mt-5'>
					<label className='md:w-screen flex justify-center text-black font-bold'>
						<span className='text-sm mr-3 font-["Mukta"]'>
							Played
						</span>
						<input
							className='mr-2 leading-tight'
							type='checkbox'
							name='played'
							checked={formData.played}
							onChange={handleChange}
						/>
					</label>
				</div>
				<Button />
			</form>
		</>
	);
};

export default SingleMatchForm;
