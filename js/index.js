//GitHub search up - searches for all users w/ given name

//Add event listener to search bar
let searchBar = document.querySelector("#github-form")
searchBar.addEventListener('submit',sendNameRequest)   //callback send name request to handle request

function sendNameRequest(e){    //takes event as an argument
    e.preventDefault()  //prevents page refreshing when submit is done
    const inputName = document.querySelector("#search")
    fetch(`https://api.github.com/search/users?q=${inputName.value}`)
    .then(resp => resp.json())
    .then(profilesData => {
        (profilesData.items).forEach(profile => handleProfileData(profile))
    })
}

//Posting data obtained using GET() request
function handleProfileData (profileObj){
    const userList = document.querySelector("#user-list")
    let user = document.createElement("li")
    
    user.innerHTML = (`
        login: ${profileObj.login},
        <br>
        avatar: ${profileObj.avatar_url},
        <br>
        profile: ${profileObj.url} 
        
    `)
    userList.appendChild(user)
    user.addEventListener("click",(e)=>{
        fetch(`https://api.github.com/users/${profileObj.login}/repos`)
        .then(resp=>resp.json())
        .then(repos=>{
            appendRepo(repos)//repos.forEach(repo => appendRepo(repo))
        })
    })
}

//
function appendRepo(repos){
    //console.log(repos)
    const repoList = document.getElementById("repos-list")
    repos.forEach(repo => {
        console.log(repo)
        const userRepos = document.createElement("li")
        const archiveURL = repo.archive_url
        console.log(archiveURL)
        userRepos.innerHTML = `
            ${archiveURL}
        `
        repoList.appendChild(userRepos)
    })
    
}