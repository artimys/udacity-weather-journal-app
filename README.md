
# Weather Journal App
An app that combines user input and temperature data from an API (OpenWeatherMap). Combined data is stored in custom backend using Express.js.

![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/artimys/udacity-weather-journal-app?include_prereleases)
![GitHub last commit](https://img.shields.io/github/last-commit/artimys/udacity-weather-journal-app)
![GitHub issues](https://img.shields.io/github/issues-raw/artimys/udacity-weather-journal-app)
![GitHub pull requests](https://img.shields.io/github/issues-pr/artimys/udacity-weather-journal-app)
![GitHub All Releases](https://img.shields.io/github/downloads/artimys/udacity-weather-journal-app/total)
![GitHub](https://img.shields.io/github/license/artimys/udacity-weather-journal-app)


# Demo


# Table of contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [License](#license)
- [Footer](#footer)

# Installation
[(Back to top)](#table-of-contents)

Clone the repo on your device using the command below:

```
git clone https://github.com/artimys/udacity-weather-journal-app.git
```

**Node:**

Have node installed.

**NPM Packages:**

Open terminal, navigate to project folder.

```sh
npm install body-parser
npm install cors
npm install express
npm install --save-dev nodemon
```


# Usage
[(Back to top)](#table-of-contents)

Open terminal, navigate to project folder and start express server.

```sh
# startup server
node server.js

# npx nodemon server.js
```
Open your favorite code editor and open `website/index.html` with your browser.

# Development
[(Back to top)](#table-of-contents)

If constant changes to `server.js`, utilize `nodemon` to auto restart server.

```sh
# startup server
npx nodemon server.js
```

Access API at:
```sh
localhost:8000
```

# License
[(Back to top)](#table-of-contents)

[GNU General Public License version 3](https://opensource.org/licenses/GPL-3.0)