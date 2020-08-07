const axios = require('axios');

export function fetchData(url, defaultData) {
    let data = defaultData;
    axios.get(url)
    .then(function (response) {
        // handle success
        data = response.data;
    })
    .catch(function (error) {
        // handle error
    })
    .then(function () {
        // always executed
    });
    
    return data;
}
