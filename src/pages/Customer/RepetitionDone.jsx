import React from "react";
import { Result, Icon, message} from "antd";
import "./RepetitionDone.css";
//import CongraIcon from "../../components/Global/CongraIcon";


class RepetitionDone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

    message.open({
      //icon: "./raindrop.svg",
      content: "💧 + 3",
      top: 100,
      duration: 2,
      maxCount: 3,
    })

  }

  render(){
    const congraSvg = () => (
      <svg width="40px" height="40px" fill="#F7887D" viewBox="0 0 1024 1024" >
        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
      </svg>);
   // const congraSvg = () => (<svg data-name="Layer 1" id="Layer_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title/><desc/><path d="M40.23,38.79h0L22.15,20.71l-.91,1.92L34.3,35.69a4,4,0,0,1-1.12,6.44l-9.6,4.55a8.06,8.06,0,0,1-11.25-5.23L3.06,61,43.37,41.93Z" style={{fill:"#cff09e"}}/><polygon points="41.23 39.79 29.92 28.48 19.76 25.76 16.28 33.11 41.23 39.79" style={{fill:"#79bd9a"}}/><polygon points="34.31 46.22 12.8 40.46 9.32 47.8 23.14 51.51 34.31 46.22" style={{fill:"#79bd9a"}}/><polygon points="3.06 61.02 11.97 56.8 5.84 55.16 3.06 61.02" style={{fill:"#79bd9a"}}/><path d="M21.36,17.27l0,0Z" style={{fill:"#cff09e"}}/><path d="M46,43.15a2,2,0,0,0-.51-1.92L22.85,18.6a2,2,0,0,0-1.92-.51,2.1,2.1,0,0,1,.41-.8A2,2,0,0,0,21.45,20L44.07,42.63a2,2,0,0,0,2.72.11A2.1,2.1,0,0,1,46,43.15Z" style={{fill:"#cff09e"}}/><path d="M46.84,42.69l0,0Z" style={{fill:"#cff09e"}}/><polygon points="59.61 4.47 57.93 9.43 61.06 13.63 55.83 13.56 52.8 17.83 51.25 12.83 46.25 11.28 50.52 8.26 50.45 3.02 54.65 6.15 59.61 4.47" style={{fill:"#cff09e"}}/><path d="M25,16.47a3,3,0,0,0-4.24,4.24l.21.21-2.72,5.74-2.85,6h0l-10.43,22h0L2.16,60.59A1,1,0,0,0,3.06,62a.94.94,0,0,0,.43-.1L28.65,50l6.08-2.88h0l8.42-4,.21.21a3,3,0,1,0,4.24-4.24ZM37.89,37.86,17.7,32.45l2.61-5.51,9.09,2.43,3.76,3.76ZM21.18,25.1l1.27-2.68,4.12,4.13Zm3.9,24.38-2,1-12.3-3.3,2.61-5.51,18.07,4.84Zm-13.2,6.26L7.26,54.5,9.87,49l10.38,2.78ZM5.16,58.92l1.23-2.58,2.69.72ZM34.21,45.16l-20-5.36,2.61-5.51,23.88,6.4.95.94Zm12-3.23a1,1,0,0,1-1.42,0l-.71-.71L33.47,30.61,22.15,19.3a1,1,0,0,1,0-1.42,1,1,0,0,1,1.42,0L46.2,40.51a1,1,0,0,1,0,1.42Z" style={{fill:"#3b8686"}}/><path d="M46,12.23l4.5,1.4,1.4,4.5a1,1,0,0,0,.8.69h.15a1,1,0,0,0,.82-.42l2.72-3.84,4.71,0a.93.93,0,0,0,.9-.54A1,1,0,0,0,61.86,13L59.05,9.25l1.51-4.46a1,1,0,0,0-1.27-1.27L54.83,5,51.05,2.22A1,1,0,0,0,49.46,3l.06,4.71-3.85,2.72A1,1,0,0,0,46,12.23ZM51.1,9.07a1,1,0,0,0,.42-.83l0-3.21L54.05,7A1,1,0,0,0,55,7.1l3-1-1,3a1,1,0,0,0,.15.92l1.92,2.57-3.21,0A1,1,0,0,0,55,13L53.15,15.6l-.95-3.06a1,1,0,0,0-.66-.66l-3.06-1Z" style={{fill:"#3b8686"}}/><path d="M30.56,18.54a1,1,0,0,0,.5,1.87,1,1,0,0,0,.5-.13A13,13,0,0,0,36.32,2.52a1,1,0,1,0-1.73,1A11,11,0,0,1,30.56,18.54Z" style={{fill:"#3b8686"}}/><path d="M61.93,29.13a1,1,0,0,0-.37-1.37A13,13,0,0,0,43.8,32.52a1,1,0,0,0,1.74,1,11,11,0,0,1,15-4A1,1,0,0,0,61.93,29.13Z" style={{fill:"#3b8686"}}/><path d="M38.35,25.73a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l7-7a1,1,0,0,0-1.42-1.42l-7,7A1,1,0,0,0,38.35,25.73Z" style={{fill:"#3b8686"}}/><path d="M27.69,15a1,1,0,0,0,.37.07,1,1,0,0,0,.93-.63l2-5a1,1,0,1,0-1.86-.74l-2,5A1,1,0,0,0,27.69,15Z" style={{fill:"#3b8686"}}/><path d="M53.69,34.09l-5,2A1,1,0,0,0,49.06,38a.94.94,0,0,0,.37-.07l5-2a1,1,0,0,0-.74-1.86Z" style={{fill:"#3b8686"}}/><path d="M58.06,24a1,1,0,0,0,1-1V22h1a1,1,0,0,0,0-2h-1V19a1,1,0,1,0-2,0v1h-1a1,1,0,0,0,0,2h1v1A1,1,0,0,0,58.06,24Z" style={{fill:"#3b8686"}}/><path d="M40.53,7.73a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29L42.65,7l.7.71a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42l-.71-.71.71-.7a1,1,0,0,0-1.42-1.42l-.7.71-.71-.71a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l.7.7-.7.71A1,1,0,0,0,40.53,7.73Z" style={"fill:#3b8686"}/><path d="M46.06,24a1,1,0,1,0,2,.11,1,1,0,0,0-2-.11Z" style={{fill:"#3b8686"}}/><circle cx="41.06" cy="15.02" r="1" style={{fill:"#3b8686"}}/><circle cx="30.06" cy="4.02" r="1" style={{fill:"#3b8686"}}/><circle cx="61.06" cy="34.02" r="1" style={{fill:"#3b8686"}}/><circle cx="37.06" cy="21.02" r="1" style={{fill:"#3b8686"}}/></svg>);
    const CongraIcon = props => <Icon component={congraSvg} {...props}/>;

    return <div className={"content"}>
      <img className={"welldone-img"} src={"https://www.pngtube.com/myfile/detail/70-708989_transparent-well-done-clipart-png.png"}/>
      <div className={"finished-text"}><h1>FINISHED 💪</h1></div>
      {/*<CongraIcon />*/}

    </div>;
  }
}

export default RepetitionDone;