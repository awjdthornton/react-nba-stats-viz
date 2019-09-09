# nba-stats-viz
Vizualizations for data from [stats.nba.com]

Documentation support for the stats.nba.com api provided at 
[nbasense.com/nba-api/]  (php package)

[github.com/bttmly/nba] (nodeJS package)

[github.com/swar/nba_api] (pypi package)

Recent analysis of endpoints
[https://github.com/swar/nba_api/blob/master/analysis_archive/stats/analysis.json]

**Due to CORS restrictions, you can't live query NBA stats from javascript in the browser. Instead you need to use a backend-server. This project uses some static json files created to display data.**

# Initial data 

2018-19 team totals for regular season and playoffs using Win percentage.

regular season UI -> [https://stats.nba.com/teams/traditional/?Season=2018-19&SeasonType=Regular%20Season]
regular season API -> [https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&LastNGames=0&LeagueID=&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=&PaceAdjust=N&PerMode=Totals&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2018-19&SeasonSegment=&SeasonType=Playoffs&ShotClockRange=&StarterBench=&TeamID=&TwoWay=&VsConference=&VsDivision=]

playoffs UI -> [https://stats.nba.com/teams/traditional/?Season=2018-19&SeasonType=Playoffs]
playoffs API -> [https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&LastNGames=0&LeagueID=&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=&PaceAdjust=N&PerMode=Totals&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2018-19&SeasonSegment=&SeasonType=Playoffs&ShotClockRange=&StarterBench=&TeamID=&TwoWay=&VsConference=&VsDivision=]

#color pallete used
https://colorhunt.co/palette/155241
