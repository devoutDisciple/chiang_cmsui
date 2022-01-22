import { addReduce } from '@store/redux/index';

const initState = {
	loading: false,
	data: {
		count: 0,
		list: [],
	},
	condition: { current: 1 },
	circles: [],
	projectList: [],
};

const subject = (state = initState, action) => {
	switch (action.type) {
		case 'subject/setLoading':
			return { ...state, loading: action.payload };
		case 'subject/setAllCircle':
			return {
				...state,
				circles: action.payload,
			};
		case 'subject/setTableData':
			return {
				...state,
				data: action.payload.result,
				condition: { ...state.condition, ...action.payload.condition },
			};
		case 'subject/setPorjectList':
			return {
				...state,
				projectList: action.payload,
			};
		case 'subject/addressList':
			return {
				...state,
				addressList: action.payload,
			};
		default:
			break;
	}
	return state;
};

export default addReduce({ subject });
