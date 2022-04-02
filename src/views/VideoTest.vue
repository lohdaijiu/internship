<template>
<div style = "height:800px">
  <vue-webrtc
    ref="webrtc"
    width="500%"
    height="100%"
    :roomId="roomID"
    v-on:joined-room="logEvent"
    v-on:left-room="logEvent"
    v-on:opened-room="log"
    v-on:share-started="logEvent"
    v-on:share-stopped="logEvent"
    @error="onError"
  />
</div>
  <button type="button" class="btn btn-primary" @click="onJoin">Join</button>
  <button type="button" class="btn btn-primary" @click="onLeave">Leave</button>
</template>

<script>
import { VueWebRTC } from "vue-webrtc";
export default {
  components: {
    "vue-webrtc": VueWebRTC,
  },
  data() {
    return {
      roomID : "asdf"
    };
  },
  mounted: function () {},
  computed: {},
  watch: {},
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
  },
};
</script>

<style>
.btn {
  margin-right: 8px;
}
</style>
