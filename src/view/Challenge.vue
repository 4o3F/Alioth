<template>
    <div class="d-flex align-center flex-column">
        <v-row dense>
            <!-- 挑战详情 -->
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        {{ challenge.challengeTitle }}
                    </v-card-title>
                    <v-card-text>
                        {{ challenge.challengeContent }}
                    </v-card-text>
                    <v-card-actions>
                        <v-container style="text-align: center">
                            <v-btn prepend variant="outlined" color="primary" prepend-icon="mdi-login-variant">
                                参与挑战
                            </v-btn>
                        </v-container>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card>
                    <v-list>
                        <v-list-item v-for="participant in challenge.challengeParticipants" :key="participant.uid"
                            style="text-align: center">
                            <v-list-item-header>
                                <v-list-item-title>
                                    <h2 class="text-center">
                                        {{ participant.data }}
                                    </h2>
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    <span class="text-primary">UID: {{ participant.uid }}</span>
                                </v-list-item-subtitle>
                                <v-list-item-action>
                                    <v-container style="text-align: center">
                                        <v-btn variant="outlined" rounded="lg" color="info" @click="toBilibili(participant.bv)">{{participant.bv}}</v-btn>
                                    </v-container>
                                </v-list-item-action>
                            </v-list-item-header>


                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import axios from 'axios'
import Constants from '../utils/Constants'

class ChallengeClass {
    constructor() {
        this.challengeID = 1
        this.challengeTitle = ""
        this.challengeContent = ""
        this.challengeParticipants = []
    }
}

class ChallengeParticipantClass {
    constructor() {
        this.data = 0
        this.bv = ""
        this.uid = 0
    }
}

export default {
    data() {
        return {
            challenge: new ChallengeClass()
        }
    },
    methods: {
        initChallenge(challenge) {
            axios.get(Constants.apiBaseUrl + "/challenge/" + challenge.challengeID + "/detail")
                .then(function (response) {
                    if (response.data.code == 200) {
                        challenge.challengeTitle = response.data.data.challengeTitle
                        challenge.challengeContent = response.data.data.challengeContent
                    } else {

                    }
                })
        },
        initChallengeParticipants(challenge) {
            axios.get(Constants.apiBaseUrl + "/challenge/" + challenge.challengeID + "/participants")
                .then(function (response) {
                    if (response.data.code == 200) {
                        for (var i = 0; i < response.data.data.challengeParticipants.length; i++) {
                            var participant = new ChallengeParticipantClass()
                            participant.data = response.data.data.challengeParticipants[i].data
                            participant.bv = response.data.data.challengeParticipants[i].bv
                            participant.uid = response.data.data.challengeParticipants[i].uid
                            challenge.challengeParticipants.push(participant)
                        }
                    }
                })
        },
        toBilibili(bv) {
            window.open('https://www.bilibili.com/video/'+bv,'_blank')
        }
    },
    mounted() {
        this.challenge.challengeID = this.$route.params.challengeID
        this.initChallenge(this.challenge)
        this.initChallengeParticipants(this.challenge)
    }
}
</script>