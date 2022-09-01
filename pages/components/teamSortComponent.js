import React, { useContext } from 'react';

// exported to allmatches.js as Child component //
export default function TeamSort({ sortTerm, handleSortChange }) {
	return (
		<div className='absolute left-[32.5rem] top-[29rem] md:left-[43rem] md:top-96'>
			<label
				htmlFor='games'
				className='block mb-2 text-sm font-medium text-center text-gray-900 dark:text-gray-400 font-["Mukta"]'>
				Select an option
			</label>
			<select
				id='games'
				className='bg-blue-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 md:w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-["Mukta"]'
				value={sortTerm}
				onChange={handleSortChange}>
				<option value='select'>Choose an option</option>
				<option value='homeTeam'>Home-Team A-Z</option>
				<option value='-homeTeam'>Home-Team Z-A</option>
				<option value='awayTeam'>Away-Team A-Z</option>
				<option value='-awayTeam'>Away-Team Z-A</option>
			</select>
		</div>
	);
}
