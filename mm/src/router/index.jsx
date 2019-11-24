import React from 'react';
import { BrowserRouter} from 'react-router-dom';

import routes from './routerConfig';
import RouterView from './routerView';

export default function(){
    return <BrowserRouter>
        <RouterView routes={routes}/>
    </BrowserRouter>
}