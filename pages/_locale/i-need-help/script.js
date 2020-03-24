import Editor from "@tinymce/tinymce-vue";

const i18nPrefix = "routes.i_need_help.";

export default {
  name: "INeedHelp",
  head() {
    return {
      title: this.$t(i18nPrefix + "title")
    };
  },
  data() {
    return {
      i18nPrefix,
      jobPositions: [],
      needs: [],
      iAmA: "",
      iNeed: "",
      at: "",
      description: "<h1>Hello World</h1>"
    };
  },
  methods: {
    getAddressData(addressData, placeResultData, id) {
      console.log("address data response: ", addressData, placeResultData, id);
      this.$data.at = addressData;
    }
  },
  components: {
    Editor
  }
};
