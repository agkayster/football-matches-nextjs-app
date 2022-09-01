// import axios from 'axios';
import { axiosInstance } from '../../Utils/API';
import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import SingleMatchForm from '../components/singleMatchForm';

export const MatchContext = createContext();

const Match = () => {
	const [formData, setFormData] = useState({ played: false });
	const [token, setToken] = useState('');
	const [singleMatchData, setSingleMatchData] = useState({});
	const [homeTeam, setHomeTeam] = useState('');
	const [awayTeam, setAwayTeam] = useState('');
	const [time, setTime] = useState('');
	const [venue, setVenue] = useState('');
	const [date, setDate] = useState('');
	const [year, setYear] = useState('');
	const [idMatch, setIdMatch] = useState('');

	// used router.query.matchID to get the particular match ID for [matchID].js //
	const router = useRouter();
	const { matchID } = router.query;
	// console.log('get query id =>', matchID);

	// use push to redirect to a new route //
	const { push } = useRouter();

	useEffect(() => {
		/* check whether token is available in localStorage */
		const token =
			window !== undefined ? localStorage.getItem('token') : null;
		setToken(token);

		/* Get single match using ID */
		async function getMatchItem() {
			try {
				const { data } = await axiosInstance.get(`matches/${matchID}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setSingleMatchData(data);
				setHomeTeam(data?.match?.homeTeam);
				setAwayTeam(data?.match?.awayTeam);
				setTime(data?.match?.time);
				setVenue(data?.match?.venue);
				setDate(data?.match?.date);
				setYear(data?.match?.year);
				setIdMatch(data?.match?._id);
			} catch (error) {
				console.log(error);
			}
		}
		getMatchItem();
	}, [matchID]);

	// we get matchID from router query above //
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// we pass the match ID into here and the url is based on the folder structure //
			await axiosInstance
				.patch(`matches/${matchID}`, formData, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => console.log('get res data =>', res.data));
			push('/matches/allmatches');
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		// const { name, value } = e.target;
		const target = e.target;
		const name = target.name;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	return (
		<div className='container mx-auto px-0 bg-[#f2f4f8] h-screen'>
			<h1 className='font-["Mukta"] text-center pt-5'>
				MATCH ID: {idMatch}
			</h1>
			<MatchContext.Provider
				value={{
					handleSubmit,
					homeTeam,
					formData,
					handleChange,
					awayTeam,
					time,
					venue,
					date,
					year,
				}}>
				<SingleMatchForm />
			</MatchContext.Provider>
		</div>
	);
};

export default Match;
