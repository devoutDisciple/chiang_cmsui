export const typeList = [
	{ id: 1, name: '全日制集训' },
	{ id: 2, name: '寄宿Space' },
	{ id: 3, name: '法硕' },
	{ id: 4, name: '管综' },
];

export const englishList = [
	{ id: 1, name: '英语一' },
	{ id: 2, name: '英语二' },
	{ id: 3, name: '英语三' },
];

export const mathList = [
	{ id: 1, name: '数学一' },
	{ id: 2, name: '数学二' },
	{ id: 3, name: '数学三' },
];

export const filterEnglish = (id) => {
	const selectList = englishList.filter((item) => item.id === id);
	if (selectList && selectList.length !== 0) {
		return selectList[0].name;
	}
	return '';
};

export const filterMath = (id) => {
	const selectList = mathList.filter((item) => item.id === id);
	if (selectList && selectList.length !== 0) {
		return selectList[0].name;
	}
	return '';
};

export const hello = 'world';
