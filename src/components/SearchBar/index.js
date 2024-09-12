import React from "react";
import { useState } from "react";
import AppTheme from "../../context/theme";
import { CiSearch } from "react-icons/ci";
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'

const SearchBar = (props)=>{
    const {searchVal,setSearchVal,searchButtonClick} = props
    return(
        <AppTheme.Consumer>
                {
                value=>{
                    const {activeTheme} = value
                    return(
                        <div className={`w-100 d-flex justify-content-center justify-content-md-start search-component`}>
                            <input value={searchVal} className={`search-bar search-bar-${activeTheme}`}  type="search"
                                onChange={(event)=>{setSearchVal(event.target.value)}} 
                                placeholder="Search"
                                />
                            <div className={`search-icon search-icon-${activeTheme}`} onClick={searchButtonClick}>
                                <CiSearch />
                            </div>
                        </div>
                    )
                }}
        </AppTheme.Consumer>
    )
}
export default SearchBar