import * as React from 'react';
import { Link} from "react-router-dom";

interface Props {}

interface State {
}
//simple user page just log in and log out
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
        <h1 id="usertext">No permissions please log out</h1>
      </>
    );
  }
}