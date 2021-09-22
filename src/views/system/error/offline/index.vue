<template>
  <div class="page">
    <div style="margin-bottom: 137px; color: #96a1b1">暂无网络</div>
    <img src="../../../../assets/image/offine.svg" alt="暂无网络" />
  </div>
</template>
<script>
export default {
  name: "offline",
};
</script>
<style lang="scss" scoped>
.page {
  position: relative;
  background-blend-mode: multiply, multiply;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  div {
    text-align: center;
  }
  img {
    width: 500px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
