import Main from "../pages/Main.vue";
import ChallengeDetails from "../pages/Challenges/ChallengeDetail.vue";
import ChallengeMain from "../pages/Challenges/ChallengeMain.vue";
import ChallengeJoin from "../pages/Challenges/ChallengeJoin.vue";

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
    },
    {
        path: "/challenges/:id/join",
        component: ChallengeJoin,
        name: "参与挑战",
        sidebar: false
    }
]

export default routes