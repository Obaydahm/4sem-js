//const [, , ...nums] = process.argv;
console.log(process.argv.slice(2).reduce((sum, current) => +sum + +current));