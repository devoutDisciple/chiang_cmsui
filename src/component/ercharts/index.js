// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	ParallelComponent,
	GeoComponent,
	ToolboxComponent,
	LegendComponent,
	TimelineComponent,
	VisualMapComponent,
	DataZoomComponent,
	MarkPointComponent,
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 注册主题
import theme from './echarts_theme';

// 注册必须的组件
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	BarChart,
	LineChart,
	CanvasRenderer,
	ParallelComponent,
	GeoComponent,
	ToolboxComponent,
	LegendComponent,
	TimelineComponent,
	VisualMapComponent,
	DataZoomComponent,
	MarkPointComponent,
]);

echarts.registerTheme('walden', theme);

export default echarts;
