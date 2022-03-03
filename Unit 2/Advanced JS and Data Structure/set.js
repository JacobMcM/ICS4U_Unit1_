//set is a collection similar to an array except no duplicates and is unordered(no index's)
/*
const arr = [1,2,4,5,5,6,3,8];
console.log(arr);

const uniqueVals = new Set(arr);//removes all duplicates from arr, thats the most powerful feature of set

console.log(uniqueVals);//


const arrNoDups = [...uniqueVals];

console.log(arrNoDups)
*/

let stuff = new Set();
console.log(stuff);

stuff.add(5);
stuff.add(3);
stuff.add('hello');
stuff.add(96);
stuff.add('Ukraine');
stuff.add(4201);
stuff.add((a,b) => a+b);
stuff.add('friend');
stuff.add(393893893893898398398398393898393893893893893893893893893839893893);

console.log(stuff);

stuff.delete(3);//removes the value of stuff equal to 3, therefor removes the second value '3'
console.log(stuff);

console.log(stuff.size);
console.log(stuff.has(5));
console.log(stuff.has(3));

stuff.forEach(el=>{console.log(el)});