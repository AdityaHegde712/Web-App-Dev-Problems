const student = {"name":"Blop", "age": 15, "Marks": "Depressing"};

// Converting student to a json
const obj = JSON.stringify(student);
console.log(obj)

// Converting it back to a js object
const stud = JSON.parse(obj)
console.log("")