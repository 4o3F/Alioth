<template>
  <!--挑战主展示-->
  <div class="card bg-base-100 shadow-xl m-4">
    <div class="card-body">
      <h2 class="card-title">{{ challengeTitle }}</h2>
      <p>{{ challengeContent }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" v-on:click="router.push('/challenges/'+route.params.id+'/join')">🚀
          加入
        </button>
      </div>
    </div>
  </div>
  <!--挑战参与展示 -->
  <div class="m-4">
    <table class="table table-compact w-full">
      <thead>
      <tr>
        <th></th>
        <th>UID</th>
        <th>视频BV号</th>
        <th>数据</th>
      </tr>
      </thead>
      <tbody v-for="(participant,index) in challengeParticipants">
      <tr>
        <th>{{ index + 1 }}</th>
        <td>{{ participant.uid }}</td>
        <td>{{ participant.bv }}</td>
        <td>{{ participant.data }}</td>
      </tr>
      </tbody>
    </table>
  </div>


</template>

<script>
export default {
  name: "ChallengeDetails"
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
  challengeTitle.value = data.challenge_title
  challengeContent.value = data.challenge_content
}
ChallengeAPI.fetchDetail(route.params.id, fetchDetailCallback)

//初始化挑战参与者信息
const challengeParticipants = ref([])
var fetchParticipantsCallback = function (data) {
  challengeParticipants.value = data
}
ChallengeAPI.fetchParticipants(route.params.id, fetchParticipantsCallback)


</script>
