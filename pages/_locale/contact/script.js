const i18nPrefix = "routes.contact.";

export default {
  name: "Contact",
  head() {
    this.$store.commit("SET_HERO", {
      title: i18nPrefix + "hero.title",
      subtitle: i18nPrefix + "hero.subtitle"
    });

    return { title: this.$t(i18nPrefix + "title") };
  },
  data() {
    return {
      i18nPrefix
    };
  }
};
