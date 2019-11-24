import React, { Component } from 'react'
import {login,getrole,getpower}from '@/requests/index';
export default class  extends Component {
    state={
        name:'',
        pwd:''
    }
    render() {
        return (
            <div id="login">
               
                <div className="form">
                     <h2>请登录</h2>
                   <label htmlFor=""> 用户名: <input type="text" name="name" onInput={this.changeInput.bind(this)}/><br/><br/></label>
                    <label htmlFor="">密码: <input type="text" name="pwd" onInput={this.changeInput.bind(this)}/><br/><br/></label>
                    <div className="btn" onClick={this.login.bind(this)}>
                        登陆
                    </div>
                </div>
            </div>
        )
    }
    changeInput(e){//更新受控组件状态
        let key=e.target.name;
        let val=e.target.value;
        this.setState({
            [key]:val
        })
    }
   async login(){//登陆
        let {name,pwd:password}=this.state;
        let _csrf=document.cookie.split('=')[1];
        // console.log(_csrf)
        let res=await login({name,password,_csrf});
            if(res.data.code==0){//登陆成功
                window.localStorage.token=res.data.token;
                // window.localStorage.userinfo=JSON.stringify(res.data.userinfo);
                //用户id
               let id=res.data.userinfo.id

               //获取用户身份
                let role=await getrole({id});//返回一个数组身份和对应的id
               
                 //发请求获取权利
         
                 //获取身份id
                let roleid=(role.data.role).map(item=>item.id)
        
                //利用身份id获取对应的权限
                let data=await getpower({id:JSON.stringify(roleid)})

                //默认路由根据权力而定的
                let defaultRouter=data.data.power[0].url;
                window.localStorage.userinfo=JSON.stringify({
                    userinfo:{
                        ...res.data.userinfo,
                        role:role.data.role,
                        power:data.data.power
                    
                }
                })
                this.props.history.push({
                    pathname:defaultRouter
                })

            }
    }
}
