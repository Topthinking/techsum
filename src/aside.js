import * as React from "react";
import { Context } from "../store";
import "./aside.scss";

const Aside = () => {
  const { state, dispatch } = React.useContext(Context);
  return (
    <aside>
      <div className="header">
        <img src={state.config.logo} />
        <h1>{state.config.name}</h1>
        <p>{state.config.description}</p>
      </div>
      {state.config.pipeline ? (
        <a href={state.config.pipeline.url} target="_blank">
          <img className="badge" src={state.config.pipeline.img} />
        </a>
      ) : null}
      <div className="list">
        <a
          href={state.config.add}
          target="_blank"
          className={"icon-add" + (state.guide === 1 ? " guide-show" : "")}
          title={state.config.addDesc}
          onClick={(e) => {
            if (state.guide === 1) {
              if (!state.config["guide-button"]) {
                dispatch({
                  type: "changeGuide",
                  payload: state.guide + 1,
                });
              }
              e.stopPropagation();
              e.preventDefault();
              return false;
            }
          }}
        >
          <svg
            viewBox="0 0 20 20"
            className="icon__3Axq icon__1S0g"
            data-type="add"
          >
            <path
              d="M10.6,9.39999998 L16.5,9.39999998 L16.5,10.6 L10.6,10.6 L10.6,16.5 L9.39999998,16.5 L9.39999998,10.6 L3.5,10.6 L3.5,9.39999998 L9.39999998,9.39999998 L9.39999998,3.5 L10.6,3.5 L10.6,9.39999998 Z"
              fillRule="evenodd"
            ></path>
          </svg>
        </a>

        {state.data.map((item) => {
          return (
            <div
              key={item.id}
              className="node"
              onClick={() => {
                let nV = [];
                state.data.map((text) => {
                  if (text.id === item.id) {
                    nV = text.children;
                  }
                });
                dispatch({ type: "setActive", payload: item.id });
                dispatch({ type: "setContent", payload: nV });
                location.href =
                  location.origin + location.pathname + "#" + item.id + "-1";
              }}
            >
              <div
                data-is-active="false"
                data-is-expanded="true"
                className={`wrapper ${
                  Number(state.active) === Number(item.id) ? "active" : ""
                }`}
              >
                <div className="content">
                  <div className="mark-icon before-icon">·</div>
                  <span className="node-title">{item.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Aside;
