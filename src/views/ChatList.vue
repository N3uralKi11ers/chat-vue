<template>
    <div v-for="chat in chats" :key="chat" style="margin: 10px;">
        <router-link :to="'/chats/' + chat.id + '/'">{{chat.name}}</router-link>
    </div>
    <button type="button" @click="router.push('/login') && store.dispatch('saveUserId', '')">Logout</button>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const chats = store.getters.getChats

onMounted(() => {
    if (!store.getters.isAuth) {
        router.push('/login')
    }
})

</script>