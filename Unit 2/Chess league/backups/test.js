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

function filter(){

    console.log('filter, filter, filter away');
    //all filtering/sorting/paging comes thorugh here and only then is CreateGames called
    filterGamesByName();

    filterGamesByDate();

    definePages();

    changePage();    

    createGames();
}

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
        pages.appendChild(page);
    }

    const buttons = document.querySelectorAll('.page');
    
    buttons.forEach(
    page => {
        console.log('adding listener...');
        page.addEventListener('click', changeCurrPage);
    }
    );
}