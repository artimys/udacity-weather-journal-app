// Personal API Key for OpenWeatherMap API
const apiKey = 'e6e6da6d5cf0d93be8c55ae967a6e11d&units=imperial';
const apiBaseUri = "https://api.openweathermap.org/data/2.5/weather?";
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e6e6da6d5cf0d93be8c55ae967a6e11d
// https://openweathermap.org/current#zip

const newEntryButton = document.querySelector("button#generate");
const entryList = document.querySelector("#entries");

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Function called by event listener */
const addEntry = (event) => {
    event.preventDefault();

    // Call OpenWeatherMap API
    //

    // Build object
    const entryData = {
        temp: "api",
        content: document.querySelector("#feelings").value
    }

    // Submit object to server side API
    postData("http://localhost:8000/addEntry", entryData)
        .then(newRecord => {
            insertEntry(newRecord);
        });
};

// Event listener to add function to existing HTML DOM element
newEntryButton.addEventListener("click", addEntry);


/* Function to GET Web API Data*/
const getTemp = async (url = '', data = {})=> {
    console.log(data);

    const response = await fetch(url, {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        // console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

/* Function to POST data */
const postData = async (url = '', data = {})=> {
    console.log("new entry:", data);

    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        // mode: "no-cors",
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
        // mode: "no-cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        }
    });

    try {
        const allData = await response.json();
        // console.log(allData);
        return allData;
    } catch (error) {
        console.log("get error: ", error);
    }
}



const insertEntry = (obj) => {
    const newEntryHTML = `
        <div id="entry-id" class="entry">
            <div id="date">date: ?</div>
            <div id="temp">temp: ${obj.temp}</div>
            <div id="content">content: ${obj.content}</div>
        </div>`;

    entryList.innerHTML += newEntryHTML;
};

const init = () => {
    getData("http://localhost:8000/all")
        .then(data => {
            if (Object.keys(data).length === 0) {
                return;
            }

            for (const key in data) {
                insertEntry(data[key]);
            }
        });
};

init();


// https://api.openweathermap.org/data/2.5/weather?zip=10801,us&appid=e6e6da6d5cf0d93be8c55ae967a6e11d&units=imperial
