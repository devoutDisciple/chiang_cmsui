import { createStore, combineReducers, applyMiddleware } from 'redux';
import middlewares from '../middlewares/index';
import rootReducer from '../global/reducer';

const dynamicReducers = {};
const store = createStore(combineReducers({ ...rootReducer }), applyMiddleware(...middlewares));

export const addReduce = (reducer) => {
	if (Object.prototype.toString.call(reducer) !== '[object Object]') throw new Error('reducer must be object.');
	Object.keys(reducer).forEach((key) => {
		if (dynamicReducers[key]) {
			throw new Error(`reducer ${key} is existed.`);
		}
	});
	Object.assign(dynamicReducers, reducer);
	store.replaceReducer(combineReducers({ ...rootReducer, ...dynamicReducers }));
};

export default store;
