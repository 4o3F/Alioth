<template>
  <div class="card bg-base-100 shadow-xl m-4">
    <div class="card-body">
      <h1 class="card-title">🏆 挑战</h1>
      <p>挑战介绍 TODO:填充</p>
      <div class="card-actions w-full">
        <div class="form-control w-full">
          <div class="input-group">
            <input v-model="inputChallengeID" class="input input-bordered w-full" placeholder="输入挑战ID来查询" type="text"/>
            <button class="btn btn-square" v-on:click="searchChallenge">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div :class="{hidden: alertMessage!=undefined}" class="alert alert-error shadow-lg m-4 w-auto">
    <div>
      <svg class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2"/>
      </svg>
      <span>{{ alertMessage }}</span>
    </div>
  </div>

  <div class="m-4">
    <table class="table table-compact w-full">
      <thead>
      <tr>
        <th>挑战名称</th>
        <th>挑战ID</th>
        <th>热度</th>
      </tr>
      </thead>
      <tbody v-for="challenge in challenges">

      <tr class="hover" v-on:click="router.push('/challenges/' + challenge.challenge_id)">
        <td>{{ challenge.challenge_title }}</td>
        <td>{{ challenge.challenge_id }}</td>
        <td>{{ challenge.score }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ChallengeMain"
}
</script>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import ChallengeAPI from "../../api/ChallengeAPI.js";
import challengeAPI from "../../api/ChallengeAPI.js";

const router = useRouter()
const inputChallengeID = ref('')
const alertMessage = ref('')
const challenges = ref([])

function searchChallenge() {
  ChallengeAPI.fetchDetail(inputChallengeID.value, function (data) {
    if (data != undefined) {
      router.push('/challenges/' + inputChallengeID.value)
    } else {
      alertMessage.value = "找不到相应ID的挑战"
    }
  })
}

var fetchTrendingCallback = function (data) {
  challenges.value = data
}

challengeAPI.fetchTrending(fetchTrendingCallback)
</script>