const masterList = [{
    team: "Saint Louis Arch Bishops",
    points: 147,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "USA",
    division: "Western Division",
 },
 {
    team: "Canada Chessbrahs",
    points: 124.5,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "Canada",
    division: "Western Division",
 },
 {
    team: "California Unicorns",
    points: 113,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "USA",
    division: "Western Division",
 },
 {
    team: "New York Marshalls",
    points: 111.5,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "USA",
    division: "Western Division",
 },
 {
    team: "Chicago Wind",
    points: 79.5,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "USA",
    division: "Western Division",
 },
 {
    team: "U.K. Lions",
    points: 57.5,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "UK.",
    division: "Western Division",
 },
 {
    team: "Argentina Krakens",
    points: 48,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "Argentina",
    division: "Western Division",
},
{
    team: "Brazil Capybaras",
    points: 45,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "Brazil",
    division: "Western Division",
},
{
    team: "Armenia Eagles",
    points: 144,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "Arminia",
    division: "Eastern Division",
},
{
    team: "Russia Wizards",
    points: 115.5,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "Russia",
    division: "Eastern Division",
},
{
    team: "India Yogis",
    points: 112,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "India",
    division: "Eastern Division",
},
{
    team: "China Pandas",
    points: 103.5,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "China",
    division: "Eastern Division",
},
{
    team: "Hungary Hunters",
    points: 84,
    wins: 30,
    loses: 1,
    ties: 1,
    county: "Hungary",
    division: "Eastern Division",
},
{
    team: "Israel Counsellors",
    points: 60.5,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "Isreal",
    division: "Eastern Division",
},
{
    team: "Turkey Knights",
    points: 58.5,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "Turkey",
    division: "Eastern Division",
},
{
    team: "Croatia Bulldogs",
    points: 50,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "Croatia",
    division: "Eastern Division",
},
{
    team: "Germany Bears",
    points: 136.5,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "Germany",
    division: "Central Division",
},
{
    team: "France Roosters",
    points: 120.5,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "France",
    division: "Central Division",
},
{
    team: "Norway Gnomes",
    points: 113.5,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "Norway",
    division: "Central Division",
},
{
    team: "Sweden Wasabis",
    points: 92,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "Sweden",
    division: "Central Division",
},
{
    team: "Italy Gladiators",
    points: 84,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "Italy",
    division: "Central Division",
},
{
    team: "Poland Hussars",
    points: 76.5,
    wins: 1,
    loses: 10,
    ties: 1,
    county: "Poland",
    division: "Central Division",
},
{
    team: "Netherlands Mosquitoes",
    points: 57.5,
    wins: 1,
    loses: 1,
    ties: 1,
    county: "Netherlands",
    division: "Central Division",
},
{
    team: "Spain Raptors",
    points: 45.5,
    wins: 1,
    loses: 4,
    ties: 1,
    county: "Spain",
    division: "Central Division",
}
];

let teams = masterList;
let isCategorySort = false;
let categorySortDir = 'none';

const filter = () => {
    let val = search.value;
    companies = masterList.filter(company => 
        company['category'].indexOf(val) >= 0 || copany['name'].indexOf(val)>=0
    );
    createTable();
}


createTable();



function createTable() {
    const tbody = document.querySelector('tbody');
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
}

function sort (evt){//which columnItem is being changed
    let sortField = evt.currentTarget.id;
    console.log('setting ' + sortField);
    //isCategorySort = true;

    if (categorySortDir !== 'acs'){
        categorySortDir = 'acs';
        teams = masterList.sort((a,b) => {
        return (a[sortField] > b[sortField]) ? 1 : (a[sortField] === b[sortField]) ? 0 : -1});//they are sorting category, need to be fed which to change
        
    } else {
        categorySortDir = 'desc';
        companies = masterList.sort((a,b) => {
        return (a[sortField] < b[sortField]) ? 1 : (a[sortField] === b[sortField]) ? 0 : -1});
    
    }
        
    createTable();
}

function yell (stuff){
    console.log(stuff);
}

document.querySelectorAll('th').forEach((th) => th.addEventListener('click', sort));//country not working, look into it


const search = document.querySelector('#search');

/*const filter = () => {
    let val = search.value;
    companies = masterList.filter(company => 
        company['category'].indexOf(val) >= 0 || copany['name'].indexOf(val)>=0
    );
    createTable();
}*/ //use filter code later

//.search.addEventListener('keyup', filter);

