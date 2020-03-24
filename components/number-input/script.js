/*
 * Note: this components is just a Copy/Paste of Buefy numberinput.
 * The only things that has been change is the use of span instead of buttons.
 *
 * @see https://github.com/buefy/buefy/blob/dev/src/components/numberinput/Numberinput.vue
 */

const config = {
  defaultUseHtml5Validation: true,
  defaultIconPack: "mdi"
};

const FormElementMixin = {
  props: {
    size: String,
    expanded: Boolean,
    loading: Boolean,
    rounded: Boolean,
    icon: String,
    iconPack: String,
    // Native options to use in HTML5 validation
    autocomplete: String,
    maxlength: [Number, String],
    useHtml5Validation: {
      type: Boolean,
      default: () => config.defaultUseHtml5Validation
    }
  },
  data() {
    return {
      isValid: true,
      isFocused: false,
      newIconPack: this.iconPack || config.defaultIconPack
    };
  },
  computed: {
    /**
     * Find parent Field, max 3 levels deep.
     */
    parentField() {
      let parent = this.$parent;
      for (let i = 0; i < 3; i++) {
        if (parent && !parent.$data._isField) {
          parent = parent.$parent;
        }
      }
      return parent;
    },

    /**
     * Get the type prop from parent if it's a Field.
     */
    statusType() {
      if (!this.parentField) return;
      if (!this.parentField.newType) return;
      if (typeof this.parentField.newType === "string") {
        return this.parentField.newType;
      } else {
        for (let key in this.parentField.newType) {
          if (this.parentField.newType[key]) {
            return key;
          }
        }
      }
    },

    /**
     * Get the message prop from parent if it's a Field.
     */
    statusMessage() {
      if (!this.parentField) return;

      return this.parentField.newMessage;
    },

    /**
     * Fix icon size for inputs, large was too big
     */
    iconSize() {
      switch (this.size) {
        case "is-small":
          return this.size;
        case "is-medium":
          return;
        case "is-large":
          return this.newIconPack === "mdi" ? "is-medium" : "";
      }
    }
  },
  methods: {
    /**
     * Focus method that work dynamically depending on the component.
     */
    focus() {
      if (this.$data._elementRef === undefined) return;

      this.$nextTick(() => {
        const el = this.$el.querySelector(this.$data._elementRef);
        if (el) el.focus();
      });
    },

    onBlur($event) {
      this.isFocused = false;
      this.$emit("blur", $event);
      this.checkHtml5Validity();
    },

    onFocus($event) {
      this.isFocused = true;
      this.$emit("focus", $event);
    },

    /**
     * Check HTML5 validation, set isValid property.
     * If validation fail, send 'is-danger' type,
     * and error message to parent if it's a Field.
     */
    checkHtml5Validity() {
      if (!this.useHtml5Validation) return;

      if (this.$refs[this.$data._elementRef] === undefined) return;

      const el = this.$el.querySelector(this.$data._elementRef);

      let type = null;
      let message = null;
      let isValid = true;
      if (!el.checkValidity()) {
        type = "is-danger";
        message = el.validationMessage;
        isValid = false;
      }
      this.isValid = isValid;

      this.$nextTick(() => {
        if (this.parentField) {
          // Set type only if not defined
          if (!this.parentField.type) {
            this.parentField.newType = type;
          }
          // Set message only if not defined
          if (!this.parentField.message) {
            this.parentField.newMessage = message;
          }
        }
      });

      return this.isValid;
    }
  }
};

export default {
  name: "Numberinput",
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    value: Number,
    min: [Number, String],
    max: [Number, String],
    step: [Number, String],
    disabled: Boolean,
    type: {
      type: String,
      default: "is-primary"
    },
    editable: {
      type: Boolean,
      default: true
    },
    controlsRounded: {
      type: Boolean,
      default: false
    },
    controlsPosition: String
  },
  data() {
    return {
      newValue: !isNaN(this.value) ? this.value : parseFloat(this.min) || 0,
      newStep: this.step || 1,
      _elementRef: "input"
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        let newValue = value;
        if (value === "") {
          newValue = parseFloat(this.min) || 0;
        }
        this.newValue = newValue;
        this.$emit("input", newValue);
        this.$refs.input.checkHtml5Validity();
      }
    },
    fieldClasses() {
      return [
        { "has-addons": this.controlsPosition === "compact" },
        { "is-grouped": this.controlsPosition !== "compact" }
      ];
    },
    buttonClasses() {
      return [this.type, this.size, { "is-rounded": this.controlsRounded }];
    },
    minNumber() {
      return typeof this.min === "string" ? parseFloat(this.min) : this.min;
    },
    maxNumber() {
      return typeof this.max === "string" ? parseFloat(this.max) : this.max;
    },
    stepNumber() {
      return typeof this.newStep === "string" ? parseFloat(this.newStep) : this.newStep;
    },
    disabledMin() {
      return this.computedValue - this.stepNumber < this.minNumber;
    },
    disabledMax() {
      return this.computedValue + this.stepNumber > this.maxNumber;
    },
    stepDecimals() {
      const step = this.stepNumber.toString();
      const index = step.indexOf(".");
      if (index >= 0) {
        return step.substring(index + 1).length;
      }
      return 0;
    }
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Set internal value.
     */
    value(value) {
      this.newValue = value;
    }
  },
  methods: {
    decrement() {
      if (typeof this.minNumber === "undefined" || this.computedValue - this.stepNumber >= this.minNumber) {
        const value = this.computedValue - this.stepNumber;
        this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
      }
    },
    increment() {
      if (typeof this.maxNumber === "undefined" || this.computedValue + this.stepNumber <= this.maxNumber) {
        const value = this.computedValue + this.stepNumber;
        this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
      }
    },
    onControlClick(event, inc) {
      if (event.detail !== 0) return;
      if (inc) this.increment();
      else this.decrement();
    },
    onStartLongPress(event, inc) {
      if (event.button !== 0 && event.type !== "touchstart") return;
      this._$intervalTime = new Date();
      clearInterval(this._$intervalRef);
      this._$intervalRef = this._$intervalRef = setInterval(() => {
        if (inc) this.increment();
        else this.decrement();
      }, 100);
    },
    onStopLongPress(inc) {
      const d = new Date();
      if (d - this._$intervalTime < 100) {
        if (inc) this.increment();
        else this.decrement();
      }
      clearInterval(this._$intervalRef);
      this._$intervalRef = null;
    }
  }
};
