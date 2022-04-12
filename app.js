//process is a global object that represents everything going on with this particular app
//argv property of process is an array that holds exactly what was typed into the command line upon execution
//const profileDataArgs = process.argv.slice(2, process.argv.length)
//console.log(profileDataArgs)


// Notice the lack of parentheses around the 'profileDataArr parameter!?
const printProfileData = profileDataArr => {
    // This...
    for (let i = 0; i < profileDataArr.length; i += 1){
        console.log(profileDataArr[i])
    } 

    console.log('================')

    // Is the same as this...
    profileDataArr.forEach(profileItem => console.log(profileItem))

}
