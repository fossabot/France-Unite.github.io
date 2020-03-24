import { JSDOM } from "jsdom";

import { defaultLocale, supportedLocales } from "./scripts/locales";
import { i18next } from "./scripts/i18n";
import { bestFacebookLocaleFor } from "facebook-locales";

/**
 * Return locale based on route
 * @param route {string} Route where get locale
 * @return {string} Renvoie les paramètres régionaux associés à cette route
 */
const getLocale = route => {
  for (let locale of supportedLocales) {
    if (route.indexOf("/" + locale) === 0) {
      return locale;
    }
  }
  return defaultLocale;
};

const getPageKey = path => {
  let result = path.replace(/-/g, "_");
  result = /(\/[a-z]{2})?\/(.*)/.exec(result);
  if (result[2] === "") {
    return ["home"];
  }

  result = result[2].split("/");

  return result;
};

/**
 * Modify HTML to add some SEO attributes
 * @param page Reference of the page
 * @param locale Current locale
 * @return {string} Return the modified HTML raw
 */
const modifyHtml = (page, locale) => {
  const { window } = new JSDOM(page.html).window;
  const currentURL = hostname + page.route;
  let pageKey = getPageKey(page.route);
  let text;
  let node;
  let tmp;

  // Set locale (lang attribute of html tag)
  window.document.querySelector("html").lang = locale;

  // Open Graph image
  node = window.document.createElement("meta");
  node.setAttribute("property", "og:image");
  node.setAttribute("name", "og:image");
  node.setAttribute("hid", "og:image");

  // Set the title
  text = i18next.t(`routes.${pageKey[0]}.title`, { lng: locale });
  node.content = `${hostname}/icon.png`;
  window.document.querySelector("title").innerHTML = text;
  window.document.querySelector("head").appendChild(node);

  // Open Graph title
  node = window.document.createElement("meta");
  node.setAttribute("property", "og:title");
  node.setAttribute("name", "og:title");
  node.setAttribute("hid", "og:title");
  node.content = text;
  window.document.querySelector("head").appendChild(node);
  // Open Graph type
  node = window.document.createElement("meta");
  node.setAttribute("property", "og:type");
  node.setAttribute("name", "og:type");
  node.setAttribute("hid", "og:type");
  node.content = "website";
  window.document.querySelector("head").appendChild(node);
  // Open Graph url
  node = window.document.createElement("meta");
  node.setAttribute("property", "og:url");
  node.setAttribute("name", "og:url");
  node.setAttribute("hid", "og:url");
  node.content = currentURL;
  window.document.querySelector("head").appendChild(node);
  // Open Graph locale
  node = window.document.createElement("meta");
  node.setAttribute("property", "og:locale");
  node.setAttribute("name", "og:locale");
  node.setAttribute("hid", "og:locale");
  node.content = locale === "en" ? "en_US" : bestFacebookLocaleFor(`${locale}_${locale.toUpperCase()}`);
  window.document.querySelector("head").appendChild(node);
  // Twitter card
  node = window.document.createElement("meta");
  node.name = "twitter:card";
  node.content = "app";
  window.document.querySelector("head").appendChild(node);

  // Set meta description
  text = i18next.t([`routes.${pageKey[0]}.hero.subtitle`, "components.site_layout.hero.slogan_html"], { lng: locale });
  node = window.document.createElement("p");
  node.innerHTML = text;
  text = node.textContent;
  node = window.document.createElement("meta");
  node.name = "description";
  node.content = text;
  window.document.querySelector("head").appendChild(node);

  // Open Graph description
  node = window.document.createElement("meta");
  node.setAttribute("property", "og:description");
  node.setAttribute("name", "og:description");
  node.setAttribute("hid", "og:description");
  node.content = text;
  window.document.querySelector("head").appendChild(node);

  // Set keywords
  text = [
    "covid",
    "coronavirus"
    // TODO
  ].join(", ");

  node = window.document.createElement("meta");
  node.name = "keywords";
  node.content = text;
  window.document.querySelector("head").appendChild(node);

  node = window.document.createElement("link");
  node.rel = "canonical";
  node.href = currentURL;
  window.document.querySelector("head").appendChild(node);

  // Set alternatives lang
  for (let supportedLocale of supportedLocales) {
    if (supportedLocale === locale) {
      continue;
    }
    if (locale === defaultLocale) {
      tmp = `/${supportedLocale}${page.route}`;
    } else {
      if (supportedLocale === defaultLocale) {
        if (page.route === `/${locale}/`) {
          tmp = "/";
        } else {
          tmp = page.route.substr(locale.length + 1);
        }
      } else {
        if (page.route === `/${locale}/`) {
          tmp = `/${supportedLocale}/`;
        } else {
          tmp = `/${supportedLocale}${page.route.substr(locale.length + 1)}`;
        }
      }
    }
    node = window.document.createElement("link");
    node.rel = "alternate";
    node.hreflang = supportedLocale;
    node.href = tmp;
    window.document.querySelector("head").appendChild(node);
    // Open Graph locale:alternate
    node = window.document.createElement("meta");
    node.setAttribute("property", "og:locale:alternate");
    node.setAttribute("name", "og:locale:alternate");
    node.setAttribute("hid", "og:locale:alternate");
    node.content =
      supportedLocale === "en" ? "en_US" : bestFacebookLocaleFor(`${supportedLocale}_${supportedLocale.toUpperCase()}`);
    window.document.querySelector("head").appendChild(node);
  }

  return "<!DOCTYPE html>\n" + window.document.querySelector("html").outerHTML;
};

