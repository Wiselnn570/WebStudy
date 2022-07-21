import React, { Component } from 'react';
import NavBar from './navBar';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './content/home';
import Calculator from './content/calculator';
import List from './content/list';
import SoftWare from './content/softWare';
import Boxes from './content/boxes';
import NotFound from './content/notFound';
import Login from './content/login';
import Register from './content/register';

class App extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <NavBar />
                <div className="container">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/list' element={<List />} />
                        <Route path='/softWare' element={<SoftWare />}>
                            <Route path='/softWare/boxes' element={<Boxes />}/>
                            <Route path='/softWare/calcualtor' element={<Calculator />}/>
                        </Route>
                        <Route path='/login' element={<Login />}/>
                        <Route path='/register' element={<Register />}/>
                        <Route path='/404' element={<NotFound/>}/>
                        <Route path='*' element={<Navigate replace to="/404"/>} />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}
 
export default App;