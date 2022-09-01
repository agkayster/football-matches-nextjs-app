import React, { useContext } from 'react';
import { MatchesContext } from '../_app';

// exported to allmatches.js as Child component //
const TeamSearch = () => {
	const { searchInput, handleHomeTeamSearch, handleAwayTeamSearch } =
		useContext(MatchesContext);
	return (
		<div className='flex flex-row justify-center mt-10'>
			<div>
				<label className='block font-["Mukta"] text-center'>
					Home Team
				</label>
				<input
					type='text'
					className='border-2 rounded-md md:w-64 w-40 pl-2 mr-4 font-["Mukta"]'
					name='homeTeam'
					value={searchInput.homeTeam}
					onChange={handleHomeTeamSearch}
				/>
			</div>
			<div>
				<label className='block font-["Mukta"] text-center'>
					Away Team
				</label>
				<input
					type='text'
					className='border-2 rounded-md md:w-64 w-40 pl-2 font-["Mukta"]'
					name='awayTeam'
					value={searchInput.awayTeam}
					onChange={handleAwayTeamSearch}
				/>
			</div>
		</div>
	);
};

export default TeamSearch;
