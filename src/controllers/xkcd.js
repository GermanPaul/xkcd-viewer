const axios = require('axios');
const xkcdQueryUrl = 'http://xkcd.com/{id}/info.0.json';

module.exports = {
    getXkcdInfo: (req, res) => {
        axios.get(xkcdQueryUrl.replace('{id}', req.query.id), req.body, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            res.json(response.data);
        }).catch(function(error) {
            res.json(error);
        })
    }
}