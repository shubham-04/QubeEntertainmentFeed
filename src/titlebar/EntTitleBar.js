import React, { Component } from 'react';
import {FaSearch} from 'react-icons/fa';
import {TiHomeOutline} from 'react-icons/ti';
import './titleBar.css';

class TitleBar extends Component{
    constructor(props){
        super(props);
        this.movieSearch=this.movieSearch.bind(this);
        this.movieTextChange=this.movieTextChange.bind(this);
        this.home = this.home.bind(this);
    }
    
    home=()=>{
        this.props.history.push('/'); 
    }
    movieSearch = ()=>{
        const title=document.getElementById('mSearch').value;
        if(title!==""){
            let path = `/Search`;
            this.props.history.push({
                pathname: path,
                state: {title:title }
            });
            
        }
    }

    movieTextChange= (event) =>{
        if(event.keyCode === 13){
            this.movieSearch();
        }
    }

    render(){
        return (
                <div className="webHeader">
                <TiHomeOutline className="home" onClick={this.home}></TiHomeOutline><p className="App-logo">𝕰𝖓𝖙𝖊𝖗𝖙𝖆𝖎𝖓𝖒𝖊𝖓𝖙 𝕱𝖊𝖊𝖉</p>
                <div className="movieSearchBox"> 
                    <input className="movieSearchText" type="text" id="mSearch" placeholder="Search" onKeyUp={this.movieTextChange}></input>
                    <span className="movieSearchBtn"  onClick={this.movieSearch}>
                    <FaSearch />
                    </span>
                    </div>
                </div>
        )
    }
}

export default TitleBar;
