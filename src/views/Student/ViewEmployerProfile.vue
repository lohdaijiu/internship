<template>
  <StudentNav />

  <body>
    <div id="mainContainer">
      <div id="introductionContainer">
        <div id="picture"> 
          <br />
          <img :src="image" id="avatar" />
          <br />
          <h2>{{ companyName }}</h2>
        </div>

        <div
          id="about"
          v-for="(writeup, section) in this.aboutCompany"
          :key="section"
        >
          <h2>{{ section }}</h2>
          <div class="writeupfont">{{ writeup }}</div>
        </div>
      </div>
      <div
        id="subContainer"
        v-for="(data, index) in this.companyProfileData"
        :key="index"
      >
        <template v-for="(writeup, section) in data" :key="section">
          <h2>{{ section }}</h2>
          <div class="writeupfont">{{ writeup }}</div>
        </template>
      </div>
    </div>

    <el-row>
      <el-col :span="20"></el-col>  
      <el-col :span="2" class="back-btn-container">
      <el-button id ='backbtn' type="info" @click='goBack'>Back</el-button>
      </el-col>
        <el-col :span="2"></el-col>  
    
    </el-row>    
  </body>
</template>

<script>
import StudentNav from "../../components/StudentNav.vue";
import { getFirestore} from "firebase/firestore";
import { doc , getDoc} from "firebase/firestore";
import firebaseApp from '../../main.js'

export default {
  components: {
    StudentNav,
  },
  data() {
    return {
      companyProfileData: [],
      aboutCompany: "",
      image: "",
      companyName: "",
    };
  },
  async beforeMount() {
    const db = getFirestore(firebaseApp);
    const uid = this.$route.query.id;
    const docRef = doc(db, "User", uid);
    const docSnap = await getDoc(docRef);
    let newData = docSnap.data().companyProfileData;
    const content = newData.slice(0, 1)[0]["About your company"];
    this.aboutCompany = {"About this company": content}
    console.log(newData.slice(0, 1)[0]);
    this.companyName = docSnap.data().CompanyName;
    this.companyProfileData = newData.slice(1);
    this.image = docSnap.data().photoURL;
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
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
    font-size: 16px;
}



#picture {
    display: flex;
    flex-direction: column;
    margin-top: 2%;
    padding-left: 2%;
    margin-right: 2%;
    width: 3%;
    min-width: 10%;
}

h2{
    min-width: 200px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: #1f1d2a;
    font-size: 20px;
}
#about {
    display: flex;
    flex: 1 1 auto;
    padding-left: 2%;
    justify-content: left;
    align-items: left;
    text-align: left;
    flex-direction: column;
    margin-left: 5%;
    font-weight: 600;
    color: #1f1d2a;
    font-size: 22px;

}


#introductionContainer {
    display:flex;
    justify-content:space-evenly;
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
    width: 85%;
    
}
#mainContainer {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 80%;
    margin-top: 5%;
    margin-bottom: 1%;
    margin-left: 9.5%;
    margin-right: 5%;
    padding-bottom: 4%;
    min-height:500px;
    border-radius: 30px;
    background-color: white;
}

#subContainer {
    display:flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    margin-top: 2%;
    margin-left: 4%;
    margin-right: 4%;

    text-align: left;
    width: 90%;
    resize: none;
    overflow: auto;
    min-height: 100px;
    
}

.back-btn-container {
  justify-content: space-evenly;
  /* margin-left: 73.5%; */
  padding-right: 3%;
  min-height: 200px;
  float: right;
  justify-content: flex-end;
}

#backbtn {
  border-radius: 5px;
  text-align: center;
  size: large;
}
/* 
#editButton:hover {
    background-color: #accef6;
    border-color: #accef6;
    transition: 0.2s;
}

#editButton:active {
    transform: translateY(1px);
} */
</style>
