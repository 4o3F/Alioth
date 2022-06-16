import Main from "../pages/Main.vue";
import ChallengeDetails from "../pages/Challenges/ChallengeDetail.vue";
import ChallengeMain from "../pages/Challenges/ChallengeMain.vue";
const routes= [
    {
        path: "/",
        component: Main,
        name: "主页",
        sidebar: true
    },
    {
        path: "/challenges",
        component: ChallengeMain,
        name: "挑战",
        sidebar: true
    },
    {
        path: "/challenges/:id",
        component: ChallengeDetails,
        name: "挑战详情",
        sidebar: false
    }
]

export default routes