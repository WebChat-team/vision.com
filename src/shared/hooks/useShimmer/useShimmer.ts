// imports ================================================== //
import getClassName from "@/shared/lib/getClassName";
import styles from "./index.module.css";
import { UseShimmer as UseShimmerType } from "./types";

// helpers ================================================== //
function createUniversalProxy<Type>(primitiveValue = 0): Type {
  return new Proxy({}, {
    get(target, prop) {
      if (typeof prop === 'string' || typeof prop === 'number') {
        return "";
      }
      return createUniversalProxy(primitiveValue);
    },
    // @ts-ignore
    valueOf() {
      return "";
    },
    toString() {
      return "";
    },
    [Symbol.toPrimitive](hint: string) {
      return "";
    }
  }) as Type;
};

// main ===================================================== //
const useShimmer: UseShimmerType = (data) => (
  data
    ? [data, getClassName(styles.shimmer_container, styles.success)]
    : [createUniversalProxy(), getClassName(styles.shimmer_container, styles.loading)]
);
const useStyleShimmer = (status: "loading" | "success" | "failed") => {

  switch (status) {

    case "loading":
      return getClassName(styles.shimmer_container, styles.loading);

    case "success":
      return getClassName(styles.shimmer_container, styles.success);

    case "failed":
      return getClassName(styles.shimmer_container, styles.failed);

  }

}
// exports ================================================== //
export default useShimmer;
export { useStyleShimmer };