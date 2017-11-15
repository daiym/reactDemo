import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Ajax from './Ajax';//Ajax
import But from './But';
import { Input } from 'antd';
const { TextArea } = Input;

class Forbidroles extends Component{
    constructor(props){
        super(props);
        this.state = ({
            val:''
        })
    }

    CSVArray = (csv) => {
        var data = csv.split('\n' || ',');
        console.log(data);
        var ret = [];
        if(data.length > 0){
            for(var i = 0; i < data.length; ++i){
                var sessionid = parseInt(data[i]);
                ret.push(sessionid);
            }
            return ret;
        }
    }

    value = (e) => {
        this.setState ({
            val:e.target.value
        })
    }

    postajax = () => {
        var roleArray = this.CSVArray(this.state.val);
        if(roleArray.length > 0){
            Ajax({ids:roleArray , level:6},"role.forbid.tosaferesource").then(function(r){
                if(r.data.errorcode == 0){
                    var data = JSON.parse(r.data.result);
				    console.log(data);
                }
            })
        }
    }

    render(){
        return (
            <div>
                <ContentHeader header='Forbid Roles' />
                <TextArea style={{ minHeight:445 , maxWidth: 800}} placeholder='输入CSV格式' onChange={this.value} />
                <But name='查询' onClick={this.postajax} />
            </div>
        )
    }
}

export default Forbidroles;