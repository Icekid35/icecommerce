const values=[0,1, ' ']

while(true){
   process.stdout.write(`${values[Math.round(Math.random()*(values.length-1))]}`)
}