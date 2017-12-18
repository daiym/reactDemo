import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import Selects from './Select';
import Input from './Input';
import Button from './Button';
import DateTime from './DateTime';
import Formats from './Formats';
import Format from './Format';
import Ajax from './Ajax';//Ajax
import { Select,message } from 'antd';
const Option = Select.Option;

class Serverlog extends Component {
	constructor(props){
		super(props);
		this.state = ({
			type:[],
			begintime:'',
			endtime:'',
			server:'',
			svrtype:'',
			id:'',
			columns:[]
		})
	}

	//默认日历当天时间
	datatime = () => {
		var s = new Date();
		var c = Formats(s)
		return c;
	}

	componentDidMount(){
		const _this = this;
		Ajax({},'role.rolelogtypes').then(function(r){
			console.log('role.rolelogtypes:',JSON.parse(r.data.result));
			var rolelogtypes = JSON.parse(r.data.result);
			localStorage.logtype = r.data.result;
			var s = localStorage.logtype;
			var severslogtype = [];
			if(s){
				severslogtype = JSON.parse(s);
			}
			for(var i = 0; i < rolelogtypes.length; i++){
				if(severslogtype.indexOf(rolelogtypes[i]) === -1){
					severslogtype.push(rolelogtypes[i])
				}
			}
			_this.setState ({
				type:severslogtype
			})
		})
		var t = new Date();
		var time = t.getTime()
		this.setState ({
			begintime:time,
			endtime:time
		})

	}

	//beg  13位	
	beg = (date, dateString) => {
		if(date != null){
			console.log(date, dateString);
			var a = (date._d).getTime();
			this.setState ({
				begintime:a
			});
		};
	};

	//end  13位	
	end = (date, dateString) => {
		if(date != null){
			console.log(date, dateString);
			var a = (date._d).getTime();
			this.setState ({
				endtime:a
			});
		};
	};

	//俩下拉
	svrtype = (name,value) => {
		this.setState ({
			[name]:value
		})
	}

	//sess
	sess = (e) => {
		this.setState ({
			id:e.target.value
		})
	}
	

	//type下拉
	Type = () => {
		var type = this.state.type;
		var html = [];
		for(var i = 0; i < type.length; i++){
			const s = <Option key={i} value={type[i]}>{type[i]}</Option>;
			html.push(s);
		}
		return html;		
	}

