import React, { Component } from 'react';
import { Button,Row, Col } from 'antd';

class But extends Component {
	componentDidMount(){
		// var s = this.props.tem;
		// this.props.tem(123)
		
		// console.log(this.props)
	};

	render() {
		const name = this.props.name;
		const click = this.props.onClick;
		const datatitle = this.props.datatitle;
		const tem = this.props.tem;
		// console.log(tem)
		return (
			<div className="marginButton">
				<Row>
					<Col span={5} className="selectname">
			  			<Button type="primary" data={datatitle} title={tem} onClick={click}>{name}</Button>
					</Col>
				</Row>
			</div>
		)
	}
}

export default But;