let teams;
let games;

isChangeable = 1;

if (!localStorage.getItem('teams')) {
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

populateForm();

createTable();

function populateForm() {
    if (document.querySelector('#homeTeam') !== null) {
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
    }else{
        console.log('form is NULL')
    }
}

function populateGames() {
    games.forEach(r => {
        const homeTeam = r.homeTeam;
        const awayTeam = r.awayTeam;
        const homePoints = r.homePoints;
        const awayPoints = r.awayPoints;
        const result = r.result;
        addGameToScore(homeTeam, awayTeam, homePoints, awayPoints, result);
    })
}

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

function sort (evt){//which columnItem is being changed
    let sortField = evt.currentTarget.id;
    console.log('setting ' + sortField);
    //isCategorySort = true;

    if (categorySortDir !== 'acs'){
        categorySortDir = 'acs';
        teams = JSON.parse(localStorage.getItem('teams')).sort((a,b) => {//dont pull from Masterlist /// IMPORTANT
        return (a[sortField] > b[sortField]) ? 1 : (a[sortField] === b[sortField]) ? 0 : -1});//they are sorting category, need to be fed which to change
        
    } else {
        categorySortDir = 'desc';
        teams = JSON.parse(localStorage.getItem('teams')).sort((a,b) => {
        return (a[sortField] < b[sortField]) ? 1 : (a[sortField] === b[sortField]) ? 0 : -1});
        
    }
        
    //populateStorage();
    createTable();
}

function submittedGame (){///after this are we re-creating the table?
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
    //filter();
    
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


document.querySelectorAll('th').forEach((th) => th.addEventListener('click', sort));

const submitButton = document.querySelector('#submitGame');

submitButton.addEventListener('click', submittedGame);

const teamHeaders = document.querySelectorAll('.teamHeader');

teamHeaders.forEach(
    page => {
        page.addEventListener('click', filterBySelectedTeam)
    }
);

function filterBySelectedTeam(evt) {
    let teamNameFilter = evt.currentTarget.textContent

    localStorage.setItem('tableFilter', teamNameFilter);

    window.location.href = 'games.html';
}
