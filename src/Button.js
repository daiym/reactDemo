import React, { Component } from 'react';
import { Button,Row, Col } from 'antd';

class But extends Component {
	render() {
		const name = this.props.name;
		const click = this.props.onClick;
		const datatitle = this.props.datatitle;
		return (
			<div className="marginButton">
				<Row>
					<Col span={5} className="selectname">
			  			<Button type="primary" data={datatitle} onClick={click}>{name}</Button>
					</Col>
				</Row>
			</div>
		)
	}
}

export default But;