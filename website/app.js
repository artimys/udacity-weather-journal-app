/* Personal API Key for OpenWeatherMap API
 * Resource: https://openweathermap.org/current#zip
 * Working API example: https://api.openweathermap.org/data/2.5/weather?zip=10801,us&appid=e6e6da6d5cf0d93be8c55ae967a6e11d&units=imperial
 */
const apiKey = 'e6e6da6d5cf0d93be8c55ae967a6e11d&units=imperial';
const apiBaseUri = "https://api.openweathermap.org/data/2.5/weather?zip=";
const newEntryButton = document.querySelector("button#generate");
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Function called by event listener */
const addEntry = event => {
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
        .then(newRecord => {
            updateEntry(newRecord);
        });
    })
};

// Event listener to add function to existing HTML DOM element
newEntryButton.addEventListener("click", addEntry);

/* Function to GET Web API Data */
const getWeatherTemp = async (url)=> {
    const response = await fetch(url);

    try {
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log("openweather error", error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {})=> {
    console.log("new entry:", data);

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

/* Function to GET Project Data */
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



const updateEntry = (obj) => {
    document.querySelector("#temp").textContent = `${Math.round(obj.temp)} degrees`;
    document.querySelector("#content").textContent = obj.content;
    document.querySelector("#date").textContent = obj.date;
};

const init = () => {
    getData("http://localhost:8000/all")
        .then(data => {
            if (Object.keys(data).length === 0) {
                return;
            }
            updateEntry(data);
        });
};

init();