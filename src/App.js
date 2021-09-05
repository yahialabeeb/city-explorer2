import React from 'react';
import axios from 'axios';

import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locData: {},
      locName: '',
      showData: false,
      mapURL: ''
      
    }
  }
  getData = async (e) => {
    e.preventDefault();

    await this.setState({
      locName: e.target.cityname.value,
     
    })
    console.log('s', this.state.locName);
    let locURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.locName}&format=json`;

    let comingData = await axios.get(locURL)


    console.log('s', comingData.data[0]);

     await this.setState({
      cityData: comingData.data[0],
      showData: true  
      
    })
    let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&format=json`
  
    await this.setState({
      mapURL: mapUrl
    })
  }


  render() {

    return (
      <>
        <h2>
          City explorer
        </h2>
        <form onSubmit={this.getData}>
          <input type="text" name="cityname" placeholder="enter city name" />
          <button>
            show location
          </button>
        </form>

        {this.state.showData &&
          <p>{this.state.locName} Lat:{this.state.cityData.lat} /Lon:{this.state.cityData.lon} </p> 
        }
          {this.state.showData &&
          <img src = {this.state.mapURL} alt = "anything"/>
        }

      </>
    );
  }
}
export default App;