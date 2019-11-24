import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';




export default function routerView(props) {
    let {routes}=props;
    let routeArr=routes&&routes.filter(item=>!item.to);
    let redirectArr=routes&&routes.filter(item=>item.to).map((item,i)=><Redirect key={i} from={item.path} to={item.to}/>);
    return <Switch>
        {
            routeArr&&routeArr.map((item,index)=>{
                return <Route key={index} path={item.path} render={(props)=>{
                    return <item.component {...props} routes={item.child}/>
                }}/>
            }).concat(redirectArr)
        }
    </Switch>
}