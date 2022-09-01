import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../Utils/API';
import { useRouter } from 'next/router';
import MatchesList from '../../components/matchesList';
import Form from '../../components/form';
import TeamSearch from '../../components/teamSearchComponent';
import MatchDetailsComponent from '../../components/matchDetailsComponent';
import MatchesVenues from '../../components/matchVenuesComponent';
import TeamSort from '../../components/teamSortComponent';
import MatchesPlayed from '../../components/matchesPlayedComponent';

function Matches() {
	const initialValues = {
		homeTeam: '',
		awayTeam: '',
	};
	const matchDetailsArr = [
		{ id: 'homeTeam', name: 'Home Team' },
		{ id: 'awayTeam', name: 'Away Team' },
		{ id: 'time', name: 'Time' },
		{ id: 'venue', name: 'Venue' },
		{ id: 'date', name: 'Date' },
		{ id: 'year', name: 'Year' },
	];
	const [formData, setFormData] = useState({});
	const [searchInput, setSearchInput] = useState(initialValues);
	const [matchData, setMatchData] = useState([]);
	const [played, setPlayed] = useState('select');
	const [venueName, setVenueName] = useState('');
	const [venues, setVenues] = useState([]);
	const [sortTerm, setSortTerm] = useState('select');
	const [token, setToken] = useState('');
	const [teams, setTeams] = useState('');
	const [matchDetailsState, setMatchDetailsState] = useState(
		new Array(matchDetailsArr.length).fill(false)
	);
	const router = useRouter();

	useEffect(() => {
		/* checks for token availability */
		const token =
			typeof window !== undefined ? localStorage.getItem('token') : null;
		setToken(token);

		/* loads all matches when component mounts */
		const getMatchesData = async () => {
			// console.log('get token =>', token);
			const res = await axiosInstance.get(`matches/allmatches`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = res.data;
			console.log('get another data =>', data);
			setMatchData(data);

			/* Gets match venues */
			const getVenues = data?.matches?.map(({ venue, _id: matchID }) => ({
				id: matchID,
				venue: venue,
			}));
			setVenues([{ id: 1, venue: 'All' }, ...getVenues]);

			/* Gets all teams */
			const getTeams = data?.matches?.map(
				({ homeTeam, _id: matchID, awayTeam }) => ({
					id: matchID,
					homeTeam: homeTeam,
					awayTeam: awayTeam,
				})
			);
			setTeams(getTeams);
		};
		getMatchesData();
	}, []);

	// Create a match //
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			/* we send in formData which is an object into the data (array of objects) via POST request */
			await axiosInstance
				.post('matches/allmatches', formData)
				.then((res) => console.log('get res data =>', res.data));
			setFormData({});

			/* Use to automatically refresh the page to load changes */
			router.reload(window.location.pathname);
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		/* setFormData methond below allows us to get the previous value in the form data object plus the incoming values */
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	// Delete a match //
	const handleDelete = async (id) => {
		console.log('get match id =>', id);
		try {
			await axiosInstance
				// This url pattern needs to be changed to standard pattern of allmatches/id //
				.delete(`matches/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(() => router.reload(window.location.pathname));
		} catch (error) {
			console.log(error);
		}
	};

	// Search for Home team using search input //
	const handleHomeTeamSearch = async (e) => {
		const { name, value } = e.target;
		setSearchInput({ ...searchInput, [name]: value });
		try {
			if (value.length > 0) {
				return await axiosInstance
					.get(
						`matches/allmatches?homeTeam=${searchInput.homeTeam}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					)
					.then((res) => setMatchData(res.data));
			} else {
				return await axiosInstance
					.get(`matches/allmatches`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => setMatchData(res.data));
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Search for Away team using search input //
	const handleAwayTeamSearch = async (e) => {
		const { name, value } = e.target;
		setSearchInput({ ...searchInput, [name]: value });
		try {
			if (value.length > 0) {
				return await axiosInstance
					.get(
						`matches/allmatches?awayTeam=${searchInput.awayTeam}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					)
					.then((res) => setMatchData(res.data));
			} else {
				return await axiosInstance
					.get(`matches/allmatches`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => setMatchData(res.data));
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Filter for matches that have been played //
	const handlePlayedChange = async (e) => {
		const { value } = e.target;
		setPlayed(value);
		try {
			if (value === 'true') {
				await axiosInstance
					.get(`matches/allmatches?played=${value}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => setMatchData(res.data));
			} else if (value === 'false') {
				await axiosInstance
					.get(`matches/allmatches?played=${value}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => setMatchData(res.data));
			} else {
				await axiosInstance
					.get(`matches/allmatches`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => setMatchData(res.data));
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Filter for venues //
	const handleVenueChange = async (e) => {
		const { value } = e.target;
		setVenueName(value);
		try {
			if (value === 'All') {
				return await axiosInstance
					.get(`matches/allmatches`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => setMatchData(res.data));
			} else {
				return await axiosInstance
					.get(`matches/allmatches?venue=${value}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => setMatchData(res.data));
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Sort teams either Home or Away in alphabetical order //
	const handleSortChange = async (e) => {
		const { value } = e.target;
		setSortTerm(value);
		switch (value) {
			case 'homeTeam':
				await axiosInstance
					.get(`matches/allmatches?sort=${value}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => setMatchData(res.data));
				break;
			case '-homeTeam':
				await axiosInstance
					.get(`matches/allmatches?sort=${-value}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => setMatchData(res.data));
				break;
			case 'awayTeam':
				await axiosInstance
					.get(`matches/allmatches?sort=${value}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => setMatchData(res.data));
				break;
			case '-awayTeam':
				await axiosInstance
					.get(`matches/allmatches?sort=${-value}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => setMatchData(res.data));
				break;
			default:
				await axiosInstance
					.get(`matches/allmatches`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => setMatchData(res.data));
		}
	};

	// Implement fields //
	const handleFieldChange = async (position) => {
		try {
			let newArr = [];
			const updatedMatchState = matchDetailsState.map((item, index) =>
				index === position ? !item : item
			);
			setMatchDetailsState(updatedMatchState);

			updatedMatchState.filter((currentstate, index) => {
				if (currentstate === true) {
					return newArr.push(matchDetailsArr[index].id);
				}
			});

			const joinedArr = newArr.join(',');
			await axiosInstance
				.get(`matches/allmatches?fields=${joinedArr}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => setMatchData(res.data));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='container mx-auto px-0 mt-0 md:h-auto md:w-auto h-[112.5rem] bg-[#f2f4f8] w-[62.5rem]'>
			<Form
				formData={formData}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
			/>
			<TeamSearch
				searchInput={searchInput}
				handleHomeTeamSearch={handleHomeTeamSearch}
				handleAwayTeamSearch={handleAwayTeamSearch}
			/>

			<MatchDetailsComponent
				matchDetailsArr={matchDetailsArr}
				handleFieldChange={handleFieldChange}
				matchDetailsState={matchDetailsState}
			/>
			<MatchesVenues
				venues={venues}
				handleVenueChange={handleVenueChange}
				venueName={venueName}
			/>
			<MatchesPlayed
				played={played}
				handlePlayedChange={handlePlayedChange}
			/>
			<TeamSort sortTerm={sortTerm} handleSortChange={handleSortChange} />
			<MatchesList matchData={matchData} handleDelete={handleDelete} />
		</div>
	);
}
export default Matches;
