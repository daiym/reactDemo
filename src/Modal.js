import React, { Component } from 'react';
import { Modal, Button } from 'antd';

class Modal extends Component {
    state = { visible: false }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render(){
        const data = this.props.data;
        const title = this.props.title;
        return(
            <div>
                <Modal
                    title="title"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                   {data}
                </Modal>
            </div>
        )
    }
};

export default Modal;
