/* Personal API Key for OpenWeatherMap API
 * Resource: https://openweathermap.org/current#zip
 */
const apiKey = 'KEY_HERE&units=imperial';
const apiBaseUri = "https://api.openweathermap.org/data/2.5/weather?zip=";
const newEntryButton = document.querySelector("button#generate");
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();


//---------------------------------------------------------------------------------------------------

/**
 * @description Calls OpenWeatherMap API and custom API to add entry from form fields
 * @param {event} event - click event from button
 */
const addEntry = event => {

    if (isEntryFormValid()) {
        // Get user zip code
        const userZip = document.querySelector("#zip").value;

        // Build OpenWeatherMap API URL
        const openWeatherEndpoint = `${apiBaseUri}${userZip},us&appid=${apiKey}`;

        // Call OpenWeatherMap API
        getWeatherTemp(openWeatherEndpoint)
        .then(weatherData => {
            // Return temp from JSON
            return weatherData.main.temp;
        })
        .then(temp => {
            // Build new entry object
            const entryData = {
                temp: temp,
                content: document.querySelector("#feelings").value,
                date: newDate
            }

            // Submit object to server side API
            postData("http://localhost:8000/addEntry", entryData)
            .then((response) => {
                // Call API to get fetch ProjectData and update UI
                loadData();
            });
        });
    }
};

/**
 * @description Validate form fields; zip code must be 5-digit number and feelings cannot be blank
 * @param {event} event - click event from button
 * @return {boolean} true => field(s) are valid; false => field(s) are invalid
 */
const isEntryFormValid = () => {
    const inputZip = document.querySelector("#zip");
    const inputFeelings= document.querySelector("#feelings");
    let isValid = true;

    if ( /^[0-9]{5}$/.test(inputZip.value) ) {
        inputZip.classList.remove("field-invalid");
        inputZip.nextElementSibling.textContent = "";
    } else {
        inputZip.classList.add("field-invalid");
        inputZip.nextElementSibling.textContent = "please enter a 5-digit zip code (US)";
        isValid = false;
    }

    if ( inputFeelings.value !== "" ) {
        inputFeelings.classList.remove("field-invalid");
        inputFeelings.nextElementSibling.textContent = "";
    } else {
        inputFeelings.classList.add("field-invalid");
        inputFeelings.nextElementSibling.textContent = "please enter your feelings";
        isValid = false;
    }

    return isValid;
}

/**
 * @description Call API to fetch ProjectData and update UI
 */
const loadData = () => {
    getData("http://localhost:8000/all")
    .then(data => {
        if (Object.keys(data).length === 0) {
            return;
        }
        updateEntry(data);
    });
};

/**
 * @description Update DOM with entry object values
 * @param {object} obj - entry object from Project Data { temp: ..., content: ..., date: ...}
 */
const updateEntry = (obj) => {
    document.querySelector("#temp").textContent = `${Math.round(obj.temp)} degrees`;
    document.querySelector("#content").textContent = obj.content;
    document.querySelector("#date").textContent = obj.date;
};

// Add Event listener to form button
newEntryButton.addEventListener("click", addEntry);


// FETCH CALLS
//---------------------------------------------------------------------------------------------------

/**
 * @description GET Web API Data
 * @param {string} url - API URL
 */
const getWeatherTemp = async (url)=> {
    const response = await fetch(url);

    try {
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log("openweather error", error);
    }
}

/**
 * @description POST API Data
 * @param {string} url - API URL
 * @param {object} data - entry object
 */
const postData = async (url = '', data = {})=> {
    // console.log("new entry:", data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("post error", error);
    }
}

/**
 * @description GET Project Data
 * @param {string} url - API URL
 */
const getData = async (url = '')=> {
    const response = await fetch(url, {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        }
    });

    try {
        const allData = await response.json();
        return allData;
    } catch (error) {
        console.log("get error: ", error);
    }
}


// INITIAL PAGE LOAD
//---------------------------------------------------------------------------------------------------

/**
 * @description Function to run on initial page load
 */
const init = () => {
    loadData();
};

init();