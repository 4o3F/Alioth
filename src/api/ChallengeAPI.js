import axios from "axios";
import apiConfig from "./APIConfig.js";

class ChallengeAPI {

    fetchDetail(id, callback) {
        axios.get(apiConfig.API_BASE_URL+ '/challenge/'+id+'/detail')
            .then(response => {
                if (response.data.code!=200) {
                    callback(undefined)
                }
                callback(response.data.data)
            })
    }

    fetchParticipants(id, callback) {
        axios.get(apiConfig.API_BASE_URL + '/challenge/'+ id +'/participants')
            .then(response => {
                if (response.data.code!=200) {
                    callback(undefined)
                }
                var data = response.data.data.challengeParticipants.sort((a,b) => {
                    return a.data - b.data
                })
                callback(data)
            })
    }

    fetchTrending(callback) {
        axios.get(apiConfig.API_BASE_URL+ '/challenge/trending')
            .then(response => {
                if (response.data.code!=200) {
                    callback(undefined)
                }
                var data = response.data.data.sort((a,b) => {
                    return a.score - b.score
                })
                callback(data)
            })
    }
}

let challengeAPI;
challengeAPI = new ChallengeAPI()
export default challengeAPI