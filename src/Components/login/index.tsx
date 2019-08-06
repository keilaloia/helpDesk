import React from 'react';
import { Redirect } from "react-router-dom";
import './login.css';


interface Props { }

interface State {
    login: string;
    password: string;
    uRole: string;
    adminRole: boolean;
    helpDesk: boolean;
    userCred: boolean;
    redirectPath: string;
}

interface Ipost//interface must match schema
{
    id?: number;
    userName: string;
    userPass: string;
    adminRole: boolean;
    helpDesk: boolean;
    userCred: boolean;
}

export class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            uRole: "user",
            adminRole: false,
            helpDesk: false,
            userCred: false,
            redirectPath: "/"
        };

        this.handleNamechange = this.handleNamechange.bind(this);
        this.handlePasschange = this.handlePasschange.bind(this);
        this.handleRolechange = this.handleRolechange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleNamechange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState
            ({
                login: (event.target as HTMLInputElement).value,
            });
        console.log(this.state.login);
    }
    handlePasschange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState
            ({
                password: (event.target as HTMLInputElement).value,
            });
        console.log(this.state.password);
    }
    handleRolechange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState
            ({
                uRole: (event.target as HTMLSelectElement).value
            });
        console.log((event.target as HTMLSelectElement).value);
    }

    stateMachine = (currentrole: string) => {
        switch (currentrole) {
            case "user":
                this.setState
                    ({
                        userCred: true,
                    }, () => {
                        if (this.state.userCred) {
                            this.Posting();
                        }
                    }
                    );
                break;
            case "helpdesk":
                this.setState//we do this weird function create after set state as a hacky .then statement
                    ({
                        helpDesk: true,
                    }, () => {
                        if (this.state.helpDesk) {
                            this.Posting();
                        }
                    }
                    );
                break;
            case "admin":
                this.setState
                    ({
                        adminRole: true,
                    }, () => {
                        if (this.state.adminRole)//structured this way for Async 
                        {
                            this.Posting();//post to db after value is true
                        }
                    }
                    );
                break;
        }
    }

    Posting = () => {

        var data: Ipost = { userName: this.state.login, userPass: this.state.password, adminRole: this.state.adminRole, helpDesk: this.state.helpDesk, userCred: this.state.userCred }
        console.log(data);
        //post user data to db and check if logged in or not and loop through the elements and set and cache items to storage
        fetch("https:localhost:5001/api/Data/",
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(body => {
                if (body.length > 0) {//if making account
                    console.log(body);
                    if (body[0].adminRole) {
                        sessionStorage.setItem("permission", "admin");
                        sessionStorage.setItem("currentuser", body[0].id);
                        console.log(sessionStorage)

                        this.setState({
                            redirectPath: "admin"
                        });

                    }
                    else if (body[0].helpDesk) {
                        sessionStorage.setItem("permission", "helpdesk");
                        sessionStorage.setItem("currentuser", body[0].id);
                        console.log(sessionStorage)

                        this.setState({
                            redirectPath: "helpdesk"
                        });
                        console.log("helpdesklogin");

                    }
                    else if (body[0].userCred) {
                        sessionStorage.setItem("data", "usercred");
                        sessionStorage.setItem("currentuser", body[0].id);
                        console.log(sessionStorage)

                        // sessionStorage.setItem("currentuser", body[0].id);

                        this.setState({
                            redirectPath: "user"
                        });

                    }
                    else//somthing went wrong
                    {
                        console.log("SOMETHING WENT WRONG SEE HAPPENED")
                    }
                }
                else {
                    console.log("ultra messed up trigger");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("click")
        this.stateMachine(this.state.uRole);

    }


    render() {
        return (
            <>
                <h1 id="pageTitle">Please log in or sign up will occur automatically</h1>
                <form className="loginWrapper" onSubmit={this.handleSubmit}>
                    <input type="text" id="login" placeholder="username" value={this.state.login} onChange={this.handleNamechange} />
                    <input type="password" id="password" placeholder="password" value={this.state.password} onChange={this.handlePasschange} required />
                    <input type="submit" id="lBtn" value="Log In" />
                    <select value={this.state.uRole} onChange={this.handleRolechange}>
                        <option value="user">User</option>
                        <option value="helpdesk">HelpDesk</option>
                        <option value="admin">Admin</option>
                    </select>
                </form>
                <Redirect to={this.state.redirectPath} />

            </>
        )
    }
}