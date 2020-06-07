import * as React from "react";

import Aside from "./aside";
import Content from "./content";
import Search from "./search";
import Guide from "./guide";

import { Context } from "../store";

<award-style>{`
  section {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100vh;
    overflow: hidden;
    width: 100vw;
  }  
`}</award-style>;

const App = () => {
  const [show, setShow] = React.useState(false);
  const { state, dispatch } = React.useContext(Context);

  React.useEffect(() => {
    if (!show) {
      let id = 0;
      if (location.hash) {
        id = location.hash.substr(1).split("-")[0];
        if (!/^\d+$/.test(id)) {
          id = 0;
        } else {
          dispatch({ type: "setHash", payload: location.hash.substr(1) });
        }
      }
      dispatch({ type: "setContent", payload: state.data[id].children });
      dispatch({ type: "setActive", payload: id });
      setShow(true);
      if (location.hash) {
        setTimeout(() => {
          location.href = location.href;
        });
      }
    }
  }, [show]);

  if (show) {
    return (
      <>
        <section>
          <Aside />
          <Content />
        </section>
        <Guide />
        <Search />
      </>
    );
  }
  return null;
};

export default App;
