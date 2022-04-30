<template>
    <v-app>
        <DrawerVue />
        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>

    </v-app>
</template>
<script>
import { onMounted } from '@vue/runtime-core'
import DrawerVue from "./view/components/Drawer.vue"

export default {
    data() {
        onMounted(() => {
            console.log(this.$route)
        })
    },
    components: {
        DrawerVue
    }
}
</script>