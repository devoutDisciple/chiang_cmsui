import React, { useEffect } from 'react';
import { Card, DatePicker } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import echarts from '@component/ercharts/index';
import echarts_theme from '@component/ercharts/echarts_theme';
import TitleChunk from './TitleChunk';
import styles from './index.less';
import './redux/reducer';
import * as action from './redux/action';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const defaultTime = [moment(moment().subtract(7, 'days'), dateFormat), moment(new Date(), dateFormat)];

export default () => {
	const dispatch = useDispatch();
	const { statisticsData, userData, salesData, signupData, teamData } = useSelector((state) => state.data);

	useEffect(() => {
		console.log(defaultTime, 7382);
		// 获取汇总数据
		dispatch(action.getDataFunc());
		// 获取用户增长曲线
		dispatch(
			action.getUserNumDataFunc({
				startTime: moment(defaultTime[0]).format(dateFormat),
				endTime: moment(defaultTime[2]).format(dateFormat),
			}),
		);
		// 获取收入增长曲线
		dispatch(
			action.getSalesNumDataFunc({
				startTime: moment(defaultTime[0]).format(dateFormat),
				endTime: moment(defaultTime[2]).format(dateFormat),
			}),
		);
		// 获取组团增长曲线
		dispatch(
			action.getSignupDataFunc({
				startTime: moment(defaultTime[0]).format(dateFormat),
				endTime: moment(defaultTime[2]).format(dateFormat),
			}),
		);
		// 获取评论增长曲线
		dispatch(
			action.getTeamDataFunc({
				startTime: moment(defaultTime[0]).format(dateFormat),
				endTime: moment(defaultTime[2]).format(dateFormat),
			}),
		);
	}, [dispatch]);

	useEffect(() => {
		if (Array.isArray(userData.xAxis) && userData.xAxis.length !== 0) {
			let myChart = '';
			myChart = echarts.getInstanceByDom(document.getElementById('member'));
			if (!myChart) myChart = echarts.init(document.getElementById('member'), echarts_theme);
			myChart.setOption({
				xAxis: {
					type: 'category',
					data: userData.xAxis,
				},
				yAxis: {
					type: 'value',
				},
				tooltip: {
					trigger: 'axis',
				},
				series: [
					{
						data: userData.yAxis,
						type: 'line',
						smooth: false,
					},
				],
			});
		}
	}, [userData.xAxis, userData.yAxis]);

	useEffect(() => {
		if (Array.isArray(salesData.xAxis) && salesData.xAxis.length !== 0) {
			let myChart = '';
			myChart = echarts.getInstanceByDom(document.getElementById('sales'));
			if (!myChart) myChart = echarts.init(document.getElementById('sales'), echarts_theme);
			myChart.setOption({
				xAxis: {
					type: 'category',
					data: salesData.xAxis,
				},
				yAxis: {
					type: 'value',
				},
				tooltip: {
					trigger: 'axis',
				},
				series: [
					{
						data: salesData.yAxis,
						type: 'line',
						smooth: true,
					},
				],
			});
		}
	}, [salesData.xAxis, salesData.yAxis]);

	useEffect(() => {
		if (Array.isArray(signupData.xAxis) && signupData.xAxis.length !== 0) {
			let myChart = '';
			myChart = echarts.getInstanceByDom(document.getElementById('signup'));
			if (!myChart) myChart = echarts.init(document.getElementById('signup'), echarts_theme);
			myChart.setOption({
				xAxis: {
					type: 'category',
					data: signupData.xAxis,
				},
				yAxis: {
					type: 'value',
				},
				tooltip: {
					trigger: 'axis',
				},
				series: [
					{
						data: signupData.yAxis,
						type: 'line',
						smooth: true,
					},
				],
			});
		}
	}, [signupData.xAxis, signupData.yAxis]);

	useEffect(() => {
		if (Array.isArray(teamData.xAxis) && teamData.xAxis.length !== 0) {
			let myChart = '';
			myChart = echarts.getInstanceByDom(document.getElementById('team'));
			if (!myChart) myChart = echarts.init(document.getElementById('team'), echarts_theme);
			myChart.setOption({
				xAxis: {
					type: 'category',
					data: teamData.xAxis,
				},
				yAxis: {
					type: 'value',
				},
				tooltip: {
					trigger: 'axis',
				},
				series: [
					{
						data: teamData.yAxis,
						type: 'line',
						smooth: true,
					},
				],
			});
		}
	}, [teamData.xAxis, teamData.yAxis]);

	const onChangeUserTime = (value, mode, key) => {
		switch (key) {
			case 'user':
				// 获取用户增长曲线
				dispatch(action.getUserNumDataFunc({ startTime: mode[0], endTime: mode[1] }));
				break;
			case 'money':
				// 获取用户增长曲线
				dispatch(action.getSalesNumDataFunc({ startTime: mode[0], endTime: mode[1] }));
				break;
			case 'signup':
				// 获取用户增长曲线
				dispatch(action.getSignupDataFunc({ startTime: mode[0], endTime: mode[1] }));
				break;
			case 'team':
				// 获取用户增长曲线
				dispatch(action.getTeamDataFunc({ startTime: mode[0], endTime: mode[1] }));
				break;
			default:
				break;
		}
	};

	return (
		<div className={styles.data}>
			<div className={styles.title}>
				<TitleChunk
					title="用户总数"
					num={statisticsData.totalUsers}
					desc={`今日新增: ${statisticsData.todayUsers}`}
				/>
				<TitleChunk
					title="报名总数"
					num={statisticsData.totalSignup}
					desc={`今日新增: ${statisticsData.todaySignup}`}
				/>
				<TitleChunk
					title="组团总数"
					num={statisticsData.totalTeams}
					desc={`今日新增: ${statisticsData.todayTeams}`}
				/>
				<TitleChunk
					title="总收入"
					num={statisticsData.totalMoney}
					desc={`今日新增: ${statisticsData.todayMoney}`}
				/>
			</div>
			<div className={styles.content}>
				<div className={styles.con_row}>
					<div className={styles.con_chunk}>
						<Card
							title="用户"
							extra={
								<RangePicker
									defaultValue={defaultTime}
									onCalendarChange={(value, mode) => onChangeUserTime(value, mode, 'user')}
								/>
							}
						>
							<div className={styles.charts_con}>
								<div id="member" className={styles.charts} />
							</div>
						</Card>
					</div>
					<div className={styles.con_chunk}>
						<Card
							title="收入"
							extra={
								<RangePicker
									defaultValue={defaultTime}
									onCalendarChange={(value, mode) => onChangeUserTime(value, mode, 'money')}
								/>
							}
						>
							<div className={styles.charts_con}>
								<div id="sales" className={styles.charts} />
							</div>
						</Card>
					</div>
				</div>
				<div className={styles.con_row}>
					<div className={styles.con_chunk}>
						<Card
							title="报名人数"
							extra={
								<RangePicker
									defaultValue={defaultTime}
									onCalendarChange={(value, mode) => onChangeUserTime(value, mode, 'signup')}
								/>
							}
						>
							<div className={styles.charts_con}>
								<div id="signup" className={styles.charts} />
							</div>
						</Card>
					</div>
					<div className={styles.con_chunk}>
						<Card
							title="组团人数"
							extra={
								<RangePicker
									defaultValue={defaultTime}
									onCalendarChange={(value, mode) => onChangeUserTime(value, mode, 'team')}
								/>
							}
						>
							<div className={styles.charts_con}>
								<div id="team" className={styles.charts} />
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};
