<template>
  <div class="wrapper">
    <section>
      <el-table
        :data="messages"
        style="width: 30%; margin: auto; margin-top: 3%"
        :row-class-name="tableRowClassName"
        align="center"
        margin-top="100px"
        size="large"
      >
        <el-table-column prop="sender" width="250" />
        <el-table-column prop="receiver" width="250" align="right" />
      </el-table>

      <div>
        <el-input
          v-model="message"
          size="large"
          placeholder="Enter your message!"
          style="width: 26%; margin-left:35%"
        />
        <el-button size="large" type="info" @click="goToChat(scope.row.uid)"
          >Send</el-button
        >
      </div>
    </section>
  </div>
</template>

<script>
import firebaseApp from "../main.js";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

export default {
  async mounted() {
    try {
      const db = getFirestore(firebaseApp);
      const id = getAuth().currentUser.uid;

      const docRef = doc(db, "User", id);
      const docSnap = await getDoc(docRef);
      this.employer = docSnap.data().Employer;

      if (this.employer) {
        this.collectionName = id.concat(" - ", this.$route.query.id);
      } else {
        this.collectionName = this.$route.query.id.concat(" - ", id);
      }
      console.log(this.collectionName);
      const q = query(
        collection(db, this.collectionName),
        orderBy("createdAt")
      );
      onSnapshot(q, (querySnapshot) => {
        this.messages = querySnapshot.docs.map((doc) => {
          if (doc.data().userUID == id) {
            return { sender: "", receiver: doc.data().text };
          } else {
            return { sender: doc.data().text, receiver: "" };
          }
        });
      });
      console.log(this.messages);
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      message: "",
      messages: [],
      employer: false,
      collectionName: "",
    };
  },
  methods: {
    sentOrReceived(userUID) {
      const id = getAuth().currentUser.uid;
      return userUID === id ? "sent" : "received";
    },
    async sendMessage() {
      const id = getAuth().currentUser.uid;
      const db = getFirestore(firebaseApp);
      const messageInfo = {
        userUID: id,
        text: this.message,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, this.collectionName), messageInfo);
      this.message = "";
      this.$refs["scrollable"].scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped></style>
