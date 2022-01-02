import { addReduce } from '@store/redux/index';

const initState = {
	loading: false,
	data: {
		count: 0,
		list: [],
	},
	condition: { current: 1 },
	circles: [],
};

const content = (state = initState, action) => {
	switch (action.type) {
		case 'content/setLoading':
			return { ...state, loading: action.payload };
		case 'content/setAllCircle':
			return {
				...state,
				circles: action.payload,
			};
		case 'content/setTableData':
			return {
				...state,
				data: action.payload.result,
				condition: { ...state.condition, ...action.payload.condition },
			};
		case 'content/setPlateList':
			return {
				...state,
				plateList: action.payload,
			};
		case 'content/addressList':
			return {
				...state,
				addressList: action.payload,
			};
		default:
			break;
	}
	return state;
};

export default addReduce({ content });
