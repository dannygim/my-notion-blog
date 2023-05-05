import { FreshOptions } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default { plugins: [twindPlugin(twindConfig)] } as FreshOptions;
