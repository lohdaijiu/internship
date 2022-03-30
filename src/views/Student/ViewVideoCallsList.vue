<template>
  <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              RoomName
            </th>
            <th class="text-left">
              Join
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableDataset" :key="item.id">
            <td>{{ item.data().name }}</td>
            <td>
              <v-btn @click="toVideo(item.id)">Join</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
</template>

<script>
import firebaseApp from '../../main.js'
import { getFirestore, collection, getDocs} from "firebase/firestore";

export default {
  name: "RoomTable",
  data() {
     return {
       db: null,
       tableDataset: [],
     }
  },
  async created() {
    this.db = getFirestore(firebaseApp)
    const querySnapshot = await getDocs(collection(this.db, "Job"));
    querySnapshot.forEach((doc) => {
        this.tableDataset.push(doc)
    })
  },
  methods: {
    toVideo(val) {
      this.$router.push({path: '/studentvideo', query: { id: val }})
    }
  }
}
</script>
