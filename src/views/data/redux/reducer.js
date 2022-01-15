import { addReduce } from '@store/redux/index';

const initState = {
	statisticsData: {
		todayMoney: 0,
		todaySignup: 0,
		todayTeams: 0,
		todayUsers: 0,
		totalMoney: 0,
		totalSignup: 0,
		totalTeams: 0,
		totalUsers: 0,
	},
	userData: {},
	salesData: {},
	signupData: {},
	teamData: {},
};

const data = (state = initState, action) => {
	switch (action.type) {
		case 'data/setStatisticsData':
			return { ...state, statisticsData: action.payload };
		case 'data/setUserData':
			return { ...state, userData: action.payload };
		case 'data/setSalesData':
			return { ...state, salesData: action.payload };
		case 'data/setSignupData':
			return { ...state, signupData: action.payload };
		case 'data/setTeamData':
			return { ...state, teamData: action.payload };
		default:
			break;
	}
	return state;
};

export default addReduce({ data });
