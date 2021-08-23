import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { GACode, defStyleFolder } from "./config";
// import { Helmet } from "react-helmet";

// const _style = defStyleFolder();

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }
  componentDidMount = () => {
    this.importStyle().then(() => {
      this.setState({ loaded: true });
    });
  };
  importStyle = async () => {
    await import(`./styles/css/reset.css`);
    await import(`./styles/css/style.css`);
  };
  render() {
    return (
      <>
        {this.state.loaded === true ? (
          <React.StrictMode>
            {/* <GATag gaCode={GACode[_style]} /> */}
            <App />
          </React.StrictMode>
        ) : null}
      </>
    );
  }
}

// const GATag = ({ gaCode }) => {
// 	return (
// 		<Helmet>
// 			<script
// 				async
// 				src={
// 					"https://www.googletagmanager.com/gtag/js?id=" + gaCode
// 				}></script>
// 			<script>
// 				{`window.dataLayer = window.dataLayer || [];
// 					function gtag(){dataLayer.push(arguments);}
// 					gtag('js', new Date());

// 					gtag('config', '${gaCode}');`}
// 			</script>
// 		</Helmet>
// 	);
// };

ReactDOM.render(<Content />, document.getElementById("root"));
