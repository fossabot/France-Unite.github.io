export default {
  name: "YesNo",
  props: {
    value: {
      type: Boolean,
      required: true
    },
    label: String,
    customId: String
  },
  data() {
    return {
      newValue: this.value,
      id: this.$props.customId ? this.$props.customId : ""
    };
  },
  watch: {
    /**
     * When v-model change, set internal value.
     */
    value(value) {
      this.newValue = value;
    },
    /**
     * Emit input event to update the user v-model.
     */
    newValue(value) {
      this.$emit("input", value);
    }
  }
};
