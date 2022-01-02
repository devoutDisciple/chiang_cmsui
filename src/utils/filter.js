export const filterIdentity = (type) => {
	let txt = '学生';
	switch (Number(type)) {
		case 1:
			txt = '学生';
			break;
		case 2:
			txt = '学校老师';
			break;
		case 3:
			txt = '机构老师';
			break;
		default:
			txt = '学生';
			break;
	}
	return txt;
};

export const filterContentTypeByTxt = (type) => {
	let txt = '帖子';
	switch (Number(type)) {
		case 1:
			txt = '帖子';
			break;
		case 2:
			txt = '博客';
			break;
		case 3:
			txt = '投票';
			break;
		case 4:
			txt = 'PK';
			break;
		case 5:
			txt = '视频';
			break;
		case 6:
			txt = '图片';
			break;
		default:
			break;
	}
	return txt;
};

export const filterVoteType = (type) => {
	let txt = '单选';
	switch (Number(type)) {
		case 1:
			txt = '单选';
			break;
		case 2:
			txt = '多选';
			break;
		default:
			break;
	}
	return txt;
};

export const filterBattleType = (type) => {
	let txt = '1天';
	switch (Number(type)) {
		case 1:
			txt = '1天';
			break;
		case 2:
			txt = '3天';
			break;
		case 3:
			txt = '5天';
			break;
		default:
			break;
	}
	return txt;
};

export const filterAddressType = (type) => {
	let txt = '省';
	switch (Number(type)) {
		case 1:
			txt = '省';
			break;
		case 2:
			txt = '市';
			break;
		case 3:
			txt = '县/区';
			break;
		default:
			break;
	}
	return txt;
};
