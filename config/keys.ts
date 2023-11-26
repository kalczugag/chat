import devConfig from "./dev";
import prodConfig from "./prod";

const keys = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default keys;
