<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import util from "@/libs/util";
export default {
  name: "app",
  watch: {
    "$i18n.locale": "i18nHandle",
  },
  data() {
    return {
      onLine: navigator.onLine,
    };
  },
  created() {
    this.i18nHandle(this.$i18n.locale);
  },
  mounted() {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },

  methods: {
    updateOnlineStatus(e) {
      console.log(e.type);
      const { type } = e;
      this.onLine = type === "online";
      if (type != "online") {
        this.$router.push({
          name: "offline",
        });
      } else {
        this.$router.push({
          name: "index",
        });
      }
    },
    i18nHandle(val, oldVal) {
      util.cookies.set("lang", val);
      document.querySelector("html").setAttribute("lang", val);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/style/public-class.scss";
</style>
