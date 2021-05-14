<template>
  <div class="home">
<<<<<<< HEAD
    <h1>你好！首页</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Home'
})
=======
    <h1 class="title">welcome to my home page!</h1>
    <div class="btn-wrap">
      <el-button type="primary" @click="go('/dome')" round>
        study-dome
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    go(url) {
      this.$router.push({ path: url })
    }
  }
}
>>>>>>> dev
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}

.btn-wrap {
  padding: 1rem 2rem;
}

.title {
  display: block;
  padding: 1rem 0;
  text-decoration: none;
  text-align: center;
  line-height: 1.5;
  background-image: -webkit-linear-gradient(
    left,
    #3498db,
    #f47920 10%,
    #d71345 20%,
    #f7acbc 30%,
    #ffd400 40%,
    #3498db 50%,
    #f47920 60%,
    #d71345 70%,
    #f7acbc 80%,
    #ffd400 90%,
    #3498db
  );
  color: transparent;
  background-clip: text;
  background-size: 200% 100%;
  animation: slide 5s infinite linear;
  font-size: 40px;
}
@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
