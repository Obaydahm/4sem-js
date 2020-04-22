
import { SERVER_URL } from "./settings";

ServerFacade = () => {

    const makeOptions = (method, body) => {
        var opts = {
          method: method,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json"
          }
        };
        if (body) {
          opts.body = JSON.stringify(body);
        }
        return opts;
    }

    async function fetchGameArea() {
        const res = await fetch(`${SERVER_URL}/gameapi/gamearea`).then(res => res.json());
        return res.coordinates;
    }

    async function isUserInArea(lon, lat) {
        const status = await fetch(`${SERVER_URL}/gameapi/isuserinarea/${lon}/${lat}`).
            then(res => res.json())
        return status;
    }

    async function getNearbyPlayers(username, password, lon, lat, distance) {
        distance = Number.parseInt(distance, 10);
        const options = makeOptions(
            "POST",
            {
                username,
                password,
                lon,
                lat,
                distance
            }
        )
        const res = await fetch(`${SERVER_URL}/gameapi/nearbyplayers`, options).then(res => res.json());
        return res
    }

    return {
        fetchGameArea,
        isUserInArea,
        getNearbyPlayers
    }
}

export default ServerFacade();