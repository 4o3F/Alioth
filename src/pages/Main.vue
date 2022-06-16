<template>
  <div class="hero max-h-full bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">欢迎~</h1>
        <p class="text-2xl py-6">Alioth<br>Build for Genshin Impact</p>
        <p class="text-3xl py-6">点击下方的模块或导航栏来使用🔽</p>
      </div>
    </div>
  </div>

  <div class="stats stats-vertical lg:stats-horizontal shadow">
    <div class="stat hover:bg-sky-300" v-on:click="router.push('/challenges/')">
      <div class="stat-title">挑战数</div>
      <div class="stat-value">{{totalChallenges}}</div>
      <div class="stat-desc"></div>
    </div>

    <div class="stat hover:bg-sky-300" v-on:click="router.push('/matcher/')">
      <div class="stat-title">匹配系统</div>
      <div class="stat-value">{{matcherOnline}}</div>
      <div class="stat-desc"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Main"
}
</script>

<script setup>
import StatusAPI from "../api/StatusAPI.js";
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const totalChallenges = ref(0)
const matcherOnline = ref('')
var statusCallback = function (data){
  if (data == undefined){
    //TODO:实现无法连接服务器时处理
  }
  totalChallenges.value = data.total_challenges
  if (data.matcher_online) {
    matcherOnline.value = '✅'
  } else {
    matcherOnline.value = '❌'
  }
}
StatusAPI.fetchStatus(statusCallback)
</script>