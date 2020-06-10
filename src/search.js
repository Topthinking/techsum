import * as React from "react";

import { Context } from "../store";

import "./search.scss";
import gitlabImg from "./assets/gitlab.jpg";

let time = null;

const Search = () => {
  const { state, dispatch } = React.useContext(Context);

  const searchContent = React.useRef(null);
  const inputEl = React.useRef(null);

  const [total, setTotal] = React.useState(0);
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchV, setSearchV] = React.useState("");
  const [searchRes, setSearchRes] = React.useState([]);

  const ref = React.useRef("");

  React.useEffect(() => {
    ref.current = searchV;
    if (searchV === "") {
      setTotal(0);
      setSearchRes([]);
    } else {
      if (time) {
        clearTimeout(time);
      }
      time = setTimeout(() => {
        clearTimeout(time);
        if (ref.current === "") {
          setTotal(0);
          setSearchRes([]);
        } else {
          const nT = [];
          let _total = 0;
          state.data.map((text) => {
            let existT = false;
            const { children, ...rests } = text;
            const _t = {
              children: [],
            };
            children.map((t) => {
              let exist = false;
              t.pinyin.map((py) => {
                let st = "";
                py.map((_py) => {
                  _py.map((p) => {
                    st += p;
                    if (ref.current === p) {
                      exist = true;
                    }
                  });
                });
                if (
                  !/http(s)?\:\/\//.test(st) &&
                  new RegExp(ref.current, "i").test(st)
                ) {
                  exist = true;
                }
              });
              if (new RegExp(ref.current, "i").test(t.name)) {
                exist = true;
              }
              t.children.map((item) => {
                if (
                  !/http(s)?\:\/\//.test(item) &&
                  new RegExp(ref.current, "i").test(item)
                ) {
                  exist = true;
                }
              });
              if (exist) {
                _total++;
                existT = true;
                _t.children.push(t);
              }
            });

            if (existT) {
              Object.assign(_t, rests);
              nT.push(_t);
            }
          });
          setTotal(_total);
          setSearchRes(nT);
        }
      }, 300);
    }
  }, [searchV]);

  React.useEffect(() => {
    if (showSearch) {
      inputEl.current.focus();
    }
  }, [showSearch]);

  React.useEffect(() => {
    document.addEventListener("keydown", function (e) {
      if (document.getElementsByClassName("guide-show").length === 0) {
        if (e.keyCode === 27) {
          // esc
          setShowSearch(false);
        } else {
          if (e.keyCode === 83) {
            setShowSearch(true);
          }
          if (/windows|win32|win64/i.test(navigator.userAgent)) {
            if (e.keyCode === 70 && e.ctrlKey) {
              e.preventDefault();
              setShowSearch(true);
            }
          } else {
            if (e.keyCode === 70 && e.metaKey) {
              e.preventDefault();
              setShowSearch(true);
            }
          }
        }
      }
    });
  }, []);

  const filename = state.data[state.active].filename;
  return (
    <>
      <div
        className={"search-btn" + (state.guide === 0 ? " guide-show" : "")}
        onClick={() =>
          state.guide !== 0
            ? setShowSearch(true)
            : !state.config["guide-button"]
            ? dispatch({
                type: "changeGuide",
                payload: state.guide + 1,
              })
            : null
        }
      >
        <svg viewBox="0 0 20 20" data-type="search" className="icon">
          <path
            d="M15.8234,16.5518 L12.7934,13.5228 C12.6974,13.4258 12.6444,13.2958 12.6444,13.1578 C12.6444,13.0198 12.6974,12.8898 12.7934,12.7938 C12.8934,12.6938 13.0254,12.6438 13.1574,12.6438 C13.2894,12.6438 13.4214,12.6938 13.5214,12.7938 L16.5514,15.8228 L15.8234,16.5518 L15.8234,16.5518 Z M4.5034,10.7958 C2.7684,9.0608 2.7684,6.2388 4.5034,4.5038 C5.3704,3.6358 6.5104,3.2018 7.6494,3.2018 C8.7884,3.2018 9.9284,3.6358 10.7954,4.5038 C12.5304,6.2388 12.5304,9.0608 10.7954,10.7958 C9.0604,12.5298 6.2384,12.5308 4.5034,10.7958 L4.5034,10.7958 Z M17.8244,15.3998 L14.3704,11.9458 C13.8514,11.4268 13.0814,11.3158 12.4504,11.6018 L12.0274,11.1788 C12.8364,10.1778 13.2984,8.9548 13.2984,7.6498 C13.2984,6.1408 12.7114,4.7218 11.6444,3.6548 C9.4404,1.4508 5.8574,1.4518 3.6544,3.6548 C2.5874,4.7218 2.0004,6.1408 2.0004,7.6498 C2.0004,9.1578 2.5874,10.5768 3.6544,11.6438 C4.7564,12.7448 6.2024,13.2958 7.6494,13.2958 C8.9054,13.2958 10.1464,12.8548 11.1764,12.0258 L11.6004,12.4498 C11.5004,12.6698 11.4444,12.9088 11.4444,13.1578 C11.4444,13.6168 11.6224,14.0478 11.9454,14.3698 L15.3994,17.8238 C15.5114,17.9378 15.6644,17.9998 15.8234,17.9998 C15.9824,17.9998 16.1354,17.9378 16.2474,17.8238 L17.8244,16.2468 C18.0584,16.0128 18.0584,15.6328 17.8244,15.3998 L17.8244,15.3998 Z"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
      <a
        href={`${state.config.edit}/docs/${filename}`}
        target="_blank"
        className="edit"
      >
        EDIT
      </a>
      <a href={state.config.gitlab || state.config.github} target="_blank">
        <img src={gitlabImg} />
      </a>

      <div
        className={`modal ${showSearch ? "active" : ""}`}
        data-id="123"
        onClick={(e) => {
          if (!searchContent.current.contains(e.target)) {
            setShowSearch(false);
          }
        }}
      >
        <div className="mask"></div>
        <div className="content" ref={searchContent}>
          <div className="input">
            <svg viewBox="0 0 20 20" className="icon" data-type="search">
              <path
                d="M15.8234,16.5518 L12.7934,13.5228 C12.6974,13.4258 12.6444,13.2958 12.6444,13.1578 C12.6444,13.0198 12.6974,12.8898 12.7934,12.7938 C12.8934,12.6938 13.0254,12.6438 13.1574,12.6438 C13.2894,12.6438 13.4214,12.6938 13.5214,12.7938 L16.5514,15.8228 L15.8234,16.5518 L15.8234,16.5518 Z M4.5034,10.7958 C2.7684,9.0608 2.7684,6.2388 4.5034,4.5038 C5.3704,3.6358 6.5104,3.2018 7.6494,3.2018 C8.7884,3.2018 9.9284,3.6358 10.7954,4.5038 C12.5304,6.2388 12.5304,9.0608 10.7954,10.7958 C9.0604,12.5298 6.2384,12.5308 4.5034,10.7958 L4.5034,10.7958 Z M17.8244,15.3998 L14.3704,11.9458 C13.8514,11.4268 13.0814,11.3158 12.4504,11.6018 L12.0274,11.1788 C12.8364,10.1778 13.2984,8.9548 13.2984,7.6498 C13.2984,6.1408 12.7114,4.7218 11.6444,3.6548 C9.4404,1.4508 5.8574,1.4518 3.6544,3.6548 C2.5874,4.7218 2.0004,6.1408 2.0004,7.6498 C2.0004,9.1578 2.5874,10.5768 3.6544,11.6438 C4.7564,12.7448 6.2024,13.2958 7.6494,13.2958 C8.9054,13.2958 10.1464,12.8548 11.1764,12.0258 L11.6004,12.4498 C11.5004,12.6698 11.4444,12.9088 11.4444,13.1578 C11.4444,13.6168 11.6224,14.0478 11.9454,14.3698 L15.3994,17.8238 C15.5114,17.9378 15.6644,17.9998 15.8234,17.9998 C15.9824,17.9998 16.1354,17.9378 16.2474,17.8238 L17.8244,16.2468 C18.0584,16.0128 18.0584,15.6328 17.8244,15.3998 L17.8244,15.3998 Z"
                fillRule="evenodd"
              ></path>
            </svg>
            <input
              name="search"
              placeholder="搜索 前端技术摘要"
              autoComplete="off"
              value={searchV}
              onChange={(e) => {
                setSearchV(e.target.value);
              }}
              ref={inputEl}
            />
          </div>

          {searchRes.length ? (
            <div id="search-result">
              <p>
                为您找到相关结果<b>{total}</b>个
              </p>
              {searchRes.map((item) => {
                if (item.children.length) {
                  return (
                    <div key={item.id} className="search-item">
                      <h1>{item.name}</h1>
                      <hr />
                      {item.children.map((child) => {
                        return (
                          <div
                            className="select"
                            onClick={() => {
                              let nV = [];
                              state.data.map((text) => {
                                if (text.id === item.id) {
                                  nV = text.children;
                                }
                              });
                              dispatch({
                                type: "setActive",
                                payload: item.id,
                              });
                              dispatch({ type: "setContent", payload: nV });
                              dispatch({
                                type: "setHash",
                                payload: child.id,
                              });
                              setShowSearch(false);
                              setTimeout(() => {
                                location.href =
                                  location.origin +
                                  location.pathname +
                                  "#" +
                                  child.id;
                              });
                            }}
                            key={child.id}
                          >
                            <div id={child.id}>
                              <h2>{child.name}</h2>
                            </div>
                            <ul>
                              {child.children.map((_child, index) => {
                                if (/http(s)?\:\/\//.test(_child)) {
                                  return null;
                                }
                                return <li key={index}>{_child}</li>;
                              })}
                            </ul>
                          </div>
                        );
                      })}
                      <br />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Search;
