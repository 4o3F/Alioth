<template>
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
</script>