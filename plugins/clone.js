import clone from "lodash.clonedeep";

export default (ctx, inject) => {
  inject("clone", clone);
};
