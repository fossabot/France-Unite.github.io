const i18nPrefix = "routes.home.";

export default {
  name: "Home",
  layout: "landing",
  head() {
    return { title: this.$t(i18nPrefix + "title") };
  },
  data() {
    return {
      i18nPrefix
    };
  }
};
