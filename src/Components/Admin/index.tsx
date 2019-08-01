import * as React from 'react';
import { Link} from "react-router-dom";
//admin page portal planned but never completed
interface Props {}

interface State {
}
/*semi psuedo coded this class would be very similar to helpdesk*/
export class Admin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  clearStorage = ()=>//logs user in and out
  {
    sessionStorage.clear();
    console.log(sessionStorage);
  } 
   /*create on change funciton similar to helpdesk but ignore where clause
    instead grab the data check if user permission is admin and use put a method 
    to update selected and edited ticket
        */
  render() {
    return(
      <>
        {/*import dynamic create card for every ticket within ticket 
        database using a get method with my sql queury of 
        SELECT * FROM ticket
        */}
        <h1>Admin DashBoard</h1>
        <Link to="/" onClick={this.clearStorage}>logOut</Link>

      </>
    );
  }
}