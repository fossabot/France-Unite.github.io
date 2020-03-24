const i18nPrefix = "routes.error.";

function sCode(error) {
  return (error && error.statusCode) || 500;
}

export default {
  props: ["error"],
  head /* istanbul ignore next */: function() {
    return {
      title: this.$t(i18nPrefix + sCode(this.error) + ".title")
    };
  },
  data() {
    return {
      i18nPrefix: i18nPrefix
    };
  },
  computed: {
    statusCode() {
      return sCode(this.error);
    },
    message() {
      const statusCode = sCode(this.error);

      if (
        this.$i18nExists(i18nPrefix + statusCode.toString()) &&
        this.$i18nExists(i18nPrefix + statusCode.toString() + ".message")
      ) {
        return this.$t(i18nPrefix + statusCode.toString() + ".message");
      } else {
        return this.error.message || "messages.client_error";
      }
    }
  }
};
