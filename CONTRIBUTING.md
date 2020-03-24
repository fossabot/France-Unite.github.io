## Contributing

Please, create a fork and an explicit branch/flow name. For exemple, if you fix something (ex: mail sending) create a branch like this: `git checkout -b fix/mail-sending` or with flow `git flow hotfix mail-sending`.



For commit message, follow [this convention](https://conventionalcommits.org/).



**PR are accepted on `develop` branch**. Master branch only contains compiled sources (from production branch) to host the website on GitHub static page.



### Adding language

For adding language, create a json file in `locales/` where the name is a code of language (that follow [ISO 639-1](https://www.loc.gov/standards/iso639-2/php/code_list.php) or more globally, [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)).

In `locales/common.json` add the language in `lang`. Values should following this syntax:

```json
"code of language": {
    "en": "Your language in english",
    "original": "your language in your language"
}

Example:
"fr": { "en": "French", "original": "Français" },
"nb_NO": { "en": "Bokmål", "original": "Bokmål" }
```



Next, in `scripts/i18n.js` (and in `plugins/i18next.js`) import the language (example: `import fr from "../locales/fr.json";`) and add it in **resources**.

Finally, in `scripts/locales.js`, import numeral corresponding to the locale (example: `import "numeral/locales/fr";`) and add it in **supportedLocales**.
