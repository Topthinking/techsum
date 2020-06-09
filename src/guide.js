import * as React from "react";
import { Context } from "../store";
import searchSvg from "./search.drawio.svg";
import addSvg from "./add.drawio.svg";
import yes from "./assets/yes.drawio.svg";

import "./guide.scss";

const Guide = () => {
  const { state, dispatch } = React.useContext(Context);

  React.useEffect(() => {
    // localStorage.clear();
    const tag = localStorage.getItem(state.config.localStorage);
    if (!tag) {
      localStorage.setItem(state.config.localStorage, 1);
      dispatch({
        type: "changeGuide",
        payload: 0,
      });
    }
  }, []);

  if (state.guide < 0 || state.guide > 1) {
    return null;
  }

  return (
    <div
      className="guide"
      onClick={() => {
        if (!state.config["guide-button"]) {
          dispatch({
            type: "changeGuide",
            payload: state.guide + 1,
          });
        }
      }}
    >
      <div className="mask"></div>
      {state.guide === 0 ? (
        <div className="mask-guide-search">
          <img src={searchSvg} />
          <p>
            快来搜索您需要的技术指导，键盘快捷键【S】即可快速唤起，支持拼音搜索哦~~
          </p>
          {state.config["guide-button"] ? (
            <img
              src={yes}
              className="guide-yes"
              onClick={() => {
                dispatch({
                  type: "changeGuide",
                  payload: state.guide + 1,
                });
              }}
            />
          ) : null}
        </div>
      ) : null}
      {state.guide === 1 ? (
        <div
          className={
            "mask-guide-add " + (state.config.pipeline ? "pipeline" : "")
          }
        >
          <img src={addSvg} />
          <p>快来分享您的技术清单</p>
          {state.config["guide-button"] ? (
            <img
              src={yes}
              className="guide-yes"
              onClick={() => {
                dispatch({
                  type: "changeGuide",
                  payload: state.guide + 1,
                });
              }}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Guide;
