!<template>
  <el-row>
    <el-col
      v-for="item in chatArr"
      :key="item"
      :span="4"
      :offset="index % 4 ? 2 : 1"
    >
      <el-card :body-style="{ padding: '0px' }">
        <img
          src= item.photo
          class="image"
          alt = "Profile Photo"
        />
        <div style="padding: 14px">
          <span>{{item.nameid}}</span>

        <el-button type="text" class="button" @click="goToChat(item.uid)">Chat</el-button>
          </div>

      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { getAuth } from "firebase/auth";
import firebaseApp from "../main.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      chatArr : [],
    }
  },

  methods: {
    goToChat(x) {
      this.$router.push({path : '/chat', query : {id : x}})
    }
  },

  async beforeCreate() {
    const id = getAuth().currentUser.uid
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "User", id);
    const docSnap = await getDoc(docRef);
    const employerBoo = docSnap.data().Employer

    const chats = docSnap.data().Chats
    for (var i = 0; i < chats.length; i++) {
      const currChat = chats[i]
      const docRef1 = doc(db, "User", currChat);
      const docSnap1 = await getDoc(docRef1)
      var name = ""
      if (employerBoo) {
        name = docSnap1.data().Name
      } else {
        name = docSnap1.data().CompanyName
      }
      this.chatArr.push({
        photo : docSnap1.data().photoURL,
        uid : currChat,
        nameid : name
      })
    }
  }
}
</script>

<style>

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>