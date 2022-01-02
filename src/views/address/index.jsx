import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm } from 'antd';
import { filterAddressType } from '@utils/filter';
import request from '@utils/AxiosRequest';
import ProvinceDialog from './provinceDialog';
import CityDialog from './cityDialog';
import CountryDialog from './countryDialog';
import styles from './index.less';

export default () => {
	const [addressList, setAddressList] = useState([]);
	const [provinceDetail, setProvinceDetail] = useState({});
	const [cityDialogVisible, setCityDialogVisible] = useState(false);
	const [cityDetail, setCityDetail] = useState({});
	const [countryDialogVisible, setCountryDialogVisible] = useState(false);
	const [provinceDialogVisible, setProvinceDialogVisible] = useState(false);

	const onSearch = () => {
		request.get('/address/all').then((res) => {
			setAddressList(res.data || []);
		});
	};

	useEffect(() => {
		onSearch();
	}, []);

	const controllerProvinceDialog = () => {
		setProvinceDialogVisible(!provinceDialogVisible);
	};

	const controllerCityDialog = () => {
		setCityDialogVisible(!cityDialogVisible);
	};

	const controllerCountryDialog = () => {
		setCountryDialogVisible(!countryDialogVisible);
	};

	// 删除地区
	const deleteAddress = (record) => {
		request.post('/address/deleteAddressById', { id: record.id }).then(() => {
			onSearch();
		});
	};

	const columns = [
		{
			title: '地区名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '行政单位',
			dataIndex: 'type',
			key: 'type',
			render: (txt) => <span>{filterAddressType(txt)}</span>,
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
			render: (txt, record) => {
				const { type } = record;
				const actionList = [];
				const addCity = (
					<Button
						key="addcity"
						onClick={() => {
							setProvinceDetail({ id: record.id, name: record.name });
							controllerCityDialog();
						}}
						type="link"
					>
						新增市区
					</Button>
				);
				const addCountry = (
					<Button
						key="addcity"
						onClick={() => {
							setCityDetail({ id: record.id, name: record.name });
							controllerCountryDialog();
						}}
						type="link"
					>
						新增区/县城
					</Button>
				);
				const deleteItem = (
					<Popconfirm
						placement="top"
						key="deleteItem"
						title="是否确认删除"
						onConfirm={() => deleteAddress(record)}
						okText="确定"
						cancelText="取消"
					>
						<Button type="link">删除</Button>
					</Popconfirm>
				);
				if (type === 1) {
					actionList.push(addCity);
				}
				if (type === 2) {
					actionList.push(addCountry);
				}
				actionList.push(deleteItem);
				return <>{actionList}</>;
			},
		},
	];

	return (
		<div className={styles.wrap}>
			<div className={styles.search}>
				<Button type="primary" onClick={controllerProvinceDialog}>
					新增省份
				</Button>
			</div>
			<div className={styles.table}>
				<Table
					rowKey="id"
					dataSource={addressList}
					columns={columns}
					pagination={{
						pageSize: 10,
						showTotal: (total) => `共 ${total} 条`,
					}}
				/>
			</div>
			{provinceDialogVisible && (
				<ProvinceDialog status="new" onSearch={onSearch} controllerDialog={controllerProvinceDialog} />
			)}
			{cityDialogVisible && (
				<CityDialog
					status="new"
					onSearch={onSearch}
					provinceDetail={provinceDetail}
					controllerDialog={controllerCityDialog}
				/>
			)}
			{countryDialogVisible && (
				<CountryDialog
					status="new"
					onSearch={onSearch}
					cityDetail={cityDetail}
					controllerDialog={controllerCountryDialog}
				/>
			)}
		</div>
	);
};
