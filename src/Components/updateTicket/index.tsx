import * as React from 'react';
import "./update.css"
import { TicketCard } from '../../TicketCard/index';


class textcontent//object for storing text data per ticket content
{
    public textfield: string;
    public index:number;
    constructor(data :string, _index: number)
    {
        this.textfield = data;
        this.index = _index;
    }

}
interface Props { }

interface State {
    ticket: string;
    TT: string;
    grabbedData: Array<IticketPost>;
    textArr: any;
}

interface IticketPost {
    id: number;
    content: string;
    setID?:number;
    TT: string;
}



export class UpdateTicket extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ticket: "",
            TT: "Your Ticket",
            grabbedData: [],
            textArr: []
        };
        this.GrabData();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTTchange = this.handleTTchange.bind(this);
    }

    GrabData = () => {
        //grab current list of all tickets
        console.log(sessionStorage.getItem("currentuser"))
        if (sessionStorage.getItem("permission") === "helpdesk") {
            const data: IticketPost = { content: this.state.ticket, id: Number(sessionStorage.getItem("currentuser")), TT: this.state.TT }

            fetch(`https:localhost:5001/api/Data/ticket/${data.id}`)//grab all of your tickets made on this account
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

    handleTTchange(event: React.ChangeEvent<HTMLTextAreaElement>){
        
        let tempArr =[];//push data dynamically when edited
        for (let i = 0; i < this.state.grabbedData.length; i++) {
            tempArr.push();
            
        }
        for (let j = 0; j < this.state.grabbedData.length; j++) {
           if(Number((event.target as HTMLTextAreaElement).name) === j)
           {
            
            let newtext: any = new textcontent(((event.target as HTMLTextAreaElement).value), j);
            tempArr[j] = newtext;
            this.setState//set textarr to current ticket object context field
                ({
                    textArr: tempArr[j]
                });
                console.log(this.state.textArr)
           }

        }
    }
    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        //populate data being passed to the backend
        const data: IticketPost = { id:this.state.grabbedData[Number((event.target as HTMLFormElement).name)].id,  content: this.state.textArr.textfield, setID:( Number(sessionStorage.getItem("currentuser"))), TT: this.state.TT }

        console.log(data)
        //update data in current ticket context feild
        fetch(`https:localhost:5001/api/Data/ticket/${data.setID}`,
            {
                method: 'PUT',
                body: JSON.stringify(data),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            })

            .then(response => response.json())
            .catch((err) => 
            { 
                console.log(err); 
            });
      

    }

    render() {
        return (
            <>      
            <h1>My Tickets</h1>
            {/* dynamically create all of our tickets */}
                {this.state.grabbedData.map((data:any, index)=> 
                (<TicketCard id={data.id} key={data.id} nameid={String(index)}show="hide" title={data.tt} handlesubmit={this.handleSubmit} handleTicketchange={this.handleTTchange} content={this.state.textArr[index]} ogtext ={data.content}
                ticket={data.content} />))}
            
            </>
        );
    }
}