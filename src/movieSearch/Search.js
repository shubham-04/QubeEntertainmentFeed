import React,{Component} from 'react';
import './search.css';
import Back from './Img/movieBackground.jpg';
import { Redirect } from 'react-router-dom';
import Modal from 'react-awesome-modal';
import {TiDelete} from 'react-icons/ti';
import Loader from '../Spinner/loader';

let title='';
let type='';
var types = [
  {label: 'All', value: '' , isCheck:false},
  {label: 'Movie', value: 'movie' , isCheck:false },
  {label: 'Series', value: 'series' , isCheck:false },
];
const customStyles = {
  content: {
    top: '10%',
    left: '15%',
    height: '75%',
    width: '75%',
    border: "1px solid black",
  }
};
class Search extends Component {
  constructor(props){
    super(props);
    this.state={
      isActive:false,
      searchRes:[],
      movieInfo:{},
      searchQuery:'',
      isLoading: false
    }
    this.movieSearch= this.movieSearch.bind(this);
    this.typechange= this.typechange.bind(this);
    this.loadSearchData= this.loadSearchData.bind(this);
    this.serachQre=""; 
  }
	
  componentWillUnmount(){
    title='';
  }
	
  typechange(e){
    type=e.target.value;
    this.movieSearch();
  }
  
  movieSearch(){
    this.setState({isLoading:true});
    let filterUrl=''
    if(type!==''){
      filterUrl='https://www.omdbapi.com/?s='+title+'&apikey=dd2171f8&type='+type;
    } else{
      filterUrl='https://www.omdbapi.com/?s='+title+'&apikey=dd2171f8';
    }
    fetch(filterUrl,{
            method:'GET'
            }
        ).then(response => {return response.json();})
        .then((findresponse)=>{
            let temp=[];
            if(findresponse.Search !== ""){
                let imdbID=[];
                for(let i in findresponse.Search){
                    if(imdbID.indexOf(findresponse.Search[i].imdbID) === -1) {
                       imdbID.push(findresponse.Search[i].imdbID) 
                        temp.push(findresponse.Search[i]);
                    }//to check for duplicate value
                }
            }
            this.setState({searchRes:temp, isLoading:false});
        });
  }

  loadSearchData = (id) =>{
    if(id.altKey !== undefined){
      this.setState({movieInfo:{}});
    }  else {
      this.setState({isLoading:true});
      fetch('https://www.omdbapi.com/?apikey=dd2171f8&i='+id,{
        method:'GET'
        }
        ).then(response => {return response.json();})
        .then((findresponse)=>{
            this.setState({movieInfo:findresponse, isLoading:false});
        });
    }
     
    this.setState({
      isActive: !this.state.isActive
    });
  }

  render(){
    let red=null;
    if (!this.props.location.state) {
      red=<Redirect to='/' />
    }
    else {
      if(title!==this.props.location.state.title){
        title=this.props.location.state.title;
        this.movieSearch();
      }
      
    }
    
    return (
      <div>
        {red}
        <div style={{
                position: 'absolute',
                height:'100%',
                backgroundImage: `url(${Back})`,
                width:'100%',
                minHeight:'70em',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                zIndex: '-10',
                top:'0%',
                opacity: '.7'
            }}></div>
        <div className='divTypeFilter'>
          {this.state.isLoading?
          <Loader/>:null
          }
          <p>Type</p>
          {
            types.map(function(item){
              if(item.isCheck){
                return <span key={item.value}><input className="typeRadioBut" type="radio" checked onChange={this.typechange} name="type" value={item.value}/>{item.label}</span>
              } else{
                return <span key={item.value}><input className="typeRadioBut" type="radio" onChange={this.typechange} name="type" value={item.value}/>{item.label}</span>
              }
            }.bind(this))
          }
        </div>
        <h1 onChange={this.titlechange}>Search result for {title}</h1>
        <div className="divRepeat">
          { 
              this.state.searchRes.map(function(item) {
                  return<div key={item.imdbID}><div className="container MovieTableimg"><img style={{width:'10vw',height:'auto'}} alt="Background" src={item.Poster} onClick={()=>this.loadSearchData(item.imdbID)}></img></div>
                  <div><p className="title">{item.Title}</p><p className="title">{item.Year}</p></div></div> 
              }.bind(this))
          }
        </div>
        <Modal style={customStyles} visible={this.state.isActive} width="1000" height="600" effect="fadeInLeft" onClickAway={this.loadSearchData}>
        <div className="modalDiv">
						<span className="modalHeader">{this.state.movieInfo.Title}</span>
            <TiDelete className="deleteIcon" onClick={this.loadSearchData}/>
						</div>
            <div className='movieDiv'><img style={{marginTop:'7%',float:"left",width:'35%'}} src={this.state.movieInfo.Poster} alt="movie"></img>
            <div style={{marginTop:'7%',float:"right",width:'65%',display:'flex'}}>
            <table><tbody>
              <tr><td className='movieInfo'>Title:</td><td className='movieInfo'>{this.state.movieInfo.Title}</td></tr>
              <tr><td className='movieInfo'>Director:</td><td className='movieInfo'>{this.state.movieInfo.Director}</td></tr>
              <tr><td className='movieInfo'>Cast:</td><td className='movieInfo'>{this.state.movieInfo.Actors}</td></tr>
              <tr><td className='movieInfo'>Genre:</td><td className='movieInfo'>{this.state.movieInfo.Genre}</td></tr>
              <tr><td className='movieInfo'>Released:</td><td className='movieInfo'>{this.state.movieInfo.Released}</td></tr>
              { this.state.movieInfo.BoxOffice!==undefined?
                <tr><td className='movieInfo'>BoxOffice:</td><td className='movieInfo'>{this.state.movieInfo.BoxOffice}</td></tr>:null
              }
              <tr><td className='movieInfo'>Rated:</td><td className='movieInfo'>{this.state.movieInfo.Rated}</td></tr>
              <tr><td className='movieInfo'>Writer:</td><td className='movieInfo'>{this.state.movieInfo.Writer}</td></tr>
              { this.state.movieInfo.Ratings!==undefined?
                this.state.movieInfo.Ratings.map(function(item) {
                  if(item.Source!=='Internet Movie Database'){
                    return <tr key={item.Source}><td className='movieInfo'>{item.Source}:</td><td className='movieInfo'>{item.Value}</td></tr>
                  } else{
                    return <tr key={item.Source}><td className='movieInfo'>IMDB:</td><td className='movieInfo'>{item.Value}</td></tr>
                  }
              }):null}
            </tbody></table></div></div>
        </Modal>
      </div>
    );
}
}

export default Search;
