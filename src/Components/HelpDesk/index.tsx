import * as React from 'react';
import { Link} from "react-router-dom";
import {CreateTicket} from "../createTicket";
import {UpdateTicket} from "../updateTicket";

interface Props {}

interface State {
  createClicked: boolean;
  updateClicked: boolean;

  createHide: string;
  updateHide: string;

}
//control what shows and if user input tickets should show on click
export class HelpDesk extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state =
    {
      createClicked: false,
      updateClicked: false,
      createHide: "show",
      updateHide: "show",

    }
  }


  displayCreate = () => {

    this.setState(
      {
        createClicked: true,
        createHide: "hide"
      }
    )
  }

  displayUpdate = () => {

    this.setState(
      {
        updateClicked: true,
        updateHide: "hide"
      }
    )
  }
  render() {
    return(
      <>
            {/* hide our input fields until button click*/}

        <h2 id="pageTitle">HelpDesk DashBoard</h2>
        <button onClick={ this.displayCreate} className= {this.state.createHide}id="ctBtn">Create Ticket</button>
        {this.state.createClicked ? <CreateTicket /> : null}

        <button onClick={ this.displayUpdate} className= {this.state.updateHide}id="ctBtn">update Ticket</button>
        {this.state.updateClicked ? <UpdateTicket /> : null}

       
      </>
    );
  }
}