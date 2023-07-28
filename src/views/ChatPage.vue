<template>
    <div>{{userName}}</div>
    <div class="chat-container">
        <div class="chat-messages">
        <div v-for="message in messages" :key="message.from" class="message">
            {{ message.from }}: {{ message.message }}
        </div>
        </div>
        <form @submit.prevent="sendMessage" class="form-wrapper">
          <input type="text" v-model="newMessage" placeholder="Type your message" class="input-full" />
          <button type="submit">Send</button>
        </form>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        myName: '',
        userName: '',
        currentUserId: null,
        messages: [],
        newMessage: ''
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage) {

          const message = {
            from : this.myName,
            to : this.userName,
            message : this.newMessage,
          }
          this.$store.dispatch('saveMessage', {
            from : this.$store.getters.getUserId,
            to : this.currentUserId,
            message : this.newMessage,
          })
          this.messages.push(message)

          // Clear the input field
          this.newMessage = '';
        }
      },
      checkName(id) {
        const find = this.$store.getters.getAllChats.filter((chat) => chat.id === id)
        if (find.length > 0) {
          return find[0]["name"]
        }
        return ''
      }
    },
    mounted() {
      if (!this.$store.getters.isAuth) {
        this.$router.push('/login')
      }

      this.currentUserId = +this.$route.path.slice(7, -1)
      const myId = this.$store.getters.getUserId
      this.myName = this.checkName(myId)
      this.userName = this.checkName(this.currentUserId)

      for (let msg of this.$store.getters.getMessages) {
        if (msg.from === myId && msg.to === this.currentUserId) {
          this.messages.push({
            from : this.myName,
            to : this.userName,
            message : msg.message,
          })
        } else if (msg.to === myId && msg.from === this.currentUserId) {
          this.messages.push({
            from : this.userName,
            to : this.myName,
            message : msg.message,
          })
        }
      }
    }
  };
</script>

<style scoped>
    div.message {
        margin: 2rem;
        text-align: end;
    }
    .chat-container {
      display: flex;
      flex-direction: column;
      height: 400px;
      width: 100%;
      border: 1px solid black;
    }

    .chat-messages {
      overflow-y: scroll;
    }

    .form-wrapper {
      position: fixed;
      bottom: 0;
      width: 100%;
      margin-bottom: 3rem;
    }

  .input-full {
    width: 80%;
  }
</style>