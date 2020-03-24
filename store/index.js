import { defaultLocale } from "~/scripts/locales";
import pathify from "vuex-pathify";
import { make } from "vuex-pathify";

export const plugins = [pathify.plugin];

const hero = {
  title: "components.site_layout.hero.title",
  subtitle: "components.site_layout.hero.slogan_html"
};

export const state = () => ({
  /**
   * Contains all no-dynamic routes
   */
  routes: {
    home: { key: "home", link: "Home" },
    about: { key: "about", link: "About" },
    contact: { key: "contact", link: "Contact" },
    help_to_translate_the_site: { key: "help_to_translate_the_site", link: "HelpToTranslateTheSite" },
    i_need_help: { key: "i_can_help", link: "INeedHelp" },
    i_can_help: { key: "i_need_help", link: "ICanHelp" }
  },

  /**
   * Current locale used
   */
  locale: defaultLocale,

  /**
   * Hero info
   */
  hero,

  /**
   * True for main menu always visible, false otherwise
   */
  isFixedMainMenu: false
});

export const getters = make.getters(state);

export const actions = make.actions(state);

export const mutations = {
  ...make.mutations(state),
  RESTORE_MUTATION: /* istanbul ignore next */ () => {
    this.$RESTORE_MUTATION(this);
  }
};
