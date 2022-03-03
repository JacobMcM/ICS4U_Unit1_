const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
 ];
 
 const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

 /*
for (let i = 0; i < companies.length; i++) {
    console.log(companies[i])
}

companies.forEach(function (company){
    console.log(company);
})

companies.forEach(company => console.log(company));*/

//filter does what each of those above do ^

const canVote = [];
/*
for (let i = 0; i <ages.length; i++){
    if (ages[i] >= 18){
        canVote.push(ages[i]);
    }
}
console.log(canVote);
console.log(ages);*/
/*
canVote = ages.filter(function(age){
    return age >= 18
})*/
/*
canVote = ages.filter(age => age >= 18);

console.log(canVote);

const isTech = [];

isTech = companies.filter(company => company.category === 'Technology');
console.log(isTech);

let eightys = companies.filter(conpany => company.start >= 1980 && company.end < 1990);
console.log(eightys);*/

/*
const sortAges = ages.sort(function (a, b){
    return a-b;
});

const sortAges2 = ages.sort((a, b) => a - b); //will sort the "ages" in ages
console.log(sortAges);


//sort companys based on years
const sortedCompanies1 = companies.sort((a,b) => a.start - b.start);
console.log(sortedCompanies1);

//sort based on category
const sortedCompanies2 = companies.sort((a,b)=> {
    return a.category > b.category ? 1 : a.category === b.category ? 0 : -1;//? : turniary operator
})*/


//map
//const companyNames = companies.map(company => company.name);
//console.log(companyName);
/*
const companyYearsOfOperation = companies.map(company => `${company.name} (${company.start} - ${company.end})`);
console.log(companyYearsOfOperation);

const test = ages.map(() => 4);
console.log(test);



//reduce (reduce array to a single thing)

const ageSum = ages.reduce(function(total, age) {// (total is previous element (or total) or previous reduced value, age is the next element in array)
    return total + age;
}, 0);//total starts with nothing
*//*

const str = ['a', 'b', 'c'].reduce((prev, curr) => prev + curr, '');
console.log(str);*/



const combined = ages.map(age =>age*2).filter(age => age >= 40).sort((a,b) => a-b);
console.log(combined);