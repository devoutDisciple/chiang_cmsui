import { addReduce } from '@store/redux/index';

const initState = {
	loading: false,
	data: {
		count: 0,
		list: [],
	},
	condition: { current: 1 },
};

const swiper = (state = initState, action) => {
	switch (action.type) {
		case 'swiper/setLoading':
			return { ...state, loading: action.payload };
		case 'swiper/setTableData':
			return {
				...state,
				data: action.payload.result,
				condition: { ...state.condition, ...action.payload.condition },
			};

		default:
			break;
	}
	return state;
};

export default addReduce({ swiper });
