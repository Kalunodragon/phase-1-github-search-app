function init(){
    document.getElementById('github-form')
    .addEventListener('submit', (e) => {
        e.preventDefault()
        let text = e.target.children[0].value
        githubSearchFetch(text)
    })

    function githubSearchFetch(userName){
        return fetch(`https://api.github.com/search/users?q=${userName}`)
        .then(resp => resp.json())
        .then(data => {
            const dataArray = [...data.items]
            dataArray.forEach(user => createUserCard(user))
        })
    }

    function createUserCard(user){
        let h2 = document.createElement('h2')
        h2.innerText = `${user.login}`
        
        let img = document.createElement('img')
        img.src = `${user.avatar_url}`

        let p = document.createElement('p')
        p.innerText = `${user.html_url}`

        let button = document.createElement('button')
        button.innerText = 'Repositories'
        button.addEventListener('click', (e) => {
            repoFetch(`${user.login}`)
        })

        let list = document.getElementById('user-list')
        let listElement = document.createElement('li')

        listElement.append(h2, img, p, button)
        list.appendChild(listElement)
    }

    function repoFetch(userLogin){
        return fetch(`https://api.github.com/users/${userLogin}/repos`)
        .then(resp => resp.json())
        .then(data => {
            const repoArray = [...data]
            repoArray.forEach(repo => createRepoList(repo))
        })
    }

    function createRepoList(repos){
        let li = document.createElement('li')
        let ul = document.getElementById('repos-list')

        li.innerText = `${repos.name}`
        ul.appendChild(li)
    }

}

document.addEventListener("DOMContentLoaded", init)
// Extra bit for headers -> Accept: application/vnd.github.v3+json

//FINISHED // on form submit:
//FINISHED     // use the value of the input to search Github
//FINISHED     // for matches using the User Search Endpoint
//FINISHED         // https://api.github.com/search/users?q=`${username}`
//FINISHED // Take those results and display info about the users on the page
//FINISHED     // (possibly username, avatar, and link to their profile)
// Click event on the user should send a request to the
    // Users Repos Endpoint, then return data on all their repos
        //  https://api.github.com/users/`${username}`/repos
// Using the data from the Users Repos Endpoint,
    // Display all the repos for that user on the page

// Bonus -- Toggle the search between searching users and repos
    // by using an extra button. url -> https://api.github.com/search/repositories