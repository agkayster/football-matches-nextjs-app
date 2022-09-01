import React, { useContext } from 'react';
import { MatchContext } from '../matches/[matchID]';
import Button from './button';

const SingleMatchForm = ({
	handleSingleMatchSubmit,
	homeTeam,
	singleMatchFormData,
	handleSingleMatchChange,
	awayTeam,
	time,
	venue,
	date,
	year,
}) => {
	// const {
	// 	handleSingleMatchSubmit,
	// 	homeTeam,
	// 	singleMatchFormData,
	// 	handleSingleMatchChange,
	// 	awayTeam,
	// 	time,
	// 	venue,
	// 	date,
	// 	year,
	// 	matchID,
	// 	idMatch,
	// } = useContext(MatchContext);
	return (
		<>
			<form className='font-["Mukta"]' onSubmit={handleSingleMatchSubmit}>
				<div className='w-screen grid grid-cols-3 md:flex md:justify-between px-3'>
					<div>
						<label className='block text-center'>Home Team</label>
						<input
							type='text'
							className='border-2 rounded-md pl-2'
							name='homeTeam'
							placeholder={homeTeam}
							value={singleMatchFormData.homeTeam || ''}
							onChange={handleSingleMatchChange}
						/>
					</div>
					<div className='ml-3'>
						<label className='block text-center'>Away Team</label>
						<input
							type='text'
							className='border-2 rounded-md pl-2'
							name='awayTeam'
							placeholder={awayTeam}
							value={singleMatchFormData.awayTeam || ''}
							onChange={handleSingleMatchChange}
						/>
					</div>
					<div className='ml-3'>
						<label className='block text-center'>Time</label>
						<input
							type='text'
							className='border-2 rounded-md pl-2'
							name='time'
							placeholder={time}
							value={singleMatchFormData.time || ''}
							onChange={handleSingleMatchChange}
						/>
					</div>
					<div className='ml-3'>
						<label className='block text-center'>Venue</label>
						<input
							type='text'
							className='border-2 rounded-md pl-2'
							name='venue'
							placeholder={venue}
							value={singleMatchFormData.venue || ''}
							onChange={handleSingleMatchChange}
						/>
					</div>
					<div className='ml-3'>
						<label className='block text-center'>Date</label>
						<input
							type='text'
							className='border-2 rounded-md pl-2'
							name='date'
							placeholder={date}
							value={singleMatchFormData.date || ''}
							onChange={handleSingleMatchChange}
						/>
					</div>
					<div className='ml-3'>
						<label className='block text-center'>Year</label>
						<input
							type='text'
							className='border-2 rounded-md pl-2'
							name='year'
							placeholder={year}
							value={singleMatchFormData.year || ''}
							onChange={handleSingleMatchChange}
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
							checked={singleMatchFormData.played}
							onChange={handleSingleMatchChange}
						/>
					</label>
				</div>
				<Button />
			</form>
		</>
	);
};

export default SingleMatchForm;
