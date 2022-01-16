import React, { useEffect, useCallback } from 'react';
import { Button, Row } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './index.less';
import * as action from './redux/action';

export default ({ controllerDialog, setModalStatus }) => {
	const dispatch = useDispatch();

	const submit = useCallback(async () => {
		try {
			dispatch(action.getAllSwiperFunc({ current: 1 }));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);

	const onClickAdd = () => {
		setModalStatus('new');
		controllerDialog();
	};

	useEffect(() => {
		submit();
	}, [submit]);

	return (
		<Row className={styles.search}>
			<Button onClick={onClickAdd} type="primary">
				新增
			</Button>
		</Row>
	);
};
