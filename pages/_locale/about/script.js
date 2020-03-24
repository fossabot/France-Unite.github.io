const i18nPrefix = "routes.about.";

export default {
  name: "About",
  head() {
    return { title: this.$t(i18nPrefix + "title") };
  },
  data() {
    return {
      i18nPrefix
    };
  }
};
