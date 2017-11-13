import React, { Component } from 'react';
import { Row, Col } from 'antd';

class ContentHeader extends Component {
	render() {
		const header = this.props.header;
		return (
			<div className="marginbtn">
				<h2>{header}</h2>
			</div>
		)
	}
}

export default ContentHeader;