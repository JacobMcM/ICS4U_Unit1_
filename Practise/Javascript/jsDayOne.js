//variables

let x = 7; //declared a var
const names = ['Jakie', 'Amy', 'Sunil']; //const is a constant (unchangable) var

// let and const are scope sensitive

//var types:
//number
//object
let name = 'William';
// string (with a bunch of functions that come with similar to java)
let isFinished = false;

let tes = 3/2; //yeilds 1.5 'number' variable
let test = 3%2; // yeilds 1, 'number' variable

x = '7'

//null v undefined

// null is on purpose, undef is not

let sample = null; //null is typeOf object
let sample2; //defining a variable with no value
//console.log(sample3); //this will return error that sample3 is undefined

/*
typeof null => Object;
typeof 7 = Number;
typeof 'hi' = String;
typeof Array() => Object;
*/

//== vs ===, == will check for same value (aka 7 == '7' is true), === will check for same type (aka 7 === '7' is false)
//                                        (false == 0 is true)(false === 1 is false)
// === and !== will both check for type as well

//0 and 1 can be treated as booleans in some languages
//but === will make it false b/c different types


//if statement
//these are exactly the same in JS and Java

//turnary operator
x = 7;
let isEven;

if (x%2 ==0){
    isEven = true;

}else{
    isEven = false;
}

isEven = (x%2 ==0) ? true : false;//after ? happens if true, after : happens if false

//10 over is yellow
//20 over or more is red
//otherwise green

let color = (x>20) ? 'red': (x>10)? 'yello': 'green';

function nameOfFunction(x, y){
    return x+y;
}

console.log(nameOfFunction(3,2));

//anontmous func: function stored in a var

let func = function(x,y){
    return x*y;
}


//arrays
const numbers = Array(10);
numbers[4] = 3; // every value will be undef except for the value at [4]

numbers.push(1); //adds a new array value (length equals 11) and adds a number value (1)

numbers.pop(1);//



//types of for loops for arrays

//hits every element even if undef
for (let i = 0; i <names.length;i++){
    console.log(names[i]);
}

//like a foreach loop that skips over the undefs
for (let name of names){
    console.log(name);
}

const marks = [80,87,88,92]

let student = {};//cirly braces define as "object" type
student.name = 'Jack Prack';
student.id = '1193729';
student.marks = marks;

/*

student.average = function() {
    let totalMarks =0;
    for (let mark of this.marks) {
        totalMarks += mark;
    }

    return totalMarks / this.marks.length;
}

console.log(student.average());
*/

//iterate thru map

//properties that are vars can go in [] instead of using the operator

for (let prop in student){
    console.log(student[prop]);
}

//JSON and JSON methods
//JSON stands for java

const jsonString = JSON.stringify(names);

console.log(names);
console.log(jsonString);

const jsonString2 = '["hello", "steve", "paper"]';

console.log(JSON.parse(jsonString2));


console.log(JSON.stringify(student));
