import * as React from "react";
import { Context } from "../store";

<award-style>{`
	footer{
		text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-top: 1px solid #e5e5e5;
		a{
			text-decoration: none;
		}
		.logo-content{
			color: #8c8c8c;
			font-size: 16px;
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
		p{
			color: #8c8c8c;
			font-size: 10px;
			margin-left: 10px;
			margin-top: 5px;
			.post-meta-divider{
				margin-left:2px;
				margin-right:2px;
			}
		}
	}
	.show{
		color: #000;
		padding: 0px 2px;
		cursor:pointer;
	}
	.show:hover{
		color:#6e6dc3;
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
      <p>
        <span>
          PV<span id="busuanzi_value_site_pv" className="show"></span>次
        </span>
        <span className="post-meta-divider">|</span>
        <span>
          UV<span id="busuanzi_value_site_uv" className="show"></span>人
        </span>
      </p>
    </footer>
  );
};

export default Footer;
