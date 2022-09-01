import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Navbar from './components/Navbar';
import { axiosInstance } from '../Utils/API';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// we create our context API in App.js and wrap our App.js with it //
export const TokenContext = createContext();
// we create context API for all our matches //
export const MatchesContext = createContext();
// create context API for a single match view/edit //
export const MatchContext = createContext();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
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
	const [played, setPlayed] = useState('select');
	const [venueName, setVenueName] = useState('');
	const [sortTerm, setSortTerm] = useState('select');
	const [matchDetailsState, setMatchDetailsState] = useState(
		new Array(matchDetailsArr.length).fill(false)
	);
	const router = useRouter();
	const [token, setToken] = useState('');
	const [matchData, setMatchData] = useState([]);
	const [venues, setVenues] = useState([]);
	const [teams, setTeams] = useState('');

	// const [singleMatchFormData, setsingleMatchFormData] = useState({
	// 	played: false,
	// });
	// const [singleMatchData, setSingleMatchData] = useState({});
	// const [homeTeam, setHomeTeam] = useState('');
	// const [awayTeam, setAwayTeam] = useState('');
	// const [time, setTime] = useState('');
	// const [venue, setVenue] = useState('');
	// const [date, setDate] = useState('');
	// const [year, setYear] = useState('');
	// const [idMatch, setIdMatch] = useState('');

	useEffect(() => {
		/* checks for token availability */
		const token =
			typeof window !== undefined ? localStorage.getItem('token') : null;
		setToken(token);

		console.log('get match token =>', token);

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

	// we get our token from localStorage inside useEffect hook and set it to token using setToken //
	useEffect(() => {
		const getToken =
			typeof window !== 'undefined'
				? localStorage.getItem('token')
				: null;
		setToken(getToken);
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

	// used router.query.matchID to get the particular match ID for [matchID].js //
	// const { matchID } = router.query;

	// // use push to redirect to a new route //
	// const { push } = useRouter();

	// useEffect(() => {
	// 	/* check whether token is available in localStorage */
	// 	const token =
	// 		window !== undefined ? localStorage.getItem('token') : null;
	// 	setToken(token);

	// 	/* Get single match using ID */
	// 	async function getMatchItem() {
	// 		try {
	// 			const { data } = await axiosInstance.get(`matches/${matchID}`, {
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			});
	// 			setSingleMatchData(data);
	// 			setHomeTeam(data?.match?.homeTeam);
	// 			setAwayTeam(data?.match?.awayTeam);
	// 			setTime(data?.match?.time);
	// 			setVenue(data?.match?.venue);
	// 			setDate(data?.match?.date);
	// 			setYear(data?.match?.year);
	// 			setIdMatch(data?.match?._id);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	getMatchItem();
	// }, [matchID]);

	// // we get matchID from router query above //
	// const handleSingleMatchSubmit = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		// we pass the match ID into here and the url is based on the folder structure //
	// 		await axiosInstance
	// 			.patch(`matches/${matchID}`, formData, {
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			})
	// 			.then((res) => console.log('get res data =>', res.data));
	// 		push('/matches/allmatches');
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const handleSingleMatchChange = (e) => {
	// 	// const { name, value } = e.target;
	// 	const target = e.target;
	// 	const name = target.name;
	// 	const value =
	// 		target.type === 'checkbox' ? target.checked : target.value;
	// 	setsingleMatchFormData((formData) => ({ ...formData, [name]: value }));
	// };

	// we pass token and setToken into context API Provider, we can then call this from anywhere in the App //
	return (
		<TokenContext.Provider value={{ token, setToken }}>
			<Navbar />
			{/* <MatchContext.Provider
				value={{
					handleSingleMatchSubmit,
					homeTeam,
					singleMatchFormData,
					handleSingleMatchChange,
					awayTeam,
					time,
					venue,
					date,
					year,
					matchID,
					idMatch,
				}}> */}
			<MatchesContext.Provider
				value={{
					matchData,
					setMatchData,
					venues,
					setVenues,
					teams,
					setTeams,
					handleSubmit,
					formData,
					handleChange,
					searchInput,
					handleHomeTeamSearch,
					handleAwayTeamSearch,
					matchDetailsArr,
					handleFieldChange,
					matchDetailsState,
					handleVenueChange,
					venueName,
					played,
					handlePlayedChange,
					sortTerm,
					handleSortChange,
					handleDelete,
				}}>
				<SessionProvider session={session}>
					<Component {...pageProps} />
				</SessionProvider>
			</MatchesContext.Provider>
			{/* </MatchContext.Provider> */}
		</TokenContext.Provider>
	);
}

export default MyApp;
