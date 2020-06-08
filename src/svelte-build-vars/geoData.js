require('isomorphic-fetch');
const Papa = require('papaparse')
 
module.exports = fetch('https://franknoirot.co/map-animator/assets/zip_lat-long.csv')
    .then(async function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        
        const resText = await response.text()

        return Papa.parse(resText, { 
            header: true,
        }).data
    })
    .then(function(stories) {
        console.log(stories);
    });