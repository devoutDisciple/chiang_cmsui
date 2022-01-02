import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import store from '@store/redux/index';
import { Provider } from 'react-redux';
import ErrorBoundary from '@views/error';
import App from '@views/layout/layout';
import 'moment/locale/zh-cn';
import './style/common.css';
import './style/common.less';

moment.locale('zh-cn');

ReactDOM.render(
	<ConfigProvider locale={zhCN}>
		<Provider store={store}>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</Provider>
	</ConfigProvider>,
	document.getElementById('root'),
);

if (module.hot) {
	module.hot.accept();
}
