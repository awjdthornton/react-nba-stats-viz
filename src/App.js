import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  state = {
    regSeasonData: [],
    playoffsData: [],
    mergedData: [],
  }
  
  //Permanent team abbreviations and conference assignments
  teamNameConfMapping = [
                        { "Milwaukee Bucks":"MIL",
                          "Conference": "Eastern",
                        },
                        { "Toronto Raptors":"TOR",
                          "Conference": "Eastern",
                        },
                        { "Golden State Warriors":"GSW",
                          "Conference": "Western",
                        },
                        { "Philadelphia 76ers":"PHI",
                          "Conference": "Eastern",
                        },
                        { "Boston Celtics":"BOS",
                          "Conference": "Eastern",
                        },
                        { "Houston Rockets":"HOU",
                          "Conference": "Western",
                        },
                        { "Denver Nuggets":"DEN",
                          "Conference": "Western",
                        },
                        { "Portland Trail Blazers":"POR",
                          "Conference": "Western",
                        },
                        { "San Antonio Spurs":"SAS",
                          "Conference": "Western",
                        },
                        { "LA Clippers":"LAC",
                          "Conference": "Western",
                        },
                        { "Brooklyn Nets":"BKN",
                          "Conference": "Eastern",
                        },
                        { "Oklahoma City Thunder":"OKC",
                          "Conference": "Western",
                        },
                        { "Orlando Magic":"ORL",
                          "Conference": "Eastern",
                        },
                        { "Utah Jazz":"UTA",
                          "Conference": "Western",
                        },
                        { "Detroit Pistons":"DET",
                          "Conference": "Eastern",
                        },
                        { "Indiana Pacers":"IND",
                          "Conference": "Eastern",
                        },
                      ];
  
  parseData = (data) => {
    console.log('Data passed to parseData()', data);
    let headers = data.headers;
    let rowSet = data.rowSet;
    let cleanData = [];
    
    //combine separate arrays into a single array of objects with headers as keys
    for (let row of rowSet) {
      let newObj = {};
      for (let [i,header] of headers.entries()) {
        newObj[header] = row[i];
      }
      
      //add team abbreviation and conference
      for (let team of this.teamNameConfMapping) {
        //if matching on team name then add new properties of TEAM_ABR and TEAM_CONF
        if (team[newObj["TEAM_NAME"]]) {
          newObj["TEAM_ABR"] = team[newObj["TEAM_NAME"]];
          newObj["TEAM_CONF"] = team["Conference"];
        }
      }
      
      cleanData.push(newObj);
    }
    
    return cleanData;
  }
  
  getRegSeason = () => {
      fetch("./data/2018_19_RegSeason_Team_Data.json")
      .then(response => response.json())
      .then(data => {
        this.setState({
          regSeasonData : this.parseData(data.resultSets[0]),
        })
        
        this.getPlayoffs();
      });
  }

  getPlayoffs = () => {
    fetch("./data/2018_19_Playoffs_Team_Data.json")
      .then(response => response.json())
      .then(data => {
        
        this.setState({
          playoffsData : this.parseData(data.resultSets[0]),
        })
        
        this.mergeDataSets();
      });
  }
  
  mergeDataSets = () => {
    console.log('regSeasonData ->',this.state.regSeasonData);
    console.log('playoffData ->',this.state.playoffsData);

    //merge the import elements from the two data sets
    let comboData = []
    
    for (let p of this.state.playoffsData) {
      let mergedObj = {};
      for (let r of this.state.regSeasonData) {
        if (p.TEAM_ABR === r.TEAM_ABR) {
          mergedObj["TEAM_ABR"] = p.TEAM_ABR;
          mergedObj["TEAM_CONF"] = p.TEAM_CONF;
          mergedObj["REG_W_PCT"] = Math.round(r.W_PCT*100);
          mergedObj["PLYOFF_W_PCT"] = Math.round(p.W_PCT*100);
        }
      }
      comboData.push(mergedObj);
    }
    
    this.setState({
      mergedData: comboData
    })
    console.log('comboData ->', comboData)
    
  //  render('All');
  }
  
  componentDidMount = () => {
    console.log('componentDidMount');
    
    this.getRegSeason();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
  
}

export default App;
