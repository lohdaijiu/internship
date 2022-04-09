<template>
  <NavBar />

  <!-- <body> -->
    <div id="mainContainer">

    <el-row id="introductionContainer">
      <el-col :span="2"></el-col>
      <el-col :span="3" id="picture">
          <img :src="image" id ='avatar'/>
          <br />
          <h3>{{ name }}</h3>        

      </el-col>
      <el-col :span="2"></el-col>


      <el-col :span="10" id="about">
        <div v-for="(writeup, section) in this.about" :key="section">
          <h2>{{ section }}</h2>
          <div class="writeupfont">{{ writeup }}</div>
        </div>        
      </el-col>
      <el-col :span="2"></el-col>
      

      <el-col :span="3" id="sdocs">
          <h3>Supporting Documents:</h3>

          <el-button 
            type="info"
            color="#A5A6F6"
            @click="viewProfile(resumeURL)"
            >Download Resume</el-button
          >
      </el-col>

      <el-col :span="2"></el-col>
    </el-row>
    </div>

    <div id="info">
    
      <el-card class="box-card">

        <div id="subContainer">
          <h2>Application Writeup</h2>
          <div class="wu">{{ applicationWriteUp }}</div>
        </div>
      </el-card>
      
      <el-card class="box-card">
        <div
          id="subContainer"
          v-for="(data, index) in this.profileData"
          :key="index"
        >
          <template v-for="(writeup, section) in data" :key="section">
            <h2>{{ section }}</h2>
            <div class="writeupfont">{{ writeup }}</div>
          </template>
        </div>
      </el-card>
    </div>

</template>

<script>
import firebaseApp from "../../main.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import NavBar from "../../components/EmployerNav.vue";

export default {
  data() {
    return {
      profileData: [],
      about: "",
      image: "",
      name: "",
      resumeURL: "",
      applicationWriteUp: "",
    };
  },
  components: {
    NavBar,
  },
  async created() {
    const db = getFirestore(firebaseApp);
    const query = this.$route.query.id;
    const uid = query.split(" - ")[2];
    const docRef = doc(db, "User", "" + uid);
    const docSnap = await getDoc(docRef);
    let newData = docSnap.data().ProfileData;
    this.about = newData.slice(0, 1)[0];
    this.name = docSnap.data().Name;
    this.profileData = newData.slice(1);
    this.image = docSnap.data().photoURL;
    this.resumeURL = docSnap.data().resumeURL;

    const docRef1 = doc(db, "Application", query);
    const docSnap1 = await getDoc(docRef1);
    this.applicationWriteUp = docSnap1.data().Writeup;
  },
  methods: {
    viewProfile(x) {
      window.open(x);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

#avatar {
    border-radius: 50%;
    height: 150px;
    width: 150px;
}

#resumeLink {
  text-decoration: none;
  font-family: "Poppins", sans-serif;

  font-weight: 300;
  color: #1f1d2a;
  font-size: 18px;
}

a:hover {
  border-bottom: solid 1px #1f1d2a;
}
.writeupfont {
  font-family: "Poppins", sans-serif;

  font-weight: 300;
  color: #1f1d2a;
  font-size: 15px;
}

.wu {
  font-family: "Poppins", sans-serif;

  font-weight: 300;
  color: #1f1d2a;
  font-size: 15px;
}

#picture {
  /* display: flex;
  flex-direction: column; */
  /* margin-right: auto;
  margin-left: auto;  
  margin-top: 2%; */
  margin: 2% auto;
  align-content: center;
  align-items: center;
  text-align: center;
}

h2 {
  min-width: 200px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: #A5A6F6;
  font-size: 20px;
}

h3 {
  text-align: center;
  /* min-width: 200px; */
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: #1f1d2a;
  font-size: 20px;
}
#about {
  /* display: flex;
  flex: 1 1 auto;
  padding-left: 2%;
  justify-content: left;
  align-items: left;
  text-align: left;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
  font-weight: 600;
  color: #1f1d2a;
  font-size: 22px; */
}

#introductionContainer {


  /* display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  max-height: 10%;
  text-align: left;
  overflow: auto;
  resize: none;
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 2.5%;
  padding-right: 10%;
  width: 85%; */
}
#mainContainer {
  justify-content: center;
  align-content: center;
  align-items: center;
  /* flex-direction: column; */
  width: 80%;
  margin-right: auto;
  margin-left: auto;  
  margin-top: 2%;
  /* padding-bottom: 4%; */
  min-height: 350px;
  border-radius: 30px;
  background-color: white;
}

#subContainer {
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  margin: 2% 4% 1% 4%;
  text-align: left;
  width: 90%;
  resize: none;
  overflow: auto;
  min-height: 100px;
}

#info {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  align-items: center;
  margin-bottom: 3%;

}

.box-card {
  margin-bottom: 20px;
  border-radius: 5px;
}

</style>