function generateSitemapRoutes(locales, routes) {
  const result = [];
  const baseURL = "";
  const lastmodISO = new Date().toISOString();
  for (let route of routes) {
    let obj = {};
    obj.url = `${baseURL}${route.route}`;
    obj.changefreq = "weekly";
    obj.lastmodISO = lastmodISO;
    const links = [];
    for (let locale of locales) {
      if (locale === defaultLocale) {
        links.push({ lang: locale, url: `${baseURL}${route.route}` });
      } else {
        links.push({ lang: locale, url: `${baseURL}/${locale}${route.route}` });
      }
    }
    obj.links = links;

    result.push(obj);
    for (let subRoute of route.dynamic) {
      let subObj = {};
      subObj.url = `${baseURL}${route.route}/${subRoute}`;
      subObj.changefreq = "weekly";
      subObj.lastmodISO = lastmodISO;
      const links = [];
      for (let locale of locales) {
        if (locale === defaultLocale) {
          links.push({ lang: locale, url: `${baseURL}${route.route}/${subRoute}` });
        } else {
          links.push({ lang: locale, url: `${baseURL}/${locale}${route.route}/${subRoute}` });
        }
      }
      subObj.links = links;

      result.push(subObj);
    }
  }

  return result;
}

function generateRobotTxt(SitemapURL) {
  return [{ UserAgent: "*" }, { Sitemap: SitemapURL }];
}

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? {
        router: {
          base: "/"
        }
      }
    : {};

const prodUrl = "TODO.localdomain"; // TODO
const hostname = process.env.DEPLOY_ENV === "GH_PAGES" ? `https://${prodUrl}` : "";

const defaultRoutes = [{ route: "/", dynamic: [] }];

const sitemap =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? {
        sitemap: {
          hostname,
          routes: generateSitemapRoutes(supportedLocales, defaultRoutes),
          exclude: []
        }
      }
    : {};

module.exports = {
  ...routerBase,
  ...sitemap,

  env: {
    prodUrl
  },

  loading: {
    color: "#3498db",
    failedColor: "#e74c3c"
  },

  router: {
    middleware: ["i18next"]
  },
  plugins: [
    { src: "~/plugins/clone.js" },
    { src: "~/plugins/i18next.js" },
    { src: "~/plugins/numeral-plugin.js" },
    { src: "~/plugins/moment.js" }
  ],
  generate: {
    fallback: true,
    routes: function() {
      let result = [];
      let prefix;
      for (let locale of supportedLocales) {
        prefix = locale === defaultLocale ? "" : `/${locale}`;
        for (let route of defaultRoutes) {
          result.push(prefix + route.route);
          for (let subRoute of route.dynamic) {
            if (route.payload) {
              result.push({
                route: `${prefix}${route.route}/${subRoute}`,
                payload: route.payload(subRoute)
              });
            } else {
              result.push(`${prefix}${route.route}/${subRoute}`);
            }
          }
        }
      }
      return result;
    }
  },

  modules: [
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "cookie-universal-nuxt",
    "@nuxtjs/axios",
    { src: "~/modules/i18next/module.js" },
    { src: "~/modules/buefy/module.js" },
    "@nuxtjs/pwa"
  ],
  robots: generateRobotTxt(`${hostname}/sitemap.xml`),
  buefy: { defaultIconPack: "fas", materialDesignIcons: false },
  mode: "spa",
  hooks(hook) {
    /**
     * This hook will add some SEO attributes for each generated files
     */
    hook("generate:page", page => {
      page.html = modifyHtml(page, getLocale(page.route));
    });
  },

  head: {
    title: i18next.t("common:site_title"),
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "og:site_name", name: "og:site_name", content: i18next.t("common:site_title") },
      { name: "msapplication-TileColor", content: "#2b5797" },
      { name: "theme-color", content: "#fdf8f0" }
    ],
    script: [
      {
        defer: true,
        src: "https://use.fontawesome.com/releases/v5.0.10/js/all.js",
        integrity: "sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+",
        crossorigin: "anonymous"
      }
    ]
  },

  axios: {
    host: process.env.DEPLOY_ENV === "GH_PAGES" ? prodUrl : "localhost",
    port: process.env.DEPLOY_ENV === "GH_PAGES" ? 443 : 3000,
    https: process.env.DEPLOY_ENV === "GH_PAGES"
  },

  pwa: {
    manifest: {
      name: i18next.t("common:site_title")
    }
  },

  buildModules: ["@nuxtjs/router-extras"]
};
