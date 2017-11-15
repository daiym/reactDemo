import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import But from './But';
import Ajax from './Ajax';//Ajax
import Input from './Input';

class Forceswitch extends Component{
    constructor(props){
        super(props);
        this.state = ({
            formid:'',
            toid:''
        })
    }

    value = (name,e) => {
        this.setState ({
            [name]:e.target.value
        })
    };

    postajax = () => {
        Ajax({fromsid:this.state.formid, tosid:this.state.toid},"role.force.switch").then(function(r){
            if(r.data.errorcode == 0){
                var data = JSON.parse(r.data.result);
                console.log(data);
            }
        })
    }

    render(){
        console.log(this.state.formid,this.state.toid)
        return(
            <div>
                <ContentHeader header='强制登录其他账号' />
                <Input name='form sid:' val='form sid' onChange={(e) => this.value('formid',e)} />
                <Input name='to sid:' val='to sid' onChange={(e) => this.value('toid',e)} />
                <But name='force switch' />
            </div>
        )
    }
}

export default Forceswitch;