//this page is the JavaScript for scoreSheet.html

//the intial values of Teams and Games, these will be malluable when filtering
let teams;
let games;

//Checks if local storage will be empty. will only run once unless Local Storage is cleared
if (!localStorage.getItem('teams')) {
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

//assuming Populate storage didnt run, assign "games" and "teams" with their initial values
teams = JSON.parse(localStorage.getItem('teams'));
games = JSON.parse(localStorage.getItem('games'));

let isCategorySort = false;
let categorySortDir = 'none';

//places the names of all of the teams into the "create Game" form
populateForm();

//will build the html table of scores. also used to refresh table when new data is entered into "teams"
createTable();

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

//line 34
function createTable() {
    const tbody = document.querySelector('tbody');
    
    tbody.innerHTML = '';
    
    teams.forEach(r => {
        const row = document.createElement('tr');
        tbody.appendChild(row);
        for (let key in r) {
           
            const cell = document.createElement('td');
            cell.textContent = r[key];
            if (key === 'team'){
                cell.className = 'teamHeader';
            }
            row.appendChild(cell);
        }
        
    });
}   

//when a colmn is clicked it will call this to sort its contents from acending or decending
function sort (evt){
    let sortField = evt.currentTarget.id;
    
    if (categorySortDir !== 'acs'){
        categorySortDir = 'acs';
        teams = JSON.parse(localStorage.getItem('teams')).sort((a,b) => {//dont pull from Masterlist /// IMPORTANT
        return (a[sortField] > b[sortField]) ? 1 : (a[sortField] === b[sortField]) ? 0 : -1});//they are sorting category, need to be fed which to change
        
    } else {
        categorySortDir = 'desc';
        teams = JSON.parse(localStorage.getItem('teams')).sort((a,b) => {
        return (a[sortField] < b[sortField]) ? 1 : (a[sortField] === b[sortField]) ? 0 : -1});
        
    }


    createTable();
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
    
    addGameToScore(homeTeam, awayTeam, parseInt(homePoints), parseInt(awayPoints), result);

    document.querySelector('#homeTeam').value = '';
    document.querySelector('#awayTeam').value = '';
    document.querySelector('#homePoints').value = 0;
    document.querySelector('#awayPoints').value = 0;
    document.querySelector('#gameDate').value = null;
    document.querySelector('input[name$="result"]:checked').value = null;
}

//line 67
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

    //pushes this new info into the Local Storage for teams
    localStorage.setItem('teams', JSON.stringify(teams));
}

//calls sort when a colm is called, see line 94
document.querySelectorAll('th').forEach((th) => th.addEventListener('click', sort));

//this is the button in the 'create game' form, calls submitted Game, see 114-115
const submitButton = document.querySelector('#submitGame');
submitButton.addEventListener('click', submittedGame);

//this is every team name on the scoresheet. calls filterBySelectedTeam(). see line 197-198
const teamHeaders = document.querySelectorAll('.teamHeader');
teamHeaders.forEach(
    page => {
        page.addEventListener('click', filterBySelectedTeam)
    }
);

//takes the value of the team name clicked and puts it into local storage. then switches windows to gamePage.html
//Gamepage will pull from local storage and sort games based on what was clicked
function filterBySelectedTeam(evt) {
    let teamNameFilter = evt.currentTarget.textContent

    localStorage.setItem('tableFilter', teamNameFilter);

    window.location.href = 'games.html';
}
