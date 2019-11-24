import React, { Component } from 'react';
import { Pagination } from 'antd';
import{getlist,dellist,addlist,editlist}from '@/requests/index';
export default class  extends Component {
    state={
        show:false,
        type:1,
        time:'',
        title:'',
        rank:1,
        stat:1,
        amount:'',
        writer:'',
        limit:1,
        total:10,
        page:1,
        list:[],
        method:'',
        id:''
    }
    render() {
        let {show,type,time,title,stat,rank,amunt,limit,total,page,list,writer}=this.state;
        return (
            <div id='send'>
                <div className='addbtn' onClick={this.addtable.bind(this,'add')}>
                    添加
                </div>
              <table>
                  <thead>
                    <tr>
                      <td>序号</td>
                      <td>时间</td>
                      <td>标题</td>
                      <td>作者</td>
                      <td>重要性</td>
                      <td>阅读数</td>
                      <td>状态</td>
                      <td>操作</td>
                    </tr>
                  </thead>
                  <tbody>
                      {
                          list&&list.map((item,index)=>{
                              return <tr key={index}>
                          <td>{item.id}</td>
                              <td>{item.time}</td>
                              <td>{item.title}</td>
                          <td>{item.writer}</td>
                          <td>{item.rank}</td>
                              <td>{item.amount}</td>
                              <td>{item.State}</td>
                              <td><button onClick={this.edit.bind(this,item)}>编辑</button><button>发布</button><button onClick={this.delete.bind(this,item.id)}>删除</button></td>
                              </tr>
                          })
                      }
                  </tbody>
              </table>
              <Pagination defaultCurrent={page} total={total} pageSize={limit} onChange={this.changepage.bind(this)}/>
             {
                 show? <div className="shade">
                            <main>
                                <header>
                                    <span></span>
                                    <span onClick={this.addtable.bind(this,'exit')}>X</span>
                                </header>
                                <p>
                                    <span>
                                        类型
                                    </span>
                                    <select value={type} name='type' onChange={this.change.bind(this)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </p>
                                <p>
                                    <span>
                                        时间
                                    </span>
                                    <input type="date"  value={time} name='time' onChange={this.change.bind(this)}/>
                                </p>
                                <p>
                                    <span>
                                        标题
                                    </span>
                                   <input type="text"  value={title} name='title' onChange={this.change.bind(this)}/>
                                </p>
                                <p>
                                    <span>
                                        状态
                                    </span>
                                    <select  value={stat}  name='stat' onChange={this.change.bind(this)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </p>
                                <p>
                                    <span>
                                        作者
                                    </span>
                                    <input type="text"  value={writer} name='writer' onChange={this.change.bind(this)}/>
                                </p>
                                <p>
                                    <span>
                                        重要性
                                    </span>
                                    <select value={rank} name='rank' onChange={this.change.bind(this)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </p>
                                <p>
                                    <span>
                                        点评
                                    </span>
                                   <textarea name="" id="" cols="30" rows="10" name='comment'>

                                   </textarea>
                                </p>
                                <p><span className='addbtn' onClick={this.submit.bind(this)}>GO</span></p>
                            </main>
                       </div>:null
             }
            </div>
        )
    }
    addtable(type){//点击添加事件
        if(type=='add'||type=='exit'){
            this.setState({
                show:!this.state.show,
                type:1,
                time:'',
                title:'',
                State:'',
                rank:1,
                method:'add'
                
            })
        }else{
            console.log('编辑')
            let {type,title,time,writer,State,rank,id}=JSON.parse(window.localStorage.item);
          
            this.setState({
                type,
                time,
                title,
                State,
                rank,
                writer,
                method:'edit',
                id
                
            },()=>{
                
                let {type,title,time,writer,State,rank}=this.state
                this.setState({
                    show:!this.state.show
                })
            })
        }
        
    }
    change(e){
        let key=e.target.name;
        let val=e.target.value;
        this.setState({
            [key]:val
        })
    }
    changepage(n){
       let {limit}=this.state;
        this.getdata(n,limit);
    }
    componentDidMount(){
       let {page,limit}=this.state;
       this.getdata(page,limit);
    }
   async delete(id){
    let {list}=this.state;
    let res=await dellist({id})
            if(res.data.code==0){//删除成功
                let idx=list.findIndex(item=>item.id==id);
                list.splice(idx,1);
                this.setState({list})
            }
    }
   async submit(){//添加修改提交
    let {show,type,time,title,stat,rank,amount,writer,method,id}=this.state;
    if (time === '' || title === '' || writer === '') {
        alert('内容不能为空')
       
    }else if(method=='add'){
    let res=await addlist({show,type,time,title,State:stat,rank,amount,writer});
    console.log(res)
    console.log('提交添加')
    if(res.data.code==0){
        this.setState({
            show:!this.state.show
        })
      this.props.history.go(0);
    }else{
        alert('标题重复')
    }

    }else if(method=='edit'){
        console.log('提交修改')
        let res=await editlist({type,time,title,State:stat,rank,amount,writer,id});
        if(res.data.code==0){
            this.setState({
                show:!this.state.show
            })
          this.props.history.go(0);
        }else{
            alert('修改失败')
        }
    }
   }
 async  getdata(page,limit){
    let res=await getlist({page,pageSize:limit});
    this.setState({
        list:res.data.data,
        total:res.data.total,
        page
    })
   }
   edit(item){
       window.localStorage.item=JSON.stringify(item);
       this.addtable('edit');
   }
}
