<template>
  <div class="card bg-base-100 shadow-xl m-4 h-4/5">
    <div class="card-body">
      <h2 class="card-title">新建挑战</h2>

      <!--结果展示-->
      <div class="alert alert-error shadow-lg" v-if="!createResult && createResult!=undefined">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linecreate="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{createResultMessage}}</span>
        </div>
      </div>
      <div class="alert alert-success shadow-lg" v-if="createResult && createResult!=undefined">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linecreate="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{createResultMessage}}</span>
        </div>
      </div>

      <!--数据输入框-->
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">挑战标题</span>
        </label>
        <input type="text" placeholder="标题" class="input input-bordered w-full" v-model="challengeTitle" />
      </div>
      <div class="form-control w-full h-3/4">
        <label class="label">
          <span class="label-text">挑战详情</span>
        </label>
        <textarea placeholder="挑战详情" class="textarea textarea-bordered w-full h-full" v-model="challengeContent" />
      </div>

      <div class="card-actions justify-end">
        <button class="btn btn-primary" v-on:click="createChallenge">
          🚀 新建
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChallengeCreate"
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

const createResult = ref(undefined)
const createResultMessage = ref('')


var createChallengeCallback = function (challengeID, msg){
  if (challengeID==undefined){
    createResult.value = false;
    createResultMessage.value = msg
    return
  }
  createResult.value = true;
  createResultMessage.value = msg
  setTimeout(()=>router.push("/challenges/"+challengeID), 2000)
}

function createChallenge() {
  ChallengeAPI.createChallenge(challengeTitle.value,challengeContent.value, createChallengeCallback)
}

</script>