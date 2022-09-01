import React, { useContext } from 'react';

// exported to allmatches.js as Child component //
const MatchesPlayed = ({ played, handlePlayedChange }) => {
	return (
		<div className='absolute left-[21rem] top-[29rem] md:left-[25.5rem] md:top-96'>
			<label
				htmlFor='games'
				className='block mb-2 text-sm text-center font-medium text-gray-900 dark:text-gray-400 font-["Mukta"]'>
				Select an option
			</label>
			{/* Always use this for select/option for forms */}
			<select
				id='games'
				className='bg-blue-100 border w-36 md:w-48 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-["Mukta"]'
				value={played}
				onChange={handlePlayedChange}>
				<option value='select'>Choose an option</option>
				<option value='true'>Played</option>
				<option value='false'>Not Played</option>
			</select>
		</div>
	);
};

export default MatchesPlayed;
