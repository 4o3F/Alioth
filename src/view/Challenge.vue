<template>
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
                <v-card-actions v-if="!joinChallengeForm">
                    <v-container style="text-align: center">
                        <v-btn @click="joinChallengeForm = !joinChallengeForm" prepend variant="outlined"
                            color="success" prepend-icon="mdi-login-variant">
                            参与挑战
                        </v-btn>
                    </v-container>
                </v-card-actions>
            </v-card>
        </v-col>


        <v-col cols="12" v-if="joinChallengeForm">
            <v-card>
                <v-card-content>
                    <v-form ref="form" lazy-validation style="text-align:center">
                        <v-text-field v-model="data" :rules="rules.data" label="数据" required>
                        </v-text-field>
                        <v-text-field v-model="bv" :rules="rules.bv" :counter="12" label="BV号" required>
                        </v-text-field>
                        <v-text-field v-model="uid" :rules="rules.uid" :counter="9" label="UID" required>
                        </v-text-field>
                        <v-checkbox v-model="checkbox" :rules="[v => !!v || '必选项']" label="你是否确认上述信息真实?" required>
                        </v-checkbox>
                        <vue-recaptcha ref="recaptcha" size="invisible" :load-recaptcha-script="true"
                            :recaptcha-host="`www.recaptcha.net`" :sitekey="this.$constants.reCaptchaSiteKey">
                        </vue-recaptcha>
                        <v-btn color="success" prepend variant="outlined" prepend-icon="mdi-login-variant"
                            @click="joinChallenge">
                            参与挑战
                        </v-btn>
                    </v-form>
                </v-card-content>
            </v-card>
        </v-col>

        <v-col v-if="joinChallengeResult.length > 0" cols="12">
            <v-alert v-if="joinChallengeResult == 'success'" type="success">成功!</v-alert>
            <v-alert v-else type="error">{{ joinChallengeResult }}</v-alert>
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
                                    <v-btn variant="outlined" rounded="lg" color="info"
                                        @click="toBilibili(participant.bv)">{{ participant.bv }}</v-btn>
                                </v-container>
                            </v-list-item-action>
                            <v-divider></v-divider>
                        </v-list-item-header>


                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import axios from 'axios'

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
            challenge: new ChallengeClass(),
            joinChallengeForm: false,
            joinChallengeResult: "",
            data: null,
            bv: "",
            uid: null,
            checkbox: false,
            rules: {
                data: [
                    v => !!v || "需填写数据",
                    v => /^\d+$/.test(v) || "数据格式不正确"
                ],
                bv: [
                    v => !!v || "需填写BV号",
                    v => /(BV.*?).{10}/.test(v) || "BV号格式不正确"
                ],
                uid: [
                    v => !!v || "需填写UID",
                    v => /^\d{9}$/.test(v) || "UID格式不正确"
                ]
            },
        };
    },
    methods: {
        initChallenge() {
            axios.get(this.$constants.apiBaseUrl + "/challenge/" + this.challenge.challengeID + "/detail")
                .then(response => {
                    if (response.data.code == 200) {
                        this.challenge.challengeTitle = response.data.data.challengeTitle;
                        this.challenge.challengeContent = response.data.data.challengeContent;
                    }
                    else {
                    }
                });
        },
        initChallengeParticipants() {
            axios.get(this.$constants.apiBaseUrl + "/challenge/" + this.challenge.challengeID + "/participants")
                .then(response => {
                    if (response.data.code == 200) {
                        for (var i = 0; i < response.data.data.challengeParticipants.length; i++) {
                            var participant = new ChallengeParticipantClass();
                            participant.data = response.data.data.challengeParticipants[i].data;
                            participant.bv = response.data.data.challengeParticipants[i].bv;
                            participant.uid = response.data.data.challengeParticipants[i].uid;
                            this.challenge.challengeParticipants.push(participant);
                        }
                    }
                });
        },
        toBilibili(bv) {
            window.open("https://www.bilibili.com/video/" + bv, "_blank");
        },
        joinChallenge() {
            this.$recaptchaLoaded()
                .then(() => {
                    this.$recaptcha('social')
                        .then(token => {
                            this.$refs.form.validate()
                                .then(validateResult => {
                                    if (validateResult.valid) {
                                        axios.post(this.$constants.apiBaseUrl + "/challenge/" + this.challenge.challengeID + "/join", {
                                            "challengeID": this.challenge.challengeID,
                                            "data": this.data,
                                            "bv": this.bv,
                                            "uid": this.uid,
                                            "recaptcha": token
                                        }).then(response => {
                                            if (response.code == 200) {
                                                console.log("success");
                                                this.joinChallengeResult = "success";
                                                this.joinChallengeForm = false;
                                            }
                                            else {
                                                console.log(response);
                                                this.joinChallengeResult = response.data.msg;
                                            }
                                        });
                                    }
                                })
                        })
                }
                )
        }
    },
    mounted() {
        this.challenge.challengeID = this.$route.params.challengeID;
        this.initChallenge();
        this.initChallengeParticipants();
    }
}
</script>