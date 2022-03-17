<template>
  <el-container class="container">
    <el-row class="tags">
      <el-col :span="12">
        <el-row style="height: 50px"
          ><el-col :span="1"></el-col
          ><el-col :span="23"
            ><el-image
              style="margin-top: 20px; height: 30px"
              :src="require('../../assets/' + brand_url)"
              :fit="fit" /></el-col
        ></el-row>
        <el-image
          class="left-container"
          style="width: 90%"
          :src="require('../../assets/' + url)"
          :fit="fit"
      /></el-col>
      <el-col :span="12" class="bg-green title-tag-container"
        ><el-row
          ><el-col :span="24" class="text-center"
            ><p class="tagline">Bring on the best assets to your team</p>
            <p class="title-tag">Startup Login</p></el-col
          ></el-row
        >
        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="12"
            ><el-form :model="form" label-width="120px">
              <el-input
                v-model="form.email"
                placeholder="Email Address"
                size="large"
                :input-style="fitt" />
              <el-input
                v-model="form.pass"
                type="password"
                autocomplete="off"
                placeholder="Password"
                size="large"
                :input-style="fitt" />
              <el-row
                ><el-col :span="24" class="text-center form-link-text"
                  ><el-link
                    @click="redirectToStudentRegister()"
                    class="form-link-text"
                    >Register Here</el-link
                  ></el-col
                ></el-row
              >
              <el-row
                ><el-col :span="24" class="text-center form-link-text"
                  ><el-link class="form-link-text"
                    >Forgot Password?</el-link
                  ></el-col
                ></el-row
              >
              <el-row>
                <el-col :span="6"></el-col>
                <el-col :span="12">
                  <el-button
                    @click="login()"
                    class="login-btns"
                    size="large"
                    color="#A5A6F6"
                    ><p class="btn-text">Login</p></el-button
                  >
                </el-col>
                <el-col :span="6"></el-col> </el-row></el-form
          ></el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-container>

  <!-- <div>
    <router-link to="/studentregister"> Create an account here </router-link>
  </div>
  <br /><br />

  <p><input type="email" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="login">Submit</button></p> -->
</template>

<script>
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { reactive } from "vue";
import { doc, getDoc, getFirestore} from "firebase/firestore";
import firebaseApp from "../../main.js" 
export default {
  data() {
    return {
      fit: "fill",
      fitt: {
        height: "50px",
        color: "#808080",
        "font-family": "Poppins",
        "font-weight": 600,
        "box-shadow": "0 0 0 0.5",
        "margin-botton": "20px",
      },
      url: "employer-login-pic.png",
      brand_url: "brand-black.png",
      form: reactive({
        email: "",
        pass: "",
      }),
    };
  },

  methods: {
    
    async login() {

         

      try {
        await signInWithEmailAndPassword(getAuth(), this.form.email, this.form.pass)
        //.then(this.$router.push("/employerhome"))
        .catch((error) => {
        alert(error.message);
        });

        const db = getFirestore(firebaseApp);
        const docRef = doc(db, "User", getAuth().currentUser.uid);
        const docSnap = await getDoc(docRef);
        const status = docSnap.data().Employer

        if (status) {
          this.$router.push('/employerhome')
        } else {
          alert("No such employer account found")
          signOut(getAuth())
        }
        
      } catch {
        (error) => {
          alert(error.message);
          
        };
      }
    },
    redirectToStudentRegister() {
      this.$router.push({ path: "/employerregister" });
    },
    
  },
};
</script>

<style scoped>
.el-input {
  margin-bottom: 20px;
}
body {
  margin: 0px;
}
.container {
  background-color: #fafafa;
}
.form-input {
  background-color: #dbecd1;
  height: 40px;
}
.form-link-text {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  /* color: #1f1d2a !important; */
  font-size: 15px;
  text-decoration: underline;
}
.text-center {
  text-align: center !important;
}
.left-container {
  /* display: flex;
  justify-content: center; */
}
.bg-green {
  background-color: #c1c2f4;
}
.btn-text {
  color: #1f1d2a;
  font-weight: 600;
  font-size: 15px;
}
.login-btns {
  width: 100%;
}
.title-tag {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: #1f1d2a;
  font-size: 20px;
}
.title-tag-container {
  padding-top: 50px;
}
.tagline {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: #1f1d2a;
  font-size: 15px;
}
.header-brand {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: #1f1d2a;
  margin: 0;
  font-size: ;
}
.text-tag2 {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: #9b948e;
  font-size: 18px;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
</style>


//   methods: {
//     async login() {
//       try {
//       await signInWithEmailAndPassword(getAuth(), this.email, this.password)
//       .then(this.$router.push('/employerhome'))
//       .catch((error) => {alert(error.message)})
//       } catch {
//         (error) => {alert(error.message)}
//       }
//   }
//   }
// }