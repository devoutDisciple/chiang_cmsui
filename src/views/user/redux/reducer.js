import { addReduce } from '@store/redux/index';

const initState = {
	loading: false,
	data: {
		count: 0,
		list: [],
	},
	condition: { current: 1 },
};

const member = (state = initState, action) => {
	switch (action.type) {
		case 'member/setTableData':
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

export default addReduce({ member });
