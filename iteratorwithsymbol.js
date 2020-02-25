
let obj = {
    name: ["a","b","c","d"],
    age: 28,
    skills: ["m", "n", "o"],
    [Symbol.iterator](){
        let i = 0;
        return {
            next:function(){
            return obj.name.length > i ?
            { done: false, value: obj.name[i++] }:
            { done: true, value: undefined };
            }
        }
    }
}

// for(let j of obj){
//     console.log(j);
// }

