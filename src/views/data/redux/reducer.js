import { addReduce } from '@store/redux/index';

const initState = {
	totalData: {},
	userData: {},
	publishData: {},
	goodsData: {},
	commentsData: {},
};

const data = (state = initState, action) => {
	switch (action.type) {
		case 'data/setTotalData':
			return { ...state, totalData: action.payload };
		case 'data/setUserData':
			return { ...state, userData: action.payload };
		case 'data/setPublishData':
			return { ...state, publishData: action.payload };
		case 'data/setGoodsData':
			return { ...state, goodsData: action.payload };
		case 'data/setCommnetsData':
			return { ...state, commentsData: action.payload };
		default:
			break;
	}
	return state;
};

export default addReduce({ data });
