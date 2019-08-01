import * as React from 'react';
import "./update.css"
import { httpGET } from '../_tools/fetchGET';
import { TicketCard } from '../../TicketCard/index';
import { httpPUT } from '../_tools/fetchPUT';
import { string } from 'prop-types';


class textcontent
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
        
        let tempArr =[];
        for (let i = 0; i < this.state.grabbedData.length; i++) {
            tempArr.push();
            
        }
        for (let j = 0; j < this.state.grabbedData.length; j++) {
           if(Number((event.target as HTMLTextAreaElement).name) === j)
           {
            
            let newtext: any = new textcontent(((event.target as HTMLTextAreaElement).value), j);
            tempArr[j] = newtext;
            this.setState
                ({
                    textArr: tempArr[j]
                });
                console.log(this.state.textArr)
                // console.log(this.state.textArr[0].textfield)

            // console.log(this.state.textArr[Number((event.target as HTMLTextAreaElement).name)])
            // console.log((event.target as HTMLTextAreaElement).name)
            // console.log(this.state.textArr)
           }

        }

        // this.state.grabbedData[index].content = (event.target as HTMLTextAreaElement).value;
 
        //  (event.target as HTMLTextAreaElement).value;
        // console.log(this.state.ticket);
    }
    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
            //  console.log(this.state.textArr[Number((event.target as HTMLFormElement).name)])
            //  console.log((event.target as HTMLFormElement).name)
            // console.log(this.state.textArr)
            // console.log(this.state.textArr)
        const data: IticketPost = { id:this.state.grabbedData[Number((event.target as HTMLFormElement).name)].id,  content: this.state.textArr.textfield, setID:( Number(sessionStorage.getItem("currentuser"))), TT: this.state.TT }

        console.log(data)
        // httpPUT(`https:localhost:5001/api/Data/ticket/${data.id}`, data)
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