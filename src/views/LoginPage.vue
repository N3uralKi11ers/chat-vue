<template>
    <form @submit.prevent="login">
        <div class="my-input">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" required>
        </div>
        <div class="my-input">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
        </div>
        <div class="my-input">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
    </form>
</template>
  
<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            const hash = this.hashLoginAndPassword(this.name, this.login)
            if (!this.findHash(hash, this.$store.getters.getAllChats)) {
                this.$store.dispatch('saveUserId', hash).then(() => {
                    this.$store.dispatch('saveUser', {name: this.name, id: hash}).then(() => {
                        this.$router.push('/')
                    })
                })
            } else {
                this.$store.dispatch('saveUserId', hash).then(() => {
                    this.$router.push('/')
                })
            }
        },
        findHash(id, objects) {
            for (let obj of objects) {
                if (obj.id === id) {
                    return obj
                }
            }
        },
        getRandomInt(max) {
            return Math.floor(Math.random() * max)
        },
        hashLoginAndPassword() {
            // imitates hashing
            const acc = []
            for (let char of this.name) {
                const charCode = char.charCodeAt(0)
                acc.push(charCode.toString())
            }
            console.log((acc.join("")))
            return +(acc.join(""))
        }
    }
};
</script>

<style scoped>
.my-input {
    margin: 1rem;
}

</style>
  