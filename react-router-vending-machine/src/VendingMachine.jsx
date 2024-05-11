import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Item from './Item';
import Home from './Home';
import Nav from './Nav';

const VendingMachine = () => {
    return (
        <div className='vending-machine'>
            <BrowserRouter>
            <Nav></Nav>
                <Routes>
                    <Route path='/' element={<Home></Home>}/>
                    <Route path='/coke' element={<Item name="coke"></Item>}/>
                    <Route path='/pepsi' element={<Item name="pepsi"></Item>}/>
                    <Route path='/snickers' element={<Item name="snickers"></Item>}/>
                    <Route path='/kitkat' element={<Item name="kitkat"></Item>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default VendingMachine