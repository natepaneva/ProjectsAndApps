// FIRST VERSION



const btnPeople = document.getElementById("btnPeople");
const btnShips = document.getElementById("btnShips");

const result = document.getElementById("result");
const loader = document.getElementById("loader");

const btnNext= document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");

const baseUrl = "https://swapi.co/api/"
let pageMode = '';
let currentPage = 1;

// const getPeople = (page) => {
//     const url = `${baseUrl}people/?page=${page}`
//     toggleLoader(true);
//     $.ajax({
//         url: url,
//         success: (people) => {
//             console.log("The request succedeed!", people);
//             toggleLoader(false);
//             toggleNavButtons(people)
//             displayPeople(people.results);
//         },
//         error: (err) => {
//             console.log(err);
            
//         }
        
//     })
// }
const getPeople = (page) => {
    const peopleUrl = `${baseUrl}people/?page=${page}`
    toggleLoader(true);
    fetch(peopleUrl)
     .then(res => res.json())
     .then(people => {
        console.log("The request succedeed!", people);
                toggleLoader(false);
                toggleNavButtons(people)
                displayPeople(people.results);
    })
    .catch(err => console.log(err))

}

const toggleLoader = (toggle) => {
    if(toggle)
    loader.style.display = 'block';
    else
    loader.style.display = 'none'
}

const displayPeople = (people) => {
    if (people !==null) {
        result.innerHTML = '';
        result.innerHTML += `
        <div class="row" style=" font-size: 30px;">
        <div class="col-md-3">Name</div>
        <div class="col-md-2">Height</div>
        <div class="col-md-2">Mass</div>
        <div class="col-md-2">Gender</div>
        <div class="col-md-2">Birth year</div>
        <div class="col-md-1">Films</div>
      </div>`
     for (const person of people) {
        result.innerHTML+= `
        <hr color="white"/>
         <div class="row">
            <div class="col-md-3">${person.name}</div>
            <div class="col-md-2">${person.height}</div>
            <div class="col-md-2">${person.mass}</div>
            <div class="col-md-2">${person.gender}</div>
            <div class="col-md-2">${person.birth_year}</div>
            <div class="col-md-1">${person.films.length}</div>
         </div>
        `}
    } else {
        result.innerHTML += `<h2>There is something wrong with the data!<h2>`
    }
}




const getShips = (page) => {
    const shipsUrl = `${baseUrl}starships/?page=${page}`
    toggleLoader(true)
    fetch(shipsUrl)
    .then(res => res.json())
    .then(ships => {
        toggleLoader(false);
        toggleNavButtons(ships)
        displayShips(ships.results)
        console.log(ships);
        
    })
    .catch(err => console.log(err))
    
}


// const getShips = () => {
//     const url = 'https://swapi.co/api/starships/?page=1'
//     toggleLoader(true);
//     $.ajax({
//         url: url,
//         success: (ships) => {
//             console.log("The request succedeed", ships);
//             toggleLoader(false);
//             toggleButtons(ships)
//             displayShips(ships.results);
        
//         },
//         error: (err) => {
//             console.log(err);
            
//         }
//     })
// }


const displayShips = (ships) => {
    if (ships !== null) {
        result.innerHTML = '';
        result.innerHTML += `
        <div class="row" style=" font-size: 30px;">
        <div class="col-md-2">Name</div>
        <div class="col-md-2">Model</div>
        <div class="col-md-3">Mannufacturer</div>
        <div class="col-md-2">Cost</div>
        <div class="col-md-2">Capacity</div>
        <div class="col-md-1">Class</div>
        </div>
       `
    
    for (const ship of ships) {
        result.innerHTML += `
        <hr color="white" />
        <div class="row">
            <div class="col-md-2">${ship.name}</div>
            <div class="col-md-2">${ship.model}</div>
            <div class="col-md-3">${ship.manufacturer}</div>
            <div class="col-md-2">${ship.cost_in_credits}</div>
            <div class="col-md-2">${ship.passengers}</div>
            <div class="col-md-1">${ship.starship_class}</div>
         </div>
         
        `}
    } else {
        result.innerHTML += `<h2>There is something wrong with the data!<h2>`
    }
}


const toggleNavButtons = (response) => {
    if (response.next === null) {
        btnNext.style.display = "none"
    }
    else {
        btnNext.style.display = "block"
    }
    if (response.previous === null) {
        btnPrev.style.display = "none"
    }
    else {
        btnPrev.style.display = "block"
    }

}

const getNextPage = (pageType) => {
    ++currentPage;
    pageType === 'people' ? getPeople(currentPage) : null;
    pageType === 'ships' ? getShips(currentPage) : null;
    

}

const getPrevPage = (pageType) => {
    --currentPage;
    pageType === 'people' ? getPeople(currentPage) : null;
    pageType === 'ships' ? getShips(currentPage) : null;
    
}



btnPeople.addEventListener("click", () => {
    currentPage = 1
    getPeople(currentPage);
    pageMode = 'people'
})

btnShips.addEventListener("click", () => {
    currentPage = 1
    getShips(currentPage);
    pageMode = 'ships'
})

btnNext.addEventListener("click", ()=> {
    getNextPage(pageMode)
})

btnPrev.addEventListener("click", ()=> {
    getPrevPage(pageMode)
})



let navigationService = {

}

let starWarsService = {
    
}