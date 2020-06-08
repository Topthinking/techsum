import { start } from "award";
import App from "./src/app";
import Provider from "./store";

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

Promise.all([
  new Promise((resolve) => {
    import("./.docs.js").then((res) => {
      resolve(res.default || res);
    });
  }),
  new Promise((resolve) => {
    import("./.meta.js").then((res) => {
      resolve(res.default || res);
    });
  }),
]).then((data) => {
  const [docs, meta] = data;
  start(
    <Provider data={{ meta, docs }}>
      <App />
    </Provider>
  );
});
