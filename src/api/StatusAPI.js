import axios from "axios";
import apiConfig from "./APIConfig.js";

class StatusAPI {
    fetchStatus(callback) {
        axios.get(apiConfig.API_BASE_URL + "/status")
            .then(response => {
                if (response.data.code!=200){
                    callback(undefined)
                    return
                }
                callback(response.data.data)
            })
    }
}
let statusAPI;
statusAPI = new StatusAPI()
export default statusAPI