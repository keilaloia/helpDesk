import * as React from 'react';
import "./ticket.css"
import { TicketCard } from '../../TicketCard/index';

interface Props { }

interface State {
    ticket: string;
    TT: string;
}

interface IticketPost {
    id: number;
    content: string;
    TT: string
}

export class CreateTicket extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ticket: "",
            TT: ""
        };
        this.handleTTchange = this.handleTTchange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTicketchange = this.handleTicketchange.bind(this);
    }

    //create ticket title
    handleTTchange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState
            ({
                TT: (event.target as HTMLInputElement).value,
            });
        console.log(this.state.TT);
    }
    handleTicketchange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState
            ({
                ticket: (event.target as HTMLTextAreaElement).value,
            });
        console.log(this.state.ticket);
    }
    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (sessionStorage.getItem("permission") === "helpdesk") {
            const data: IticketPost = { content: this.state.ticket, id: Number(sessionStorage.getItem("currentuser")), TT: this.state.TT }
            fetch("https:localhost:5001/api/Data/ticket",
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(body => {
                    console.log(body);
                    this.setState(//successful submit reset ticket
                        {
                            ticket: "",
                            TT: ""
                        }
                    )
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

                <TicketCard handleTTchange={this.handleTTchange} TT={this.state.TT} nameid="0"
                    show="show" title="Create tickets" handlesubmit={this.handleSubmit} handleTicketchange={this.handleTicketchange}
                    ticket={this.state.ticket} />
            </>
        );
    }
}