const express = require('express')
const app = express()
const gju = require("geojson-utils")
const { gameArea, players } = require('./gameData')
app.get('/', (req, res) => res.send('Geo Demo!'))

const currentPlayer = players[0];

//1
app.get("/geoapi/isuserinarea/:lon/:lat", (req, res) => {
    /*
        true:   http://localhost:3000/geoapi/isuserinarea/12.56612777709961/55.7857920758437
        false:  http://localhost:3000/geoapi/isuserinarea/12.575955390930174/55.78287213930687
    */
    const response = {
        status: false,
        msg: "Point was NOT inside tested polygon"
    };

    const point = {
        type: "Point",
        coordinates: [req.params.lon, req.params.lat]
    };

    const isInArea = gju.pointInPolygon(point, gameArea);

    if (isInArea) {
        response.status = true;
        response.msg = "Point was inside the tested polygon";
    }

    res.send(response);
})

app.get("/geoapi/findNearbyPlayers/:lon/:lat/:rad", (req, res) => {
    const playersNearBy = [];

    const center = {
        type: "Point",
        coordinates: [req.params.lon, req.params.lat]
    };

    players.map(p => {
        if (gju.geometryWithinRadius(p.geometry, center, req.params.rad)) playersNearBy.push(p);
    })
    res.send(playersNearBy);
})

app.get("/geoapi/distanceToUser/:lon/:lat/:username", (req, res) => {

    const user = players.find(p => p.properties.name == req.params.username);
    if (user) {
        res.send(
            {
                distance: gju.pointDistance(user.geometry, { type: 'Point', coordinates: [req.params.lon, req.params.lat] }),
                to: req.params.username
            }
        );
    } else {
        res.send(
            {
                msg: "User not found",
                status: 404
            }
        );
    }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))