import React, { Component } from 'react';
import antd from 'antd';
import Homepage from './Homepage';//主页
import Userinfo from './Userinfo';//用户信息
import League from './League';//联盟信息
import Mail from './Mail';//发送指定邮件
import SeverMail from './SeverMail';//发送邮件
import Announce from './Announce';//通知公告
import Serverlog from './Serverlog';//系统日志
import Goldlog from './Goldlog';//金币日志
import Newerlog from './Newerlog';//新手统计表
import Accountbind from './Accountbind';//账号绑定
import Specifiesreward from './Specifiesreward';//特殊奖励
import Paymail from './Paymail';//paymail
import TempActivition from './TempActivition';//TempActivition
import Serverinfo from './Serverinfo';//Serverinfo
import Chatlogs from './Chatlogs';//Chatlogs
import PayLogs from './PayLogs';//PayLogs
import Vipcount from './Vipcount';//Vipcount
import Testpay from './Testpay';//Testpay
import Forbidroles from './Forbidroles';//Forbidroles
import Forceswitch from './Forceswitch';//Forceswitch
import Marcharmy from './Marcharmy';//Marcharmy
import BuildKey from './BuildKey';//BuildKey
import Generalpowerladder from './Generalpowerladder';//Generalpowerladder
import Globalcraft from './Globalcraft';//Globalcraft
import Batteryfight from './Batteryfight';//Batteryfight
import RobotManager from './RobotManager';//RobotManager
import Activition from './Activition';//Activition
import Version from './Version';//Version
import Worldboss from './Worldboss';//Worldboss
import Warland from './Warland';//Warland
import { BrowserRouter,Route,Link} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Ajax from './Ajax';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Home extends Component {
  constructor(props){
    super(props);
  }
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  componentDidMount(){
    var _this = this;
    Ajax({}, 'servers.infos')
    .then(function(res){
      if(res == '/login'){
        return null;
      }else if(res.data.errorcode == 0){
        var r = JSON.parse(res.data.result);
        console.log('servers.infos: ',r)
        if(r){
          localStorage['server@' + localStorage.name] = JSON.stringify(r);
        }
        console.log(_this.props);
      }
    })
  }
  render() {
    var name = localStorage.name;
    return (
      
      <Layout className='height'>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{overflowX:'auto'}}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className='marB'>
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="pie-chart" />
                <span>首页</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/userinfo">
                <Icon type="desktop" />
                <span>用户信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/leagueinfo">
                <Icon type="desktop" />
                <span>联盟信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/mailinfo">
                <Icon type="desktop" />
                <span>发送指定邮件</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/servermailinfo">
                <Icon type="desktop" />
                <span>发送邮件</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/announceinfo">
                <Icon type="desktop" />
                <span>通知公告</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/sevrverloginfo">
                <Icon type="desktop" />
                <span>系统日志</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/goldloginfo">
                <Icon type="desktop" />
                <span>金币日志</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/newerloginfo">
                <Icon type="desktop" />
                <span>新手统计</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/accountbindinfo">
                <Icon type="desktop" />
                <span>账号绑定</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Link to="/specifiesreward">
                <Icon type="desktop" />
                <span>特殊奖励</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="12">
              <Link to="/paymail">
                <Icon type="desktop" />
                <span>paymail</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="13">
              <Link to="/tempactivition">
                <Icon type="desktop" />
                <span>tempactivition</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="14">
              <Link to="/serverinfo">
                <Icon type="desktop" />
                <span>服务器信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="15">
              <Link to="/chatlogs">
                <Icon type="desktop" />
                <span>聊天记录</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="16">
              <Link to="/paylogs">
                <Icon type="desktop" />
                <span>paylogs</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="17">
              <Link to="/vip 7">
                <Icon type="desktop" />
                <span>VIP7 Count</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="18">
              <Link to="/testpay">
                <Icon type="desktop" />
                <span>Test Pay</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="19">
              <Link to="/forbidroles">
                <Icon type="desktop" />
                <span>Forbidroles</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="20">
              <Link to="/forceswitch">
                <Icon type="desktop" />
                <span>Forceswitch</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="21">
              <Link to="/marcharmy">
                <Icon type="desktop" />
                <span>出征队列查询&操作</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="22">
              <Link to="/buildkey">
                <Icon type="desktop" />
                <span>激活码</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="23">
              <Link to="/generalpowerladder">
                <Icon type="desktop" />
                <span>军官战力排行榜</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="24">
              <Link to="/globalcraft">
                <Icon type="desktop" />
                <span>跨服军备竞赛</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="25">
              <Link to="/batteryfight">
                <Icon type="desktop" />
                <span>边境堡垒</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="26">
              <Link to="/robotManager">
                <Icon type="desktop" />
                <span>机器人</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="27">
              <Link to="/activition">
                <Icon type="desktop" />
                <span>服务器活动</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="28">
              <Link to="/version">
                <Icon type="desktop" />
                <span>版本信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="29">
              <Link to="/worldboss">
                <Icon type="desktop" />
                <span>Worldboss</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="30">
              <Link to="/warland">
                <Icon type="desktop" />
                <span>无主之地</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 , marginBottom:24}} >
            <div className="headername"><Icon type="smile-o" style={{marginRight:5}}/>{name}</div>
          </Header>
          <Content className="height" style={{ margin: '0 16px' , overflow:'auto'}}>
            <div className="height" style={{ padding: 24, background: '#fff', minHeight: 360 , overflow:'auto'}}>
              <Route exact path="/" component={Homepage}/>
              <Route path="/userinfo" component={Userinfo}/>
              <Route path="/leagueinfo" component={League}/>
              <Route path="/mailinfo" component={Mail}/>
              <Route path="/servermailinfo" component={SeverMail}/>
              <Route path="/announceinfo" component={Announce}/>
              <Route path="/sevrverloginfo" component={Serverlog}/>
              <Route path="/goldloginfo" component={Goldlog}/>
              <Route path="/newerloginfo" component={Newerlog}/>
              <Route path="/accountbindinfo" component={Accountbind}/>
              <Route path="/specifiesreward" component={Specifiesreward}/>
              <Route path="/paymail" component={Paymail}/>
              <Route path="/tempactivition" component={TempActivition}/>
              <Route path="/serverinfo" component={Serverinfo}/>
              <Route path="/chatlogs" component={Chatlogs}/>
              <Route path="/paylogs" component={PayLogs}/>
              <Route path="/vip 7" component={Vipcount}/>
              <Route path="/testpay" component={Testpay}/>
              <Route path="/forbidroles" component={Forbidroles}/>
              <Route path="/forceswitch" component={Forceswitch}/>
              <Route path="/marcharmy" component={Marcharmy}/>
              <Route path="/BuildKey" component={BuildKey}/>
              <Route path="/generalpowerladder" component={Generalpowerladder}/>
              <Route path="/globalcraft" component={Globalcraft}/>
              <Route path="/batteryfight" component={Batteryfight}/>
              <Route path="/robotManager" component={RobotManager}/>
              <Route path="/activition" component={Activition}/>
              <Route path="/version" component={Version}/>
              <Route path="/worldboss" component={Worldboss}/>
              <Route path="/warland" component={Warland}/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Home;