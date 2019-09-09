import React, { Component } from 'react';
import './App.css';


class App extends Component {

  state = {
    regSeasonData: [],
    playoffsData: [],
    mergedData: [],
    conference: 'All',
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
    
  }
  
  componentDidMount = () => {
    this.getRegSeason();
  }
  
  onDimChange = (ev) => {
    this.setState({
      conference: ev.target.value,
    })
  }
  
  alertDiff = (record) => {
    alert(record.TEAM_ABR + " won " + (record.REG_W_PCT - record.PLYOFF_W_PCT) + "% fewer of their games during the playoffs.")
  }
  
  render() {
    return (
        <div className="Viz">
            <div className="VizHeader">
                <h1>2018-19 NBA Regular Season vs. Playoffs Winning %</h1>
                <div className="DimensionChooser">
                  <label>Conference:
                    <select className="DimensionChooser-select" id="dim1" onClick={this.onDimChange}>
                      <option>All</option>
                      <option>Eastern</option>
                      <option>Western</option>
                    </select>
                </label>
                </div>
            </div>
            <div className="VizWrapper" id="chart">
              {
                this.state.mergedData.map((record,index) => (
                  (this.state.conference === "All" || this.state.conference === record.TEAM_CONF) && (
                    <div className="VizItem" key={index} onClick={() => this.alertDiff(record)}>
                      <div className="VizData VizRegular" style={{height: record.REG_W_PCT + "%"}}><label>{record.REG_W_PCT}</label></div>
                      <div className="VizData VizPlayoff" style={{height: record.PLYOFF_W_PCT + "%"}}><label>{record.PLYOFF_W_PCT}</label></div>
                      <div className="VizLabel">{record.TEAM_ABR}</div>
                    </div>
                  )
                ))
              }
            </div>
        </div>
    );
  }
  
}

export default App;
