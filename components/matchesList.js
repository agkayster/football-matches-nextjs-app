import React from 'react';
import Link from 'next/link';
import { FaFutbol } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

// exported to allmatches.js as Child component //
const MatchesList = ({ matchData, handleDelete }) => {
	return (
		<>
			<div className='grid md:grid-cols-4 grid-cols-2 gap-4 place-items-center border mt-10 font-["Mukta"] px-1'>
				{matchData &&
					matchData?.matches?.map(
						({
							_id: matchID,
							awayTeam,
							date,
							homeTeam,
							played,
							time,
							venue,
							year,
						}) => (
							<div
								key={matchID}
								className='max-w-sm rounded border overflow-hidden shadow-lg mb-4 w-full bg-white'>
								<div className='flex flex-row justify-evenly'>
									{played && (
										<FaFutbol className='mt-1 -ml-3' />
									)}
									<p>{homeTeam}</p>
									<p>vs</p>
									<p>{awayTeam}</p>
								</div>
								<div className='text-center'>
									<p>{date}</p>
									<p>{time}</p>
									<p>{year}</p>
									<p>{venue}</p>
								</div>
								<div className='float-right pr-2 mb-2 flex'>
									{/* The path name url is based on the folder structure */}
									<Link
										href={{
											pathname: '/matches/[matchID]',
											query: {
												matchID: matchID,
											},
										}}>
										<a>
											<FaEdit className='mr-3' />
										</a>
									</Link>
									<button
										onClick={() => handleDelete(matchID)}>
										<FaTrashAlt />
									</button>
								</div>
							</div>
						)
					)}
			</div>
		</>
	);
};

export default MatchesList;
