import * as React from 'react';
import { Link} from "react-router-dom";

interface Props {}

interface State {
}

export class User extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  clearStorage = ()=>//logs user in and out
  {
    sessionStorage.clear();
    console.log(sessionStorage);
  } 
  render() {
    return(
      <>
        <h1>User DashBoard</h1>
        <Link to="/" onClick={this.clearStorage}>logOut</Link>
      </>
    );
  }
}