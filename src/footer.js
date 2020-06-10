import * as React from "react";
import { Context } from "../store";

<award-style>{`
	footer{
		text-align:center;
		a{
			text-decoration: none;
		}
		.logo-content{
			color: #8c8c8c;
			font-size: 16px;
			border-top: 1px solid #e5e5e5;
			display: flex;
			flex: 0 0 auto;
			justify-content: center;
			align-items: center;
			line-height: 20px;
			cursor: pointer;
			padding:20px 0px;
		}
		a:hover{
			color:#6e6dc3;
		}
	}
`}</award-style>;

const Footer = () => {
  const { state } = React.useContext(Context);

  return (
    <footer className="bottom-container">
      <a
        className="logo-content"
        href="https://github.com/Topthinking/techsum"
        target="_blank"
      >
        <img
          src="http://thoughtsweb.ximalaya.com/static/images/logo.c7c3d8a3.svg"
          className="logo-icon__3g49"
        />
        <span>源自 techsum@{state.config.version} </span>
      </a>
    </footer>
  );
};

export default Footer;
