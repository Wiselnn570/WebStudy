import React, { Component } from 'react';
import {Outlet} from 'react-router-dom';

class SoftWare extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <h1>SoftWare</h1>
                <hr />
                <Outlet />
            </React.Fragment>
            
        );
    }
}
 
export default SoftWare;