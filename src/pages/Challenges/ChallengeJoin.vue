<template>
  <div class="card bg-base-100 shadow-xl m-4">
    <div class="card-body">
      <h2 class="card-title">{{ challengeTitle }}</h2>
      <p>{{ challengeContent }}</p>

      <!--结果展示-->
      <div class="alert alert-error shadow-lg" v-if="!joinResult && joinResult!=undefined">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{joinResultMessage}}</span>
        </div>
      </div>
      <div class="alert alert-success shadow-lg" v-if="joinResult && joinResult!=undefined">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{joinResultMessage}}</span>
        </div>
      </div>

      <!--数据输入框-->
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">参与的数据</span>
        </label>
        <input type="text" placeholder="数据" class="input input-bordered w-full" v-model="data" />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">视频BV号</span>
        </label>
        <input type="text" placeholder="BV号" class="input input-bordered w-full" v-model="bv" />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">原神UID</span>
        </label>
        <input type="text" placeholder="UID" class="input input-bordered w-full" v-model="uid" />
      </div>

      <div class="card-actions justify-end">
        <button class="btn btn-primary" v-on:click="joinChallenge">🚀
          加入
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChallengeJoin"
}
</script>
<script setup>
import {useRouter, useRoute} from 'vue-router'
import {ref} from "vue";
import ChallengeAPI from "../../api/ChallengeAPI.js";

const router = useRouter()
const route = useRoute()
// 初始化挑战主要信息
const challengeTitle = ref('')
const challengeContent = ref('')
var fetchDetailCallback = function (data) {
  challengeTitle.value = data.challengeTitle
  challengeContent.value = data.challengeContent
}
ChallengeAPI.fetchDetail(route.params.id, fetchDetailCallback)

const data = ref()
const bv = ref('')
const uid = ref()

const joinResult = ref(undefined)
const joinResultMessage = ref('')


var joinChallengeCallback = function (result, msg){
  joinResult.value = result
  joinResultMessage.value = msg
  if (result) {
    setTimeout(()=>router.push("/challenges/"+route.params.id), 2000)
  }
}

function joinChallenge() {
  ChallengeAPI.joinChallenge(route.params.id, data.value, bv.value, uid.value, joinChallengeCallback)
}

</script>