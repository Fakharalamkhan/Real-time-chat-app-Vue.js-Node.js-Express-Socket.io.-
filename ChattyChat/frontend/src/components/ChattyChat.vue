<template>
  <div class="chatty-chat">
    <div v-if="sbutton== pressed" class="welcome-section">
      <h1>Welcome to Chatty Chat</h1>
      <div class="name-input">
        <input type="text" v-model="name" placeholder="Enter screen #" />
        <button id="sbutton" class="start-button" @click="setName">Start Chat</button>
      </div>
    </div>
    <div v-else class="chat-section">
      <div class="chat-header">
        <span class="chat-title">Chatty Chat</span>
        <span class="connection-count">Connections: {{ connectionCount }}</span>
      </div>
      <span v-if="typing" class="typing-indicator">{{ typing }} is typing...</span>

     <div class="connected-users">
      <label for="user-select">Users:</label>
      <select id="user-select" v-model="selectedUser">
        <option value="" disabled>Connected users</option>
        <option v-for="user in online" :key="user">{{ user }}</option>
      </select>
    </div>

      <div class="messages">
        <div v-if="messages.length === 0" class="empty-message">No messages yet.</div>
        <div v-for="message in messages" :key="message.id" class="message">
          <div :class="{'message-sent': message.type === 1, 'message-received': message.type === 0}">
            {{ message.text }}
            <span class="message-user">-  {{ message.user }}</span>
          </div>
        </div>
      </div>
      <div class="message-input">
        <input type="text" class="input-box" v-model="newMessage" placeholder="Type your message..." />
        <button class="send-button" @click="send">Send</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ChattyChat",
  data() {
    return {
      newMessage: "",
      messages: [],
      name: "",
      typing: "",
      online: [], 
      connectionCount: 1,
      selectedUser: "",
      sbutton: false, 
      pressed: false, 
    };
  },
  created() {
 
  this.$socket.on("noOfConnections", (count) => {
    this.connectionCount = count;
  });
},
  sockets: {
    "chat-message": function (data) {
      this.messages.push({ id: Date.now(), text: data.message, user: data.user, type: 1 });
    },
    noOfConnections: function (count) {
      this.connectionCount = count;
    },
    typing: function (data) {
      this.typing = data;
    },
    stoptyping: function () {
      this.typing = "";
    },
    joined: function (name) {
      this.online.push(name);
    },
    leaved: function (name) {
      this.online.splice(this.online.indexOf(name), 1);
    },
    
  },
  methods: {
    send() {
      if (this.newMessage.trim() !== "") {
        this.$socket.emit("chat-message", { message: this.newMessage, user: this.name });
        this.newMessage = "";
      }
    },
    setName() {
      if (this.name.trim() !== "") {
        this.$socket.emit("joined", this.name);
        this.name = this.name.trim();
        this.sbutton = true;
      }
    },
    isTyping() {
      this.$socket.emit("typing", this.name);
    },
    stopTyping() {
      this.$socket.emit("stoptyping");
    },
  },
  watch: {
    newMessage(value) {
      value ? this.isTyping() : this.stopTyping();
    },
    
  },
};
</script>

<style scoped>

.chatty-chat {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
font-family: Arial, sans-serif;
}

/* Welcome Section Styles */
.welcome-section {
text-align: center;
}

.name-input {
margin-top: 20px;
}

.start-button {
background-color: #3498db;
color: white;
border: none;
padding: 10px 20px;
border-radius: 4px;
cursor: pointer;
}
.connected-users {
  margin-top: 10px;
}

.connected-users label {
  margin-right: 10px;
}

.connected-users select {
  padding: 5px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

/* Chat Section Styles */
.chat-section {
margin-top: 20px;
width: 100%;
max-width: 600px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
border-radius: 8px;
}

.chat-header {
background-color: #3498db;
color: white;
padding: 10px;
display: flex;
justify-content: space-between;
align-items: center;
border-top-left-radius: 8px;
border-top-right-radius: 8px;
}

.chat-title {
font-size: 18px;
}

.connection-count {
font-size: 14px;
}

.messages {
padding: 15px;
overflow-y: auto;
max-height: 300px;
}

.empty-message {
text-align: center;
color: #888;
}

.message {
margin: 10px 0;
}

.message-sent {
background-color: #3498db;
color: white;
padding: 10px;
border-radius: 8px;
align-self: flex-end;
}

.message-received {
background-color: #f1f1f1;
padding: 10px;
border-radius: 8px;
align-self: flex-start;
}

.message-user {
font-size: 12px;
color: #e62535;
}
.typing-indicator {
  font-size: 12px;
  color: #888;
}

.message-input {
display: flex;
padding: 15px;
background-color: white;
border-top: 1px solid #e0e0e0;
border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px;
}

.input-box {
flex: 1;
padding: 10px;
border: none;
border-radius: 4px;
outline: none;
box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.send-button {
background-color: #3498db;
color: white;
border: none;
padding: 10px 20px;
border-radius: 4px;
cursor: pointer;
margin-left: 10px;
}

.send-button:hover {
background-color: #2980b9;
}
</style>
