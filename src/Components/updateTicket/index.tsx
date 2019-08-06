import * as React from 'react';
import { TicketCard } from '../TicketCard';

interface Props { }

interface State {
    grabbedData: Array<IticketPost>;
}

interface IticketPost {
    id: number;
    content: string;
    TT: string;//ticket title
}



export class UpdateTicket extends React.Component<Props, State> {
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
        if (sessionStorage.getItem("permission") === "helpdesk") {
            const userPath = Number(sessionStorage.getItem("currentuser"));

            fetch(`http:localhost:5000/api/Data/ticket/${userPath}`)//grab all of your tickets made on this account
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
                (<TicketCard id={data.id} key={data.id}  show="hide" othershow = "hide" ogtext =
                {data.content}
                title = {data.tt}
                update = {true} />))}
            
            </>
        );
    }
}