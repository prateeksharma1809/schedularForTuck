import React from "react";
import axios from "axios";
import moment from 'moment';
// import moment from 'moment-timezone';
import { backendData } from "./Data.js";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      name: "",
      interFirm: "",
      fullTmOffer: "",
      MentorOrMentee: "Mentee",
      errorMessage: "",
      successMessage: "",
      caseName: "",
      officeLoc:"",
      numberOfCases:"10"
    };
  }

  componentDidMount() {
    this.setState({
      userName: this.props.userName,
      password: this.props.password,
      name: this.props.name,
      interFirm: this.props.interFirm,
      fullTmOffer: this.props.fullTmOffer,
      MentorOrMentee: this.props.MentorOrMentee,
      caseName: this.props.caseName,
      officeLoc:this.props.officeLoc,
      numberOfCases:this.props.numberOfCases
    });
    
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        userName: this.props.userName,
        password: this.props.password,
        name: this.props.name,
        interFirm: this.props.interFirm,
        fullTmOffer: this.props.fullTmOffer,
        MentorOrMentee: this.props.MentorOrMentee,
        caseName: this.props.caseName,
        officeLoc:this.props.officeLoc,
        numberOfCases:this.props.numberOfCases
      });
    }
  }

  async updateAvailability(e){
    // console.log(e);
    const body = {
      userName: this.state.userName,
      password: this.state.password,
      name: this.state.name,
      interFirm: this.state.interFirm,
      fullTmOffer: this.state.fullTmOffer,
      isMentor: this.state.MentorOrMentee === "Mentor",
      startDate: e.startDate,
      endDate: e.endDate,
    };
    const headers = {
      "Access-Control-Allow-Origin": backendData.URL,
    };
    try {
      const response = await axios.post(
        `${backendData.URL}/delete-availability`,
        body,
        {
          headers,
        }
      );
      // console.log(response);
      this.setState({ successMessage: response.data, errorMessage: "" });
      this.props.getUserDetails();
    } catch (e) {
      // console.log(e);
      if (e && e.response && e.response.data) {
        this.setState({
          errorMessage: e.response.data.message,
          successMessage: "",
        });
      } else {
        this.setState({ errorMessage: e.message, successMessage: "" });
      }
    }
  }

  async handleSubmit(){
    const body = {
      userName: this.state.userName,
      password: this.state.password,
      name:this.state.name,
      interFirm:this.state.interFirm,
      fullTmOffer:this.state.fullTmOffer,
      isMentor:this.state.MentorOrMentee==="Mentor",
      numberOfMatches:0,
      caseName : this.state.caseName,
      officeLoc:this.state.officeLoc,
      numberOfCases:this.state.numberOfCases !==undefined ? this.state.numberOfCases : "5"
    };
    const headers = {
      "Access-Control-Allow-Origin": backendData.URL,
    };

    try {
      const response = await axios.post(`${backendData.URL}/edit-profile`, body, {
        headers,
      });
      // console.log(response);
      this.setState({  successMessage: response.data });
    } catch (e) {
      // console.log(e);
      if(e && e.response && e.response.data ){
        this.setState({ errorMessage: e.response.data.message, successMessage:"" });
        
      }else{
        this.setState({ errorMessage: e.message, successMessage:"" });
      }
      
    }
  }



  renderMentor() {
    if (this.state.MentorOrMentee === "Mentor") {
      return (
        <div>
          <div className="form-group ui bold">
            Internship firm name:{" "}
            <div className="ui normal">{this.state.interFirm}</div>
          </div>
          <div className="form-group">
            <label>Full time offer firm name:</label>
            <input
              type="OfferFirm"
              className="form-input-control-OfferFirm"
              placeholder="Enter name of the firm you are joining full time"
              value={this.state.fullTmOffer}
              onChange={(e) =>
                this.setState({
                  fullTmOffer: e.target.value,
                  errorMessage: "",
                  successMessage: "",
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Office Location</label>
            <input
              type="OfficeLoc"
              className="form-input-control-office-loc"
              placeholder="Enter the firm location you are joining full time"
              value={this.state.officeLoc}
              onChange={(e) => this.setState({ officeLoc: e.target.value, errorMessage:"", successMessage:"" })}
            />
          </div>
          <div className="form-group">
            <label>List of available case/s (name):</label>
            <input
              type="caseName"
              className="form-input-control-caseName"
              placeholder="Enter case name/s (Semi-colon seperated if more than one)"
              value={this.state.caseName}
              onChange={(e) =>
                this.setState({
                  caseName: e.target.value,
                  errorMessage: "",
                  successMessage: "",
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Number of cases per week:</label>
            <select name="selectList" id="selectList"
             value={this.state.numberOfCases} 
             onChange={(e) => this.setState({ numberOfCases: e.target.value, errorMessage:"", successMessage:"" })}
             >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option selected value="10">10</option>
            </select>
          </div>
        </div>
      );
    }
  }

  render() {
    // console.log(this.state);
    // console.log(this.props);
    return (
      <form className="ui form" onSubmit={(e) => e.preventDefault()}>
        <h2 className="ui header">{this.state.MentorOrMentee} profile</h2>
        <div className="form-group ui bold">
          Email address: <div className="ui normal">{this.state.userName}</div>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <label className="text red">*</label>
          <input
            type="password"
            value={this.state.password}
            className="form-input-control-password"
            placeholder="Change password"
            onChange={(e) =>
              this.setState({
                password: e.target.value,
                errorMessage: "",
                successMessage: "",
              })
            }
          />
        </div>
        <div className="form-group ui bold">
          Name: <div className="ui normal">{this.state.name}</div>
        </div>
        {this.renderMentor()}
        <button
          className="ui_button"
          type="submit"
          onClick={e => this.handleSubmit()}
        >
          Submit
        </button>
        <br/>
        <button
          className="ui button show aval"
          type="submit"
          onClick={this.props.showAvailability}
        >
          Register availability
        </button>
        <div className="error">
          {this.state.errorMessage && this.state.errorMessage !== ""
            ? this.state.errorMessage
            : ""}
        </div>
        <div className="success">
          {this.state.successMessage && this.state.successMessage !== ""
            ? this.state.successMessage
            : ""}
        </div>
        <p className="ui bold">Selected availabilities</p>
        <table>
          
        <tr>
          <th>From</th>
          <th>Till</th>
          <th>Cases selected</th>
        </tr>
        {this.props.availabilitys.map((val, key) => {
          return (
            <tr key={key}>
              <td>{moment(val.startDate).format('MM-DD-YYYY hh:mm a')}</td>
              <td>{moment(val.endDate).format('MM-DD-YYYY hh:mm a')}</td>
              <td>{val.caseName}</td>
              <td style={{border:'none'}}><button onClick={e=> this.updateAvailability(val)}>delete</button></td>
            </tr>
          )
        })}
        </table>
      </form>
    );
  }
}
