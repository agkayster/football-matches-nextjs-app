import React, { memo } from 'react';

// exported to allmatches.js as Child component //
const MatchDetailsComponent = memo(
	({ matchDetailsArr, handleFieldChange, matchDetailsState }) => {
		return (
			<>
				<div className='checkbox-group px-6 md:px-10'>
					{matchDetailsArr &&
						matchDetailsArr.map(({ id, name }, index) => (
							<div key={id} className='flex checkbox'>
								<input
									type='checkbox'
									className='border-2 rounded-md pl-2 font-["Mukta"]'
									name={name}
									value={name}
									id={index}
									checked={matchDetailsState[index]}
									onChange={() => handleFieldChange(index)}
								/>
								<label className='block text-center ml-2 font-["Mukta"]'>
									{name}
								</label>
							</div>
						))}
				</div>
			</>
		);
	}
);

export default MatchDetailsComponent;
