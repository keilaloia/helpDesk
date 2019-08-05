
import * as React from 'react';
import { TicketCard } from '../../TicketCard/index';

interface Props { }

interface State {
    grabbedData: Array<IticketPost>;
}

interface IticketPost {
    id: number;
    content: string;
    TT: string;//ticket title
}



export class AdminTicket extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            grabbedData: []
        };

        this.GrabData();

    }


    GrabData = () => {
        //grab current list of all tickets
        console.log(sessionStorage.getItem("currentuser"))
        if (sessionStorage.getItem("permission") === "admin") {
            const userPath = Number(sessionStorage.getItem("currentuser"));

            fetch(`https:localhost:5001/api/Data/ticket/all/${userPath}`)//grab all of your tickets made on this account
                .then(response => response.json())
                .then(body => {
                    this.setState
                        ({
                            grabbedData: body,

                        });
                    console.log(this.state.grabbedData)

                })
                .catch((err) => {
                    console.log(err);
                });
            console.log("authorized")
        }

        else {
            alert("unauthorized user")
        }
    }

   
    render() {
        return (
            <>      
            <h1>My Tickets</h1>
            {/* dynamically create all of our tickets */}
                {this.state.grabbedData.map((data:any )=> 
                (<TicketCard id={data.id} key={data.id}  show="hide" othershow="show"ogtext =
                {data.content}
                title = {data.tt}
                update = {true} />))}
            
            </>
        );
    }
}