let teams = masterTeamList;
let games = masterGameList;

console.log(games);

let isCategorySort = false;
let categorySortDir = 'none';

//populateGames();

//populateForm();

//createTable();

createGames();

definePages()

/*
games.forEach(game => {
    console.log(    dateToInt(game['gameDate'])      );

});*/

//populate the selections in the form
/*function populateForm() {
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
}*/

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
/*
function createTable() {
    const tbody = document.querySelector('tbody');
    if (tbody !== null){
        tbody.innerHTML = '';
    
        teams.forEach(r => {
            const row = document.createElement('tr');
            tbody.appendChild(row);
            for (let key in r) {
                const cell = document.createElement('td');
                cell.textContent = r[key];
                row.appendChild(cell);
            }
            
        });
    }else{
        console.log('tbody is NUll')
    }
}*/

function createGames(){
    const gameContainer = document.querySelector('#gameContainer');

    if (gameContainer !== null){
    
        gameContainer.innerHTML = '';
        console.log('creating games...')

        games = games.sort((a, b)=> {
            return dateToInt(a.gameDate) > dateToInt(b.gameDate) ? 1 : dateToInt(a.gameDate) === dateToInt(b.gameDate) ? 0 : -1;//? : turniary operator
        })

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


    }else{
        console.log('games display is NULL')
    }
}

/*
function sort (evt){//which columnItem is being changed
    let sortField = evt.currentTarget.id;
    console.log('setting ' + sortField);
    //isCategorySort = true;

    if (categorySortDir !== 'acs'){
        categorySortDir = 'acs';
        teams = masterTeamList.sort((a,b) => {
        return (a[sortField] > b[sortField]) ? 1 : (a[sortField] === b[sortField]) ? 0 : -1});//they are sorting category, need to be fed which to change
        
    } else {
        categorySortDir = 'desc';
        teams = masterTeamList.sort((a,b) => {
        return (a[sortField] < b[sortField]) ? 1 : (a[sortField] === b[sortField]) ? 0 : -1});
        
    }
        
    //populateStorage();
    createTable();
}*/


function submittedGame (){
    const homeTeam = document.querySelector('#homeTeam').value;
    const awayTeam = document.querySelector('#awayTeam').value;
    const homePoints = document.querySelector('#homePoints').value;
    const awayPoints = document.querySelector('#awayPoints').value;

    const gameDate = document.querySelector('#gameDate').value


    
    //system will crash if no win is selected// perhaps premade selector?
    const result = document.querySelector('input[name$="result"]:checked').value;
    console.log(gameDate);

    submitted = {
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        homePoints: homePoints,
        awayPoints: awayPoints,
        result: result,
    };

    games.push(submitted);//this will have to be added to local
    
    addGameToScore(homeTeam, awayTeam, parseInt(homePoints), parseInt(awayPoints), result);
    
    //document.getElementById('#homeTeam') = ;
    document.querySelector('#homeTeam').value = '';
    document.querySelector('#awayTeam').value = '';
    document.querySelector('#homePoints').value = 0;
    document.querySelector('#awayPoints').value = 0;
    document.querySelector('input[name$="result"]:checked').value = null;
}

function addGameToScore (homeTeam, awayTeam, homePoints, awayPoints, result){

    teams.forEach(team => {
        if (team.team === homeTeam){
            //console.log(team);
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
            //console.log(team);
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
    createTable();  
}


//document.querySelectorAll('th').forEach((th) => th.addEventListener('click', sort));

const submitButton = document.querySelector('#submitGame');

submitButton.addEventListener('click', submittedGame);
//-should I create separate JS's for separate pages

const searchFilter = document.querySelector('#searchFilter');
const fromDateFilter = document.querySelector('#from');
const toDateFilter = document.querySelector('#to');

function filterGamesByName(){
    console.log(searchFilter.value);
    let val = searchFilter.value;

    games = masterGameList.filter(game => {
        return game['homeTeam'].indexOf(val) >= 0 || game['awayTeam'].indexOf(val) >= 0
    });

    
        
    //createGames();
}

function filterGamesByDate(){
    let fromVal = fromDateFilter.value;
    let toVal = toDateFilter.value;

    console.log(fromVal);
    console.log(dateToInt(fromVal));

    console.log(toVal);
    console.log(dateToInt(toVal));


    games = masterGameList.filter(game => {
        return dateToInt(game['gameDate']) >= dateToInt(fromVal) || dateToInt(game['gameDate']) <= dateToInt(toVal)
    });

    //createGames();
}

searchFilter.addEventListener('keyup', filterGamesByName);

//QUESTION is there a better event listener than "input"
fromDateFilter.addEventListener('change', filterGamesByDate);
toDateFilter.addEventListener('change', filterGamesByDate);

function dateToInt(date){
    let re = /-/gi;

    return parseInt(date.replace(re, ''));
}

function definePages(){
    let numPages = Math.ceil(games.length/10);

    const pages = document.querySelector('#pages');

    for (let i = 0; i < numPages; i++){
        const page = document.createElement('button');
        page.className = 'page';
        page.textContent = i+1;
        pages.appendChild(page);
    }
}

document.querySelectorAll('.page').forEach((page) => page.addEventListener('click', changePage));

function changePage (page){
    let pageIndex = page.currentTarget.textContent;
    let pageTo = (pageIndex*10)
    
    if (games.length > pageTo){
        games = games.slice(pageTo-10, pageTo);
        //createGames();
    }
    

    console.log(pageTo)
}

function filter(){
    //all filtering/sorting/paging comes thorugh here and only then is CreateGames called
    filterGamesByName();

    filterGamesByDate();

    createGames();




    createGames()
}



/*const filter = () => {
    let val = search.value;
    companies = masterList.filter(company => 
        company['category'].indexOf(val) >= 0 || copany['name'].indexOf(val)>=0
    );
    createTable();
}*/ //use filter code later

//.search.addEventListener('keyup', filter);

