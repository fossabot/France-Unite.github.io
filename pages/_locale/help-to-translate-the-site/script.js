const i18nPrefix = "routes.help_to_translate_the_site.";

export default {
  name: "HelpToTranslateTheSite",
  head() {
    return { title: this.$t(i18nPrefix + "title") };
  },
  data() {
    this.$store.commit("SET_HERO", {
      title: i18nPrefix + "hero.title",
      subtitle: i18nPrefix + "hero.subtitle"
    });

    return {
      i18nPrefix
    };
  }
};
