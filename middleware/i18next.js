import Utils from "~/scripts/utils";

export default function({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.defaultLocale;

  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return;
  }

  // Get locale from params
  let locale = params.lang || defaultLocale;

  if (store.state.supportedLocales.indexOf(locale) === -1) {
    return error({ message: "This page could not be found.", statusCode: 404 });
  }

  if (app.$cookies.get("locale") === null || store.state.supportedLocales.indexOf(app.$cookies.get("locale")) === -1) {
    app.$cookies.set("locale", app.defaultLocale, {
      path: "/",
      expires: Utils.getDefaultCookieExpireTime()
    });
  } else {
    locale = app.$cookies.get("locale");
  }

  // Set locale
  store.set("locale", locale);
  app.i18n.i18next.changeLanguage(store.state.locale, err => {
    if (err) return console.error("something went wrong loading", err);
  });

  if ("locale" in route.params) {
    if (locale !== route.params.locale) {
      route.params.locale = locale;
      return redirect(route);
    }
  } else {
    route.params.locale = locale;
    return redirect(`/${locale}${route.fullPath}`);
  }
}
