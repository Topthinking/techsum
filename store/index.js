import React, { useReducer } from "react";

export const Context = React.createContext({});

function init(data) {
  return {
    showSearch: false,
    content: data.docs[0].children,
    data: data.docs,
    active: 0,
    hash: "",
    guide: -1,
    config: data.meta,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "setShowSearch":
      return { ...state, showSearch: action.payload };
    case "setContent":
      return { ...state, content: action.payload };
    case "setActive":
      return { ...state, active: action.payload };
    case "setHash":
      return { ...state, hash: action.payload };
    case "changeGuide":
      return { ...state, guide: action.payload };
    case "setData":
      return { ...state, data: action.payload };
    case "setMeta":
      return { ...state, config: action.payload };
    default:
      throw new Error();
  }
}

let refresh = false;

const Store = (props) => {
  const [state, dispatch] = useReducer(reducer, props.data, init);

  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      if (window.award_hmr) {
        if (!refresh) {
          refresh = true;
          dispatch({
            type: "setData",
            payload: props.data.docs,
          });
          dispatch({
            type: "setContent",
            payload: props.data.docs[state.active].children,
          });
          dispatch({
            type: "setMeta",
            payload: props.data.meta,
          });
          setTimeout(() => {
            refresh = false;
          });
        }
      }
    }
  });

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export default Store;
