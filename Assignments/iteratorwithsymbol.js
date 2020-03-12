
const obj = {
	name: ['a', 'b', 'c', 'd'],
	age: 28,
	skills: ['m', 'n', 'o'],
	[Symbol.iterator]() {
		let i = 0;
		return {
			next() {
				return obj.name.length > i
					? { done: false, value: obj.name[i++] }
					: { done: true, value: undefined };
			},
		};
	},
};

// for(let j of obj){
//     console.log(j);
// }


const m = obj[Symbol.iterator]();


console.log(m.next());
console.log(m.next());
console.log(m.next());
console.log(m.next());
