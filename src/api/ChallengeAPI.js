import axios from "axios";
import apiConfig from "./APIConfig.js";

class ChallengeAPI {

    fetchDetail(id, callback) {
        axios.get(apiConfig.API_BASE_URL+ '/challenges/'+id+'/detail')
            .then(response => {
                if (response.data.code!=200) {
                    callback(undefined)
                }
                callback(response.data.data)
            })
    }

    fetchParticipants(id, callback) {
        axios.get(apiConfig.API_BASE_URL + '/challenges/'+ id +'/participants')
            .then(response => {
                if (response.data.code!=200) {
                    callback(undefined)
                }
                var data = response.data.data.challenge_participants.sort((a,b) => {
                    return a.data - b.data
                })
                callback(data)
            })
    }

    fetchTrending(callback) {
        axios.get(apiConfig.API_BASE_URL+ '/challenges/trending')
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

    joinChallenge(id,data,bv,uid,callback) {
        if (id,data,bv,uid==undefined) {
            callback(false, '数据输入不完整')
            return;
        }
        if (uid.length != 9) {
            callback(false, 'UID数据格式不正确')
            return;
        }
        if (!(/(BV.*?).{10}/).test(bv)){
            callback(false, 'BV号格式不正确')
            return;
        }
        axios.post(apiConfig.API_BASE_URL+'/challenges/'+id+'/join',
            {
                "challenge_id": id,
                "data": data,
                "bv":bv,
                "uid":uid
            })
            .then(response => {
                if (response.data.code!=200) {
                    callback(false, response.data.msg)
                } else {
                    callback(true, "参与成功! 2s后自动跳转挑战详情")
                }
            })
    }
}

let challengeAPI;
challengeAPI = new ChallengeAPI()
export default challengeAPI