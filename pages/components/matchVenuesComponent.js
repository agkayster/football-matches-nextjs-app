import React, { useContext } from 'react';
import { MatchesContext } from '../matches/allmatches';

// exported to allmatches.js as Child component //
function MatchesVenues() {
	const { venues, handleVenueChange, venueName } = useContext(MatchesContext);
	return (
		<div className='grid grid-cols-6 gap-2 mt-10 pl-8'>
			{venues &&
				venues.map(({ id, venue }) => (
					<div key={id} className='flex'>
						<input
							type='radio'
							className='border-2 rounded-md pl-2 pt-2 font-["Mukta"]'
							value={venue}
							name={id}
							checked={venueName === venue}
							onChange={handleVenueChange}
						/>
						<label className='block font-["Mukta"] ml-2'>
							{venue}
						</label>
					</div>
				))}
		</div>
	);
}

export default MatchesVenues;
