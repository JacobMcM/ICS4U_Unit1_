const fields = {'prop1' : 1, 31: 2, 'prop3' : 3};

console.log(fields['prop1']);
console.log(fields[31]);


const obj1 = {'prop1':1}
const obj2 = {'prop':2}
const badObject = {obj1 : 'Dentist', obj2: 'Doctor'};
/*console.log(badObject);

console.log(badObject['obj1'], badObject['obj2'])*/

const map1 = new Map();
map1.set('prop1', 1);
map1.set('prop2', 2);

console.log(map1);//like n object but with functions (.set)

console.log(map1.keys());
console.log(map1.values());
console.log(map1.entries());
console.log(map1.size);
console.log(map1.has('prop'));


map1.forEach((val, key) => {console.log(val, ley)})