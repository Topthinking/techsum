import { start } from "award";
import App from "./src/app";
import Provider from "./store";
import docs from "./.docs.js";
import meta from "./.meta.js";

<award-style global>{`
	* {
		margin:0;
		padding: 0;
	}
	li{
		list-style: none;
	}
	.guide-show{
		z-index:10000 !important;
		background: #fff !important;;
	}
`}</award-style>;

start(
  <Provider data={{ meta, docs }}>
    <App />
  </Provider>
);
