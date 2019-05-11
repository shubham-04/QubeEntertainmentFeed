import React, { Component } from 'react';
import './HomePage.css';
import Starwars from './Images/starwars.jpg';
import HarryPotter from './Images/harryPotter.jpg';
import Avengers from './Images/909185.jpg';
import Batman from './Images/batman.jpg';
import movieBackground from './Images/entertainmentfeedBackGround.jpg';

let quotesData=[];
let active=true;
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
           quotesList:[],
           quotes:[],
           counter:0
        }
    }
    componentWillMount(){
        active=true;
        const data= require('./quotes.json');
        quotesData=data;
        this.slide();
    }

    componentWillUnmount(){
        active=false;
    }

    slide=()=>{
        let count=this.state.counter;
        let quote=[];
        if(count===4){
            count=0;
        }
        for(let i=count;i<count+2;i++){
            quote.push(quotesData[i]);
        }
        if(active){
            this.setState({quotes:quote,counter:count+2});
            setTimeout(this.slide,5000);
        }
    }

    render(){
        return (
            <div>
            <div style={{
                position: 'absolute',
                height:'100%',
                backgroundImage: `url(${movieBackground})`,
                width:'100%',
                minHeight:'100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                zIndex: '-10',
                top:'0%',
                opacity: '.5'
            }} ></div>
                <div>
                <div className="leftTab">
                <img src={Starwars} alt="starwars" className="circle"></img>
                <img src={HarryPotter} alt="HarryPotter" className="circle"></img>
                </div>
                <div className="rightTab">
                <img src={Avengers} alt="starwars" className="circle"></img>
                <img src={Batman} alt="HarryPotter" className="circle"></img>
                </div>
                {
                    this.state.quotes.map(function(item) {
                        return <div className="moviequote" key={item.by}><h1>{item.quotes}</h1><h4>{item.by}</h4></div>
                    })
                }
                </div>
            </div>
        );
    }
}

export default Home;