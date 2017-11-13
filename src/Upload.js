import React, { Component } from 'react';
import { Upload, message, Button, Icon ,Row, Col } from 'antd';

class Uploads extends Component {
	
	onChange(info) {
		if (info.file.status !== 'uploading') {
	      console.log(info.file, info.fileList);
	    }
	    if (info.file.status === 'done') {
	      message.success(`${info.file.name} file uploaded successfully`);
	    } else if (info.file.status === 'error') {
	      message.error(`${info.file.name} file upload failed.`);
	    }
	  
	}
	render() {
		const props = {
		  name: 'file',
		  action: '//jsonplaceholder.typicode.com/posts/',
		  headers: {
		    authorization: 'authorization-text',
		   }
		}
		const val = this.props.val;
		return (
			<div className="marginButton">
				<Row>
					<Col span={5} className="selectname">
			  			<Upload {...props}>
						    <Button>
						      <Icon type="upload" /> {val}
						    </Button>
					  	</Upload>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Uploads;