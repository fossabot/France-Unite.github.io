const i18nPrefix = "routes.i_can_help.";

export default {
  name: "ICanHelp",
  head() {
    return { title: this.$t(i18nPrefix + "title") };
  },
  data() {
    return {
      i18nPrefix
    };
  }
};