	//服务器
	server = () => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		return s.map((item,index) => {
					var uniqueid = JSON.stringify(item.uniqueid)
					return <Option key={index} value={uniqueid}>{uniqueid + '服务器'}</Option>;
				})
	}

	//Ajax
	postajax = () => {
		if(this.state.server === ''){
			return message.info('服务器不能为空！');
		}else if(this.state.id === ''){
			return message.info('sessionid不能为空！');
		// }else if(this.state.begintime !== ''){
		// 	return message.info('开始时间不能为空！');
		// }else if(this.state.endtime !== ''){
		// 	return message.info('结束时间不能为空！');
		// }else if(this.state.svrtype !== ''){
		// 	return message.info('类型不能为空！');
		}else{
			var _this = this;
			Ajax({
				id:_this.state.server,
				sessionid:_this.state.id,
				timebegin:_this.state.begintime,
	        	timeend:_this.state.endtime,
	        	type:_this.state.svrtype
			},'role.rolelog').then(function(r){
				console.log(r.data.result);
				var html = '';
				switch(_this.state.svrtype){
					case "rolelogout":
						html = [{
							title: '序号' ,
							dataIndex: 'number',
							key: 'number',
						},{
							title: '类型',
							dataIndex: 'type',
							key: 'type',
						},{
							title: 'sessionid',
							dataIndex: 'sessionid',
							key: 'sessionid',
						},{
							title: '主基地等级',
							dataIndex: 'level',
							key: 'level',
						},{
							title: '人物等级',
							dataIndex: 'namelevel',
							key: 'namelevel',
						},{
							title: '时间',
							dataIndex: 'time',
							key: 'time',
						}];
						break;
					case "useitem":
						html = [{
							title: '序号' ,
							dataIndex: 'number',
							key: 'number',
						},{
							title: '类型',
							dataIndex: 'type',
							key: 'type',
						},{
							title: 'sessionid',
							dataIndex: 'sessionid',
							key: 'sessionid',
						},{
							title: '使用物品及数量',
							dataIndex: 'itemlevel',
							key: 'itemlevel',
						},{
							title: '背包变化',
							dataIndex: 'Backpack',
							key: 'Backpack',
						},{
							title: '时间',
							dataIndex: 'time',
							key: 'time',
						}];
						break;
					case "vipexp":
						html = [{
							title: '序号' ,
							dataIndex: 'number',
							key: 'number',
						},{
							title: '类型',
							dataIndex: 'type',
							key: 'type',
						},{
							title: 'sessionid',
							dataIndex: 'sessionid',
							key: 'sessionid',
						},{
							title: 'exp 变化',
							dataIndex: 'exp',
							key: 'exp',
						},{
							title: '方式',
							dataIndex: 'way',
							key: 'way',
						},{
							title: '分数',
							dataIndex: 'score',
							key: 'score',
						},{
							title: '时间',
							dataIndex: 'time',
							key: 'time',
						}]
						break;
					case "dailytask":
						html = [{
							title: '序号' ,
							dataIndex: 'number',
							key: 'number',
						},{
							title: '类型',
							dataIndex: 'types',
							key: 'types',
						},{
							title: 'sessionid',
							dataIndex: 'sessionid',
							key: 'sessionid',
						},{
							title: '点数',
							dataIndex: 'points',
							key: 'points',
						},{
							title: 'type',
							dataIndex: 'type',
							key: 'type',
						},{
							title: 'action',
							dataIndex: 'action',
							key: 'action',
						},{
							title: '背包变化',
							dataIndex: 'Backpack',
							key: 'Backpack',
						},{
							title: '时间',
							dataIndex: 'time',
							key: 'time',
						}]
						break;
					default:
						html = "<tr><th>序号</th><th>类型</th><th>sessionid</th><th>背包变化</th><th>时间</th></tr>";
						html = [{
							title: '序号' ,
							dataIndex: 'number',
							key: 'number',
						},{
							title: '类型',
							dataIndex: 'types',
							key: 'types',
						},{
							title: 'sessionid',
							dataIndex: 'sessionid',
							key: 'sessionid',
						},{
							title: '背包变化',
							dataIndex: 'Backpack',
							key: 'Backpack',
						},{
							title: '时间',
							dataIndex: 'time',
							key: 'time',
						}]
						break;
				}
				_this.setState ({
					columns:html
				})
				for(var index = 0; index < r.length; index++){
					var s = r[index];
					var a = _this.state.svrtype
					var time = Format(s.time);
					var type = s[a];
					var c = [];
	                var b = {};
	                var baglog;
					try{
	                    if(type.baglog) {
	                        baglog = type.baglog;
	                    }else {
	                        baglog = null;
	                    }
	                } catch (e) {
	                    baglog = null;
	                }
	                if(type.done === undefined){
	                    type.done="";
	                }
	                if(type.goldqueue === undefined){
	                    type.goldqueue="";
	                }
	                if(a === 'rolelogout'){
	                	b.key = index;
	                	b.number = index;
	                	b.type = a;
	                	b.sessionid = type.sessionid;
	                	b.level = type.citylevel;
	                	b.namelevel = type.level;
	                	b.time = time;
	                	c.push(b);
	                }else if(a === 'useitem'){
	                	b.key = index;
	                	b.number = index;
	                	b.type = a;
	                	b.sessionid = type.sessionid;
	                	b.itemlevel = type.item;
	                	b.Backpack = type.count;
	                	b.time = time;
	                	c.push(b);
	                }else if(a === 'vipexp'){
	                	b.key = index;
	                	b.number = index;
	                	b.type = a;
	                	b.sessionid = type.sessionid;
	                	b.exp = type.allexpold;
	                	b.way = type.allexpcur;
	                	b.score = type.by;
	                	b.time = time;
	                	c.push(b);
	                }else if(a === 'dailytask'){
	                	b.key = index;
	                	b.number = index;
	                	b.type = a;
	                	b.sessionid = type.sessionid;
	                	b.points =type.points;
	                	b.type = type.type;
	                	b.action = type.action;
	                	b.Backpack = baglog;
	                	b.time = time;
	                	c.push(b);
	                }else{
	                	b.key = index;
	                	b.number = index;
	                	b.type = a;
	                	b.sessionid = type.sessionid;
	                	b.Backpack = baglog;
	                	b.time = time;
	                	c.push(b);
	                }
	                console.log(c);
					// switch (a) {
					// 	case 'rolelogout':
					// 		newRow = "<tr><td>"+index+"</td><td>"+a+"</td><td>"+type.sessionid+"</td><td>"+type.citylevel+"</td><td>"+type.level+"</td><td>"+time+"</td></tr>";
					// 		break;
					// 	case 'useitem':
					// 		newRow = "<tr><td>"+index+"</td><td>"+info.type+"</td><td>"+type.sessionid+"</td><td>"+type.item+"->"+type.count+"</td><td>"+baglog+"</td><td>"+time+"</td></tr>";
					// 		break;
					// 	case 'vipexp':
					// 		newRow = "<tr><td>"+index+"</td><td>"+info.type+"</td><td>"+type.sessionid+"</td><td>"+type.allexpold+ "->"+ type.allexpcur+"</td><td>"+type.by+"</td><td>"+type.point+"</td><td>"+time+"</td></tr>";
     //                    	break;
     //                    case 'dailytask':
     //                    	newRow = "<tr><td>"+index+"</td><td>"+info.type+"</td><td>"+type.sessionid+"</td><td>"+type.points+"</td><td>"+type.type+"</td><td>"+type.action+"</td><td>"+baglog+"</td><td>"+time+"</td></tr>";
     //                    	break;
     //                    default :
     //                    	newRow = "<tr><td>"+index+"</td><td>"+info.type+"</td><td>"+type.sessionid+"</td><td>"+baglog+"</td><td>"+time+"</td></tr>";
     //                    	break;
					// }
				}

			})
		}
		
	}

	render() {
	const dataSource = [{
		  key: '1',
		  name: '胡彦斌',
		  age: 32,
		  address: '西湖区湖底公园1号'
		}, {
		  key: '2',
		  name: '胡彦祖',
		  age: 42,
		  address: '西湖区湖底公园1号'
		}, {
		  key: '3',
		  name: '胡彦祖',
		  age: 42,
		  address: '西湖区湖底公园1号'
	}];

	// const columns = [{
	// 	  title: '姓名',
	// 	  dataIndex: 'name',
	// 	  key: 'name',
	// 	}, {
	// 	  title: '年龄',
	// 	  dataIndex: 'age',
	// 	  key: 'age',
	// 	}, {
	// 	  title: '住址',
	// 	  dataIndex: 'address',
	// 	  key: 'address',
	// }];	
		return (
			<div>
				<ContentHeader header='系统日志' />
				<Selects name='服务器:' val='请选择' data={this.server()} onChange={(value) => this.svrtype('server',value)}/>
				<Selects name='type:' val='请选择' data={this.Type()} onChange={(value) => this.svrtype('svrtype',value)}/>
				<Input name='type手动输入:' val='type手动输入' />
				<Input name='sessionid:' val='sessionid' onChange={this.sess} />
				<DateTime name='开始时间' defaulttime={this.datatime()} onChange={this.beg} />
				<DateTime name='结束时间' defaulttime={this.datatime()} onChange={this.end} />
				<Button name='查询' onClick={this.postajax} />
				<ContentHeader header='Result' />
				<Tab dataSource={dataSource} columns={this.state.columns} />
			</div>
		)
	}
}

export default Serverlog;

