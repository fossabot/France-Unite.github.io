import languageSelector from "~/components/language-selector/LanguageSelector";
import { version } from "~/package.json";
import Utils from "~/scripts/utils";
import Vue from "vue";

const i18nPrefix = "components.site_layout.";

export default {
  head() {
    return {
      link: [
        {
          hid: "icon_1",
          rel: "icon",
          type: "image/png",
          href: "/icon.png"
        }
      ],
      htmlAttrs: {
        lang: "fr"
      }
    };
  },
  data() {
    return {
      i18nPrefix: i18nPrefix,
      siteVersion: version,
      burgerMenuVisible: false,
      mainMenu: [
        {
          ...this.$store.state.routes.home,
          type: Utils.MenuRecordType.PAGE,
          name: this.$t(`main_menu.${this.$store.get("routes.home.key")}`),
          children: []
        }
      ],
      footerLinks: [this.$store.state.routes.about, this.$store.state.routes.contact]
    };
  },
  computed: {},
  watch: {
    "$route.path"() {
      Vue.set(this.$data, "burgerMenuVisible", false);
    }
  },
  methods: {
    toggleMenu() {
      Vue.set(this.$data, "burgerMenuVisible", !this.$data.burgerMenuVisible);
    },
    isActive(key) {
      return this.$route.name === key;
    }
  },
  mounted() {
    this.$formatNumberLocale("fr");
  },
  components: {
    languageSelector
  }
};
