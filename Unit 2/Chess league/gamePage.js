//this page is the JavaScript for gamesPage.html

//the intial values of Teams and Games, these will be malluable when filtering
let teams;
let games;

//Checks if local storage will be empty. will only run once unless Local Storage is cleared
if (!localStorage.getItem('games')) {
    populateStorage();
}

//line 7
function populateStorage() {
    localStorage.setItem('teams', JSON.stringify(masterTeamList));
    localStorage.setItem('games', JSON.stringify(masterGameList));
    localStorage.setItem('tableFilter', '');
    teams = JSON.parse(localStorage.getItem('teams'));
    games = JSON.parse(localStorage.getItem('games'));

    //Transfers all of the scores obtained from Games and applys them to Teams
    populateGames();
}

//assuming Populate storage didnt run, assign 'games" and 'teams' with their initial values
teams = JSON.parse(localStorage.getItem('teams'));
games = JSON.parse(localStorage.getItem('games'));

//used for pagination, the current page is initally set to 1
let currPage = 1;

//places the names of all of the "teams" into the "create Game" form
populateForm();

//pulls all of the games out of local strorage and creates the html for them
createGamesHTML();

//determines how many pages are needed and then creates the html for the pages
definePages();

//line 20
function populateGames() {
    games.forEach(r => {
        const homeTeam = r.homeTeam;
        const awayTeam = r.awayTeam;
        const homePoints = r.homePoints;
        const awayPoints = r.awayPoints;
        const result = r.result;

        
        //used to add the values of a game to 'teams', used for both inital setup and whenever a new game is added
        addGameToScore(homeTeam, awayTeam, homePoints, awayPoints, result);
    })
}

//line 31
function populateForm() {    
    teams.forEach(r => {
        const teamName = r.team;
        const homeTeam = document.querySelector('#homeTeam');
        const awayTeam = document.querySelector('#awayTeam');
        
        const newOption = document.createElement('option');
        const twoOption = document.createElement('option');


        newOption.value = teamName;
        newOption.textContent = teamName;

        twoOption.value = teamName;
        twoOption.textContent = teamName;

        
        homeTeam.appendChild(newOption);
        awayTeam.appendChild(twoOption);

    });   
}

//line 35
function createGamesHTML(){
    const gameContainer = document.querySelector('#gameContainer');    
    
    gameContainer.innerHTML = '';        

    games.forEach(g => {
        //game
        const game = document.createElement('div');
        game.className = 'game';
        gameContainer.appendChild(game);

        //gameContent
        const gameContent = document.createElement('div');
        gameContent.className = 'gameContent';
        game.appendChild(gameContent);

        //date
        const date = document.createElement('h3');
        date.className = 'date';
        date.textContent = g.gameDate;
        game.appendChild(date);

        //home innit
        const home = document.createElement('div');        

        //vs innit
        const vs = document.createElement('div');

        //away innit
        const away = document.createElement('div');

        //determine color of game text
        if(g.result === 'win'){
            home.className = 'winner';
            away.className = 'loser';
        }else if(g.result === 'loss'){
            away.className = 'winner';
            home.className = 'loser';
        }else{
            home.className = 'ties';
            away.className = 'ties';
        }

        //append home away & vs
        gameContent.appendChild(home);
        gameContent.appendChild(vs);
        gameContent.appendChild(away); 

        //homeName
        const homeName = document.createElement('h1');
        homeName.className = 'teamName';
        homeName.textContent = g.homeTeam;
        home.appendChild(homeName);

        //pointsScored title (home)
        const pointsScored = document.createElement('h1');
        pointsScored.textContent = "Points Scored:";
        home.appendChild(pointsScored);

        //points
        const points = document.createElement('h1');
        points.textContent = g.homePoints;
        home.appendChild(points)

        //h1 vs
        const vsTitle = document.createElement('h1');
        vsTitle.textContent = "VS";
        vs.appendChild(vsTitle);

        //awayName
        const awayName = document.createElement('h1');
        awayName.className = 'teamName';
        awayName.textContent = g.awayTeam;
        away.appendChild(awayName);

        //pointsScored title (away)
        const pointsScoredAway = document.createElement('h1');
        pointsScoredAway.textContent = "Points Scored:";
        away.appendChild(pointsScoredAway);

        //points
        const pointsAway = document.createElement('h1');
        pointsAway.textContent = g.awayPoints;
        away.appendChild(pointsAway);
    });    
}

//line 37
function definePages(){
    let numPages = Math.ceil(games.length/10);

    if (currPage > numPages){
        currPage = 1;
    }

    const pages = document.querySelector('#pages');
    pages.innerHTML = '';

    for (let i = 0; i < numPages; i++){
        const page = document.createElement('button');
        page.className = 'page';
        page.textContent = i+1;
        if (i+1 === currPage){
            page.id = "currPage"
        }
        pages.appendChild(page);
    }

    const buttons = document.querySelectorAll('.page');
    
    buttons.forEach(
    page => {

        //this is for each of the pagination buttons. they will call changeCurrPage() on click...
        //... which changes the value of currPage and then filters games into a new page
        page.addEventListener('click', changeCurrPage);
    }
    );
}

//these values will trigger filter, the controlling fuction for when the page needs to be updated

//this is the search bar.
const searchFilter = document.querySelector('#searchFilter');
searchFilter.addEventListener('keyup', filter);

//this is the "from" date
const fromDateFilter = document.querySelector('#from');
fromDateFilter.addEventListener('change', filter);

