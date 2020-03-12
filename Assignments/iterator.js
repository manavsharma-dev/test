
// data-structure

const obj = {
	name: ['a', 'b', 'c', 'd'],
	age: 28,
	skills: ['m', 'n', 'o'],
};

/*
 creating iterator with next method that returns
 the iterable data-structure's required content

*/

function objIterator(object) {
	let i = 0;
	return {
		next() {
			return object.name.length > i
				? { done: false, value: object.name[i++] }
				: { done: true, value: undefined };
		},
	};
}

/*

 implementing iterator on given data-structure by
 passing the data-structure to iterator as argument

*/
const iterator = objIterator(obj);

// obtaining data-structure's values by calling next method

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
