<template>
  <v-navigation-drawer floating permanent>
    <v-list density="compact" nav>
      <v-list-item rounded="xl" @click="this.$router.push('/')" prepend-icon="mdi-view-dashboard" title="主页" value="home"></v-list-item>
      <v-list-item rounded="xl" @click="this.$router.push('/challenge')" prepend-icon="mdi-trophy-variant" title="挑战" value="challenge"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {

}
</script>