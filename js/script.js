const form = document.querySelector("#form");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const description = document.querySelector("#description");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    description.innerHTML = `<div class="loader-wrapper"><span class="loader"></span></div>`;

    let searchedWord = searchInput.value;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`)
        .then(response => response.json())
        .then(data => renderData(data))
        .catch(err => renderError(err))

    function renderData(data) {
        description.innerHTML = `
                <dl>
                    <dt class="termin">${data[0].word} - ${data[0].phonetics[0].text ? data[0].phonetics[0].text : data[0].phonetics[1].text}</dt>
                    <dd>
                        ${data[0].meanings[0].definitions[0].definition}
                        <p>${data[0].meanings[0].definitions[0].example ? 'Examples: ' + data[0].meanings[0].definitions[0].example : 'no examples'}</p>
                    </dd> 
                </dl>
                <audio controls src="${data[0].phonetics[0].audio ? data[0].phonetics[0].audio : data[0].phonetics[1].audio}"></audio>`
    }

    function renderError(err) {
        console.error(err);
        description.innerHTML = `<h3 class="not-found-text">Not Found :'(</h3>`

    }

    e.target.reset();

})