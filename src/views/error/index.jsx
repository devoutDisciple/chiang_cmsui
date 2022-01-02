import React from 'react';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			errorInfo: '',
			errorMsg: '',
		};
	}

	componentDidCatch(errorMsg, errorInfo) {
		this.setState({
			hasError: true,
			errorMsg,
			errorInfo,
		});
	}

	render() {
		const { children } = this.props;
		const { hasError, errorMsg, errorInfo } = this.state;
		if (hasError) {
			return (
				<>
					<div>{errorMsg.toString()}</div>
					<pre>{errorInfo.componentStack}</pre>
				</>
			);
		}
		return children;
	}
}
