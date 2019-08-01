import * as React from 'react';
import { number } from 'prop-types';

interface Props {
    id?: number; 
    nameid:string;
    key?: number;
    show: string;
    TT?: string;
    handleTTchange?: any;
    title:string;
    handlesubmit: any;
    content?:any;
    ticket: string;
    handleTicketchange: any;
    ogtext?:string
}

interface State
{
    content: string;
}
//prop state dynamically created in other componetnts/classes
export class TicketCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            
            content: ""
        };

        this.handleTTchange = this.handleTTchange.bind(this);

    }


    handleTTchange(event: React.ChangeEvent<HTMLTextAreaElement>){
        this.setState
            ({
                content: (event.target as HTMLTextAreaElement).value
            });
    }
    render()
   {
    return(
        <div className ="contentWrapper">
            <input className = {this.props.show}type="text" placeholder="Ticket Title" value={this.props.TT} onChange={this.props.handleTTchange} required/>      
            <h2>{this.props.title}</h2>
            <form name = {this.props.nameid}className ="helpdeskWrapper" onSubmit={this.props.handlesubmit}>
                <textarea maxLength= {500} name={this.props.nameid}id="box"defaultValue={this.props.ogtext} value ={this.props.content} onChange={this.props.handleTicketchange}>
   
                </textarea>
                <input type="submit" id="sBtn" value="Submit Ticket" />
            </form>
        </div>
    );
   }

  };
