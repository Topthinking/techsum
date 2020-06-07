import * as React from "react";
import { Context } from "../store";
import "./content.scss";

const Content = () => {
  const { state, dispatch } = React.useContext(Context);
  return (
    <div className="content">
      <div className="contents">
        {state.content.map((item) => {
          return (
            <div key={item.id} className="item">
              <div id={item.id}>
                <h2>
                  <a
                    className="anchor"
                    aria-hidden="true"
                    href={`#${item.id}`}
                    onClick={() => {
                      dispatch({ type: "setHash", payload: item.id });
                    }}
                  >
                    <svg
                      className="octicon octicon-link"
                      viewBox="0 0 16 16"
                      version="1.1"
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
                      ></path>
                    </svg>
                  </a>
                  {item.name}
                </h2>
              </div>
              <ul>
                {item.children.map((child, childIndex) => {
                  if (/http(s)?\:\/\//.test(child)) {
                    const name = child.replace(/http(s)?\:\/\/(.*)/, "");
                    const href = child.replace(name, "");
                    return (
                      <li key={childIndex}>
                        <div className="line">
                          <span>{name}</span>
                          <a href={href} target="_blank">
                            {href}
                          </a>
                        </div>
                      </li>
                    );
                  }
                  return <li key={childIndex}>{child}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="list">
        <div className="outline">
          {state.content.map((item) => {
            return (
              <div
                key={item.id}
                className={`node ${state.hash === item.id ? "active" : ""}`}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => {
                    dispatch({ type: "setHash", payload: item.id });
                  }}
                >
                  {item.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Content;
