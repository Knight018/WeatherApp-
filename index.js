import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

function Header1(){
  return (
    <div>
      <div className="hdr"><h2 className="hdr-content">Weather App</h2></div>
      
    </div>
    
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      cityy: '' ,
      loading: true ,
      src:false ,
      weather: null ,
      locn: '' ,
      dayy: '' ,
      date: '' ,
      iconURLL: '' ,
      weatherInfoo: '' ,
      wind: '' ,
      humidity: '' ,
      pressure: '' ,
      maxTemp: '' ,
      minTemp: '' ,
      sunrisee: '' ,
      sunsett: '' ,
      commentt: '' ,
      listOfComments: [] ,
    };
  }

  handleChangeOfComment=event =>{
    this.setState({
      commentt:event.target.value,
    });
  };

  bar = () =>{
    return (
      <div className="bar">
        <input type="text" placeholder="Enter City Name..." onChange={()=>this.setCityy(event)} value={this.state.cityy} />
        <button onClick={this.find}>Search</button>
        </div>
    )
  }

  /*handleChangeOfComment=event =>{
    this.setState({
      comment:event.target.value,
    });
  };*/

  addComment = event =>{
    this.setState({
      listOfComments: [...this.state.listOfComments,this.state.commentt],
      commentt:""
    });
  };


  find = async() =>{ /*api*/
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityy}&APPID=222e7a66e12940066adc0c9db925f076`;
    const response = await fetch(url);
    const myJson = await response.json();
    console.log(myJson);
    this.setState({loading:false, weather:myJson, src:false})
    this.setState({locn: myJson.name+", "+myJson.sys.country})
    this.setState({
      iconURLL: "https://openweathermap.org/img/w/" + myJson.weather[0].icon + ".png",
      weatherInfoo: myJson.weather[0].main,
      wind: myJson.wind.speed,
      humidity: myJson.main.humidity,
      pressure: myJson.main.pressure,
      maxTemp: Math.floor(myJson.main.temp_max - 273)+"°C",
      minTemp: Math.floor(myJson.main.temp_min - 273)+"°C",
    })
    var sr=myJson.sys.sunrise;
    sr=sunIndex(sr);
    var ss=myJson.sys.sunset;
    ss=sunIndex(ss);
    this.setState({
      sunsett: ss,
      sunrisee: sr
    })
  };

  render() {
    if(this.state.loading){
      return (<div>
        <Header1 />
        {this.bar()}
      </div>)
    }
    else if(this.state.src){
      return (<div>
        <Header1 />
        {this.bar()}
        <center><div className="searching"><p>Searching City name...</p></div></center>
      </div>)
    }
    else if(this.state.weather.cod==404){
      return (<div>
        <Header1 />
        {this.bar()}
        <center><div className="notfound"><p>City Name not found</p></div></center>
      </div>)
    }
    else{
    return (
      <div>
        <Header1/>

        {this.bar()}
        <center>
        <div className="container">
          <div className="time"><div>{this.state.locn}, </div> <div>{this.load()}</div></div>

          <div className="content">
            <div className="temperature">
            <div>{Math.floor(this.state.weather.main.temp - 273)}°C</div>
            <div><img src={this.state.iconURLL}/></div>
            </div>
            <div>{this.otherContent()}</div>
          </div>

        </div>
        </center>
        {this.commentBox()}
      </div>
    );}
  }

  commentBox = () =>{
    return(
      <div className="comntContainer">
        <input onChange={event => this.handleChangeOfComment(event)}
      value={this.state.commentt} placeholder="Enter your comment here..." /><br />
        <button onClick={this.addComment}>Comment</button>
        <div>
          Comments({this.state.listOfComments.length})<br/>
          
          {
            this.state.listOfComments.map(eachElm =>(
              <div className="listComnt"><img src="https://png.pngtree.com/png-vector/20190423/ourmid/pngtree-user-icon-vector-illustration-in-glyph-style-for-any-purpose-png-image_975597.jpg" /> <p>{eachElm}</p></div>
            ))
          }


        </div>
      </div>
    )
  }


  setCityy = (event) =>{
    this.setState({
      cityy: event.target.value,
        loading:false,
        src:true
    })
  };


  load = () =>{ /*get day*/
    var today = new Date()
    var d = today.getDate()
    var dayy = ''
    var mont = ''
    var date = today.getDate()
    var yearr = today.getUTCFullYear();
    if(today.getDay()==1)
      dayy ='Mon'
    else if(today.getDay()==2)
      dayy ='Tues'
    else if(today.getDay()==3)
      dayy ='Wed'
    else if(today.getDay()==4)
      dayy ='Thu'
    else if(today.getDay()==5)
      dayy ='Fri'
    else if(today.getDay()==6)
      dayy ='Sat'
    else if(today.getDay()==7)
      dayy ='Sun'
    
    if(today.getMonth()==0) /*get month*/
      mont ='Jan'
    else if(today.getMonth()==1)
      mont ='Feb'
    else if(today.getMonth()==2)
      mont ='Mar'
    else if(today.getMonth()==3)
      mont ='Apr'
    else if(today.getMonth()==4)
      mont ='May'
    else if(today.getMonth()==5)
      mont ='Jun'
    else if(today.getMonth()==6)
      mont ='Jul'
    else if(today.getMonth()==7)
      mont ='Aug'
    else if(today.getMonth()==8)
      mont ='Sept'
    else if(today.getMonth()==9)
      mont ='Oct'
    else if(today.getMonth()==10)
      mont ='Nov'
    else if(today.getMonth()==11)
      mont ='Dec'

    console.log(mont);

    return (<div>{dayy} {mont} {date} {yearr}</div>)

  }

  otherContent = () =>{ /*content to display on loading*/
    return(
      <div className="otherContent">
        <div>
          Weather: <b>{this.state.weatherInfoo}</b><br />
          Wind: <b>{this.state.wind} km/hr</b>
        </div>
        <div>
          Humidity: <b>{this.state.humidity}%</b><br />
          Pressure: <b>{this.state.pressure} Pa</b>
        </div>
        <div>
          Max Temp: <b>{this.state.maxTemp}</b><br />
          Min Temp: <b>{this.state.minTemp}</b>
        </div>
        <div>
          Sunrise: <b>{this.state.sunrisee}</b><br />
          Sunset: <b>{this.state.sunsett}</b>
        </div>
      </div>
    )
  }

}
function sunIndex(sr){ /*sun index*/
    var obj=new Date(sr*1000);
    var d=obj.toUTCString();
    return d.slice(-12,-4);
}

render(<App />, document.getElementById('root'));
