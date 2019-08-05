import * as React from 'react';
import { Link} from "react-router-dom";
import {AdminTicket} from "../adminTicket";

//admin page portal planned but never completed
interface Props {}

interface State {
  updateClicked: boolean;
  updateHide: string;


}
/*semi psuedo coded this class would be very similar to helpdesk*/
export class Admin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state =
    {
      updateClicked: false,
      updateHide: "show",

    }
  }

  clearStorage = ()=>//logs user out
  {
    sessionStorage.clear();
    console.log(sessionStorage);
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

        <Link id="logout" to="/" onClick={this.clearStorage}>logOut</Link>
        <h2 id="pageTitle">Admin DashBoard</h2>
        <button onClick={ this.displayUpdate} className= {this.state.updateHide}id="ctBtn">update Ticket</button>
        {this.state.updateClicked ? <AdminTicket /> : null}

       
      </>
    );
  }
}