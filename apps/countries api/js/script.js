const input = document.getElementById("input");
const btn = document.getElementById("btn");
const result = document.getElementById("result");
const err = document.getElementById("err");
const loader = document.getElementById("loader")

const getInfo = () => { 
    toggleLoader(true);
    const url = `https://restcountries.eu/rest/v2/name/${input.value}`
    fetch(url)
    .then(response => response.json())
    .then(info => { 
    try {console.log("The request succedeed!", info);
        toggleLoader(false);
        err.innerText = '',
        result.innerHTML= ''
            for (const country of info) {
            result.innerHTML += `
            <tr>
                <td><img src="${country.flag}" alt="flag" width="50px"></td>
                <td>${country.name}</td>
                <td>${country.population}</td>
                <td>${country.capital}</td>
                <td>${country.area}</td>
                <td>${country.languages[0].name}</td>
                <td>${country.currencies[0].name}</td>
            </tr> `
            }
    } catch (error) {
        console.log(error);
        result.innerHTML= ''
        err.innerText = 'You have eneterned an invalid country. Please try again'
        
    }
    })
    .catch(err => console.log(err))
}

const toggleLoader = (toggle) => {
    if(toggle)
    loader.style.display = 'block';
    else
    loader.style.display = 'none'
}

btn.addEventListener("click", getInfo)