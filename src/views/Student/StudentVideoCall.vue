<template>
  <StudentNav />

  <div class="welcome">
    <h1>{{ roomname }}</h1>
  </div>

  <div style="height: 400px">
    <vue-webrtc
      ref="webrtc"
      width="500%"
      height="100%"
      :roomId="roomID"
      v-on:joined-room="logEvent"
      v-on:left-room="logEvent"
      v-on:opened-room="log"
      @error="onError"
    />
  </div>
  
  <el-button type="success" class="firstbutton" @click="onJoin">Turn on Camera</el-button>
  <el-button type="warning"  @click="onLeave">Turn off Camera</el-button>
  <el-button type="danger"  @click="leaveForStudent">Leave Room</el-button>
</template>

<script>
import { VueWebRTC } from "vue-webrtc";
import StudentNav from "../../components/StudentNav.vue";
// import { getFirestore, doc, updateDoc } from "firebase/firestore";
// import firebaseApp from "../../main.js";

export default {
  components: {
    "vue-webrtc": VueWebRTC,
    StudentNav,
  },
  data() {
    return {
      roomID: this.$route.query.id,
      roomname: "Interview for ".concat(this.$route.query.id.split(" - ")[1])
    };
  },
  methods: {
    onJoin() {
      this.$refs.webrtc.join();
    },
    onLeave() {
      this.$refs.webrtc.leave();
    },
    onError(error, stream) {
      console.log("On Error Event", error, stream);
    },
    logEvent(event) {
      console.log("Event : ", event);
    },
    log(event) {
      console.log("asdf : ", event);
    },
    leaveForStudent() {
      this.$refs.webrtc.leave();
      this.$router.push("/studenthome")
    },
  },
};
</script>

<style scoped>
.el-button {
  margin-right: 8px;
}
.welcome {
    text-align: center;
    justify-content: space-between;
    font-family: "Poppins", sans-serif;
    color: #1f1d2a;
    font-size: 20px;
}
.firstbutton {
  margin-left: 40%
}
</style>
