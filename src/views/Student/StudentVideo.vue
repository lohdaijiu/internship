<template>
  <div>
    <v-row>
      <v-col>
        <video class="media_v" id="webcamVideo" autoplay playsinline></video>
      </v-col>
      <v-col>
        <video class="media_v" id="remoteVideo" autoplay playsinline></video>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebaseApp from "../../main.js";
import { getFirestore } from "firebase/firestore";

export default {
  name: "Webrtc",
  data() {
    return {
      db: null,
      servers: {
        iceServers: [
          {
            urls: ["stun:stun1.l.google.com:19302"],
          },
        ],
        iceCandidatePoolSize: 10,
      },
      localStream: null,
      remoteStream: null,
      pc: null,
      webcamVideo: null,
      remoteVideo: null,
    };
  },
  async created() {
    this.db = getFirestore(firebaseApp);
    await this.startWebcam();
    await this.answerBtn(this.$route.query.id);
  },
  mounted() {
    this.pc = new RTCPeerConnection(this.servers);
    // HTML elements
    this.webcamVideo = document.getElementById("webcamVideo");
    this.remoteVideo = document.getElementById("remoteVideo");
  },
  methods: {
    async startWebcam() {
      // media device の設定
      this.localStream = await navigator.mediaDevices
        .getUserMedia({
          video: true,
          // audio: true,
        })
        .catch(() => {
          console.error("can't connect mediadevices");
        });

      this.remoteStream = new MediaStream();

      // peer connectionに local streamのtrackをセット
      this.localStream.getTracks().forEach((track) => {
        this.pc.addTrack(track, this.localStream);
      });

      // 通信相手のtracksを取得してremote streamにセット
      this.pc.ontrack = (event) => {
        console.log(event);
        event.streams[0].getTracks().forEach((track) => {
          this.remoteStream.addTrack(track);
        });
      };

      this.webcamVideo.srcObject = this.localStream;
      this.remoteVideo.srcObject = this.remoteStream;
    },
    
    async answerBtn(val) {
      const callDoc = this.db.collection("calls").doc(val);
      const answerCandidates = callDoc.collection("answerCandidates");
      const offerCandidates = callDoc.collection("offerCandidates");

      this.pc.onicecandidate = (event) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };

      const callData = (await callDoc.get()).data();

      const offerDescription = callData.offer;
      await this.pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await callDoc.update({ answer });

      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let data = change.doc.data();
            this.pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    },
  },
};
</script>
