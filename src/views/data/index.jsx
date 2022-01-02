import React, { useEffect } from 'react';
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import echarts from '@component/ercharts/index';
import echarts_theme from '@component/ercharts/echarts_theme';
import TitleChunk from './TitleChunk';
import styles from './index.less';
import './redux/reducer';
import * as action from './redux/action';

export default () => {
	const dispatch = useDispatch();
	const { totalData, userData, publishData, goodsData, commentsData } = useSelector((state) => state.data);

	useEffect(() => {
		// 获取汇总数据
		dispatch(action.getDataFunc());
		// 获取用户增长曲线
		dispatch(action.getUserNumDataFunc());
		// 获取发布内容增长曲线
		dispatch(action.getPublishNumDataFunc());
		// 获取点赞增长曲线
		dispatch(action.getGoodsNumDataFunc());
		// 获取评论增长曲线
		dispatch(action.getCommentsNumDataFunc());
	}, [dispatch]);

	useEffect(() => {
		if (Array.isArray(userData.xAxis) && userData.xAxis.length !== 0) {
			const myChart = echarts.init(document.getElementById('member'), echarts_theme);
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
						smooth: true,
					},
				],
			});
		}
	}, [userData.xAxis, userData.yAxis]);

	useEffect(() => {
		if (Array.isArray(publishData.xAxis) && publishData.xAxis.length !== 0) {
			const myChart = echarts.init(document.getElementById('publish'), echarts_theme);
			myChart.setOption({
				xAxis: {
					type: 'category',
					data: publishData.xAxis,
				},
				yAxis: {
					type: 'value',
				},
				tooltip: {
					trigger: 'axis',
				},
				series: [
					{
						data: publishData.yAxis,
						type: 'line',
						smooth: true,
					},
				],
			});
		}
	}, [publishData.xAxis, publishData.yAxis]);

	useEffect(() => {
		if (Array.isArray(goodsData.xAxis) && goodsData.xAxis.length !== 0) {
			const myChart = echarts.init(document.getElementById('goods'), echarts_theme);
			myChart.setOption({
				xAxis: {
					type: 'category',
					data: goodsData.xAxis,
				},
				yAxis: {
					type: 'value',
				},
				tooltip: {
					trigger: 'axis',
				},
				series: [
					{
						data: goodsData.yAxis,
						type: 'line',
						smooth: true,
					},
				],
			});
		}
	}, [goodsData.xAxis, goodsData.yAxis]);

	useEffect(() => {
		if (Array.isArray(commentsData.xAxis) && commentsData.xAxis.length !== 0) {
			const myChart = echarts.init(document.getElementById('comments'), echarts_theme);
			myChart.setOption({
				xAxis: {
					type: 'category',
					data: commentsData.xAxis,
				},
				yAxis: {
					type: 'value',
				},
				tooltip: {
					trigger: 'axis',
				},
				series: [
					{
						data: commentsData.yAxis,
						type: 'line',
						smooth: true,
					},
				],
			});
		}
	}, [commentsData.xAxis, commentsData.yAxis]);

	return (
		<div className={styles.data}>
			<div className={styles.title}>
				<TitleChunk title="用户" num={totalData.user_total} desc={`今日新增: ${totalData.user_today}`} />
				<TitleChunk title="发布" num={totalData.publish_total} desc={`今日新增: ${totalData.publish_today}`} />
				<TitleChunk title="点赞" num={totalData.goods_total} desc={`今日新增: ${totalData.goods_today}`} />
				<TitleChunk title="评论" num={totalData.comment_total} desc={`今日新增: ${totalData.comment_today}`} />
				<TitleChunk title="转发" num={totalData.share_total} desc={`今日新增: ${totalData.share_today}`} />
				<TitleChunk title="在线人数" num={totalData.online_num} desc={totalData.create_time} />
			</div>
			<div className={styles.content}>
				<div className={styles.con_row}>
					<div className={styles.con_chunk}>
						<Card title="用户">
							<div className={styles.charts_con}>
								<div id="member" className={styles.charts} />
								{/* <div className={styles.charts_desc}>
									<Badge status="success" text="微信：234" />
									<Badge status="success" text="QQ：234" />
									<Badge status="success" text="其他：234" />
								</div> */}
							</div>
						</Card>
					</div>
					<div className={styles.con_chunk}>
						<Card title="发布">
							<div className={styles.charts_con}>
								<div id="publish" className={styles.charts} />
							</div>
						</Card>
					</div>
				</div>
				<div className={styles.con_row}>
					<div className={styles.con_chunk}>
						<Card title="点赞">
							<div className={styles.charts_con}>
								<div id="goods" className={styles.charts} />
							</div>
						</Card>
					</div>
					<div className={styles.con_chunk}>
						<Card title="评论">
							<div className={styles.charts_con}>
								<div id="comments" className={styles.charts} />
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};
