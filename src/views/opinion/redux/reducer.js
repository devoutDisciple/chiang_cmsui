import { addReduce } from '@store/redux/index';

const initState = {
	loading: false,
	data: {
		count: 0,
		list: [],
	},
	plateList: [], // 模块信息
	addressList: [], // 地址信息
	condition: { current: 1 }, // 查询条件
	topicList: [], // 话题查询条件
};

const feedback = (state = initState, action) => {
	switch (action.type) {
		case 'feedback/setLoading':
			return { ...state, loading: action.payload };
		case 'feedback/setTableData':
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

export default addReduce({ feedback });
