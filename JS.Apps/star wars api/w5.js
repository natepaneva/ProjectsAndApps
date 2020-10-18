// SECOND VERSION WITH OBJECTS

let navigationService = {
    btnNext: document.getElementById("btnNext"),
    btnPrev: document.getElementById("btnPrev"),
    btnPeople: document.getElementById("btnPeople"),
    btnShips: document.getElementById("btnShips"),
    pageMode: '',
    currentPage: 1,

    registerListeners: function(){
        this.btnPeople.addEventListener("click", () => {
            this.currentPage = 1;
            starWarsService.getPeople(this.currentPage);
            this.pageMode = 'people';
        });
        this.btnShips.addEventListener("click", () => {
            this.currentPage = 1;
            starWarsService.getShips(this.currentPage);
            this.pageMode = 'ships';
        });
        
        this.btnNext.addEventListener("click", ()=> {
            this.getNextPage(this.pageMode);
        });
        
        this.btnPrev.addEventListener("click", ()=> {
            this.getPrevPage(this.pageMode);
        });

    },
    getNextPage: function(pageType){
        ++this.currentPage;
        pageType === 'people' ? starWarsService.getPeople(this.currentPage) : null;
        pageType === 'ships' ? starWarsService.getShips(this.currentPage) : null;
    },
    getPrevPage: function(pageType){
        --this.currentPage;
        pageType === 'people' ? starWarsService.getPeople(this.currentPage) : null;
        pageType === 'ships' ? starWarsService.getShips(this.currentPage) : null;
    },
    toggleNavButtons: function(response){
        if (!response.next) {
            this.btnNext.style.display = "none"
        }
        else {
            this.btnNext.style.display = "block"
        }
        if (!response.previous) {
            this.btnPrev.style.display = "none"
        }
        else {
            this.btnPrev.style.display = "block"
        }
    }

};

let starWarsService = {
    baseUrl: "https://swapi.co/api/",
    getPeople: function (page){
        const peopleUrl = `${this.baseUrl}people/?page=${page}`
        uiService.toggleLoader(true);
        fetch(peopleUrl)
         .then(res => res.json())
         .then(people => {
            console.log("The request succedeed!", people);
                    uiService.toggleLoader(false);
                    navigationService.toggleNavButtons(people)
                    uiService.displayPeople(people.results);
        })
        .catch(err => console.log(err))
    },
    getShips: function (page){
        const shipsUrl = `${this.baseUrl}starships/?page=${page}`
        uiService.toggleLoader(true)
        fetch(shipsUrl)
        .then(res => res.json())
        .then(ships => {
            uiService.toggleLoader(false);
            navigationService.toggleNavButtons(ships);
            uiService.displayShips(ships.results);
            console.log(ships);
            
        })
        .catch(err => console.log(err))
        
    }
};

let uiService = {
    result: document.getElementById("result"),
    loader: document.getElementById("loader"),
    toggleLoader: function(toggle){
        if(toggle)
        this.loader.style.display = 'block';
        else
        this.loader.style.display = 'none'
    },
    displayPeople: function(people){
        if (people) {
            this.result.innerHTML = '';
            this.result.innerHTML += `
            <div class="row" style=" font-size: 30px;">
            <div class="col-md-3">Name</div>
            <div class="col-md-2">Height</div>
            <div class="col-md-2">Mass</div>
            <div class="col-md-2">Gender</div>
            <div class="col-md-2">Birth year</div>
            <div class="col-md-1">Films</div>
        </div>`
        for (const person of people) {
            this.result.innerHTML+= `
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
            this.result.innerHTML += `<h2>There is something wrong with the data!<h2>`
        }
    },
    displayShips: function(ships){
        if (ships) {
            this.result.innerHTML = '';
            this.result.innerHTML += `
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
            this.result.innerHTML += `
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
            this.result.innerHTML += `<h2>There is something wrong with the data!<h2>`
        }
    }
}

navigationService.registerListeners();