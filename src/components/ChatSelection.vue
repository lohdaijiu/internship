!<template>
  <el-row>
    <el-col
      v-for="(o, index) in 20"
      :key="o"
      :span="4"
      :offset="index % 4 ? 2 : 1"
    >
      <el-card :body-style="{ padding: '0px' }">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div style="padding: 14px">
          <span>Yummy hamburger</span>

            <el-button type="text" class="button">Operating</el-button>
          </div>

      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {

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