import * as React from 'react';
import "./ticket.css"
import { httpDELETE } from '../_tools/fetchDELETE';

interface Props {
    id?: number;
    key?: number;
    show: string;
    othershow: string;

    ogtext?: string;
    title?: string;
    update: boolean;

}
interface State {
    title: string;
    content: string;
}


interface IticketData {
    id: number;
    content: string;
    tt: string;
    userID?: number
}

//prop state dynamically created in other componetnts/classes
export class TicketCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: (props.title) ? props.title : "",
            content: (props.ogtext) ? props.ogtext : ""
        };

        this.handleTTchange = this.handleTTchange.bind(this);
        this.handleTicketchange = this.handleTicketchange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleTicketchange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState
            ({
                content: (event.target as HTMLTextAreaElement).value
            });
    }

    handleTTchange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState
            ({
                title: (event.target as HTMLInputElement).value
            });
    }

    handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
        if (sessionStorage.getItem("permission") === "admin") {
            const createdata: IticketData =
            {
                //get id of this card 
                id: (this.props.id) ? this.props.id : 0,
                content: this.state.content,
                tt: this.state.title,
                userID: Number(sessionStorage.getItem("currentuser"))
            }
            httpDELETE(`http:localhost:5000/api/Data/ticket/delete/${Number(sessionStorage.getItem("currentuser"))}`, createdata)
            window.location.reload(true);
        }
    }
    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        //saftey check frontend permission eventhough it happens on the backend
        if (sessionStorage.getItem("permission") === "helpdesk" || sessionStorage.getItem("permission") === "admin") {
            if (this.props.update) {

                const createdata: IticketData =
                {
                    //get id of this card 
                    id: (this.props.id) ? this.props.id : 0,
                    content: this.state.content,
                    tt: this.state.title,
                    userID: Number(sessionStorage.getItem("currentuser"))
                }

                //update data in current ticket context feild
                fetch(`http:localhost:5000/api/Data/ticket/${createdata.id}`,
                    {
                        method: 'PUT',
                        body: JSON.stringify(createdata),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })

                    .then(response => response.json())
                    .catch((err) => {
                        console.log(err);
                    });

            }
            else {
                const createdata: IticketData =
                {
                    //get current userID
                    id: Number(sessionStorage.getItem("currentuser")),
                    content: this.state.content,
                    tt: this.state.title
                }

                fetch("http:localhost:5000/api/Data/ticket",
                    {
                        method: 'POST',
                        body: JSON.stringify(createdata),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(body => {
                        console.log(body);
                        this.setState(//successful submit reset ticket
                            {
                                content: "",
                                title: ""
                            }
                        )
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                console.log("authorized")
            }
        }
    }
    render() {
        return (
            <div >
                <div className="contentWrapper">
                    <div id="ticketnav">
                        <input className={this.props.show} id="TT" type="text" placeholder="Ticket Title" value={this.state.title} onChange={this.handleTTchange} required />
                        <h2>{this.props.title}</h2>

                        <button className={this.props.othershow} id="dBtn" onClick={this.handleDelete.bind(this)}>Delete</button>
                    </div>
                    <form className="helpdeskWrapper" onSubmit={this.handleSubmit}>
                        <textarea maxLength={500} id="box" value={this.state.content} onChange={this.handleTicketchange}>

                        </textarea>
                        <input type="submit" id="sBtn" value="Submit Ticket" />

                    </form>

                </div>
            </div>

        );
    }

};
