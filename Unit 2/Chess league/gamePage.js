let teams;
let games;

if (!localStorage.getItem('games')) {
    //console.log('poulating Storage')
    populateStorage();
}

function populateStorage() {
    localStorage.setItem('teams', JSON.stringify(masterTeamList));
    localStorage.setItem('games', JSON.stringify(masterGameList));
    localStorage.setItem('tableFilter', '');
    teams = JSON.parse(localStorage.getItem('teams'));
    games = JSON.parse(localStorage.getItem('games'));
    populateGames();
}

teams = JSON.parse(localStorage.getItem('teams'));
games = JSON.parse(localStorage.getItem('games'));


let isCategorySort = false;
let categorySortDir = 'none';

let currPage = 1;

populateForm();

createGamesHTML();

definePages();

//setup

function populateGames() {
    games.forEach(r => {
        const homeTeam = r.homeTeam;
        const awayTeam = r.awayTeam;
        const homePoints = r.homePoints;
        const awayPoints = r.awayPoints;
        const result = r.result;
        addGameToScore(homeTeam, awayTeam, homePoints, awayPoints, result);
    })
    //scoresheet should not need populate games after first run through. will be drawing from localStorage instead
}

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
        //console.log('adding listener...');
        page.addEventListener('click', changeCurrPage);
    }
    );
}

//filter trigger values
const searchFilter = document.querySelector('#searchFilter');
searchFilter.addEventListener('keyup', filter);

const fromDateFilter = document.querySelector('#from');
fromDateFilter.addEventListener('change', filter);

const toDateFilter = document.querySelector('#to');
toDateFilter.addEventListener('change', filter);

const submitButton = document.querySelector('#submitGame');
submitButton.addEventListener('click', submittedGame);

function changeCurrPage(page){
    let pageValue = parseInt(page.currentTarget.textContent);
    
    if(pageValue !== currPage){
        currPage = pageValue;
        filter();
    }else{
        console.log('no page change')
    }
}

filter();

//filter
function filter(){

    //console.log('filter, filter, filter away');
    //all filtering/sorting/paging comes thorugh here and only then is CreateGames called
    filterGamesByName();

    filterGamesByDate();

    games = games.sort((a, b)=> {
        return dateToInt(a.gameDate) > dateToInt(b.gameDate) ? 1 : dateToInt(a.gameDate) === dateToInt(b.gameDate) ? 0 : -1;//? : turniary operator
    });

    definePages();

    changePage();    

    createGamesHTML();
}
//filter functions
function filterGamesByName(){
    let val = searchFilter.value;

    games = JSON.parse(localStorage.getItem('games')).filter(game => {
        return game['homeTeam'].indexOf(val) >= 0 || game['awayTeam'].indexOf(val) >= 0
    });    
}

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

function changePage(){
    let pageTo = (currPage*10)
    
    games = games.slice(pageTo-10, pageTo);
}

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

function addGameToScore (homeTeam, awayTeam, homePoints, awayPoints, result){//this shouold be added to local storage not teams
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

    localStorage.setItem('teams', JSON.stringify(teams));
}

/* add this back soon
const submitButton = document.querySelector('#submitGame');

submitButton.addEventListener('click', submittedGame);
//-should I create separate JS's for separate pages
*/

function dateToInt(date){
    let re = /-/gi;

    return parseInt(date.replace(re, ''));
}

lookForPageHop();

function lookForPageHop() {
    if (localStorage.getItem('tableFilter') !== ''){
        let teamNameFilter = localStorage.getItem('tableFilter');
        localStorage.setItem('tableFilter', '');        
        searchFilter.value = teamNameFilter;
        filter();
    }
}