//this is the to date
const toDateFilter = document.querySelector('#to');
toDateFilter.addEventListener('change', filter);

//this is the button in the 'create game' form, calls submittedGame
const submitButton = document.querySelector('#submitGame');
submitButton.addEventListener('click', submittedGame);

//will change Page and call filter. See line 193-194
function changeCurrPage(page){
    let pageValue = parseInt(page.currentTarget.textContent);
    
    if(pageValue !== currPage){
        currPage = pageValue;
        filter();
    }else{
        console.log('no page change')
    }
}

//this is called whenever something is updated for games. whenever someone searches, restricts by date, or changes pages, Filter is called
filter();

//controlling filter. see line 230
function filter(){

    //checks if anything was written in the text box and filters games that match
    filterGamesByName();

    //checks a date was set in the before and after datebox and filters games that match
    filterGamesByDate();

    //takes all remaining games after being filtered and sorts them cronologically
    games = games.sort((a, b)=> {
        return dateToInt(a.gameDate) > dateToInt(b.gameDate) ? 1 : dateToInt(a.gameDate) === dateToInt(b.gameDate) ? 0 : -1;//? : turniary operator
    });

    //checks the number of games left after filtering and creates an appropriate number of pages
    definePages();

    //uses currentPage (currPage) to determine which 10 Games (or less) will be shown on that page
    changePage();    

    //after all filtering and cutting is done, the final games are created on screen
    createGamesHTML();
}

//line 236
function filterGamesByName(){
    let val = searchFilter.value;

    //this filter is the only one to assign Game as LocalStorage, essentially it resets Game from any previous filters
    games = JSON.parse(localStorage.getItem('games')).filter(game => {
        return game['homeTeam'].indexOf(val) >= 0 || game['awayTeam'].indexOf(val) >= 0
    });    
}

//line 239
function filterGamesByDate(){
    let fromVal = fromDateFilter.value;
    let toVal = toDateFilter.value;
    
    if (fromVal !== ''){
        games = games.filter(game => {  
            return dateToInt(game['gameDate']) >= dateToInt(fromVal)
        });
    }
    if (toVal !== ''){
        games = games.filter(game => {
            dateToInt(game['gameDate']) <= dateToInt(toVal)
        });
    }
}

//line 250
function changePage(){
    let pageTo = (currPage*10)
    
    games = games.slice(pageTo-10, pageTo);
}

//this is called when a new game is added, it processes the form into usable data, pushes the new game into local storage, 
//calls  addGameToScore() which will add the game's values to "teams", and finally makes the values within the form blank
function submittedGame (){
    const homeTeam = document.querySelector('#homeTeam').value;
    const awayTeam = document.querySelector('#awayTeam').value;
    const homePoints = document.querySelector('#homePoints').value;
    const awayPoints = document.querySelector('#awayPoints').value;
    const gameDate = document.querySelector('#gameDate').value;
    const result = document.querySelector('input[name$="result"]:checked').value;
    
    submitted = {
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        homePoints: homePoints,
        awayPoints: awayPoints,
        result: result,
        gameDate: gameDate,
    };
    
    games = JSON.parse(localStorage.getItem('games'));
    games.push(submitted);
    localStorage.setItem('games', JSON.stringify(games));
    filter();
    
    addGameToScore(homeTeam, awayTeam, parseInt(homePoints), parseInt(awayPoints), result);
    
    //document.getElementById('#homeTeam') = ;
    document.querySelector('#homeTeam').value = '';
    document.querySelector('#awayTeam').value = '';
    document.querySelector('#homePoints').value = 0;
    document.querySelector('#awayPoints').value = 0;
    document.querySelector('input[name$="result"]:checked').value = null;
}

//used to add the values of a game to 'teams', used for both inital setup and whenever a new game is added
function addGameToScore (homeTeam, awayTeam, homePoints, awayPoints, result){
    teams = JSON.parse(localStorage.getItem('teams'));

    teams.forEach(team => {
        if (team.team === homeTeam){
            
            team.points += homePoints;

            if (result === 'win'){
                team.wins++;
            }else if (result === 'loss'){
                team.loses++;
            }else{
                team.ties++;
            }
        }
        if (team.team === awayTeam){
            
            team.points += awayPoints;

            if (result === 'win'){
                team.loses++;
            }else if (result === 'loss'){
                team.wins++;
            }else{
                team.ties++;
            }
        }
    })

    //pushes this new info into the Local Storage for teams
    localStorage.setItem('teams', JSON.stringify(teams));
}

//A utility fuction that takes the string date format (exp. 2022-03-17) and turns it into a int (exp. 20220317) so that it can be compared to other dates
function dateToInt(date){
    let re = /-/gi;

    return parseInt(date.replace(re, ''));
}

//Called everytime page is booted up. line 370-372
lookForPageHop();

//if you click on a team name in scoreSheet.html, it will populate localStorage.getItem('tableFilter') with the name of the team that was clicked
//so we know that if the local storage isnt empty then we know we were just sent from scoreSheet.html
//so we filter the Games by the name of the team and then reset localStorage.getItem('tableFilter') to be ''
function lookForPageHop() {
    if (localStorage.getItem('tableFilter') !== ''){
        let teamNameFilter = localStorage.getItem('tableFilter');
        localStorage.setItem('tableFilter', '');        
        searchFilter.value = teamNameFilter;
        filter();
    }
}