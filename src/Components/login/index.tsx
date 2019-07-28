import React from 'react';
import './login.css';
import {httpGET} from '../_tools/fetchGET';//remove when necasery
import {httpPOST} from '../_tools/fetchPOST';//remove when necasery
import {httpPUT} from '../_tools/fetchPUT';//remove when necasery
import {httpDELETE} from '../_tools/fetchDELETE';//remove when necasery



interface Props {}

interface State {
    login: string;
    password: string;
}

interface Ipost
{
    Id?: number;
    Name?: string;
    Password?: string;
    IsComplete?: boolean;
}

export class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            login: "",
            password: ""
        };

        this.handleNamechange = this.handleNamechange.bind(this);
        this.handlePasschange = this.handlePasschange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleNamechange(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.setState
        ({
            login: (event.target as HTMLInputElement).value,
        });
        console.log(this.state.login);
    }
    handlePasschange(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.setState
        ({
            password: (event.target as HTMLInputElement).value,
        });
        console.log(this.state.password);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault(); 
        console.log(this.state.login);
        console.log(this.state.password);

        // const data: Ipost = {Id: 6, Name:"addedstuff"}
         
        // httpPUT(`https://localhost:5001/api/Data/${data.Id}/`,data)
        // console.log(httpGET("https://localhost:5001/api/Data/"));


    }

    render() {
        return (
            <>
                <form className="loginWrapper" onSubmit={this.handleSubmit}>
                    <input type="text" id="login" placeholder="username" value={this.state.login}  onChange={this.handleNamechange}/>
                    <input type="password" id="password" placeholder="password" value={this.state.password}  onChange={this.handlePasschange} required/>
                    <input type="submit" id="sBtn" value="Log In"/>

                </form>
            </>
        )
    }
}