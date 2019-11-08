import React from 'react';
import axios from 'axios';

const apiPeopleUrl = 'https://swapi.co/api/people/';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: 'Default Name'
            }
        };
    }

    getUser() {
        axios.get(apiPeopleUrl + '1/')
            .then((res) => {
                console.log(res.data);
                this.setState({
                    user: res.data
                });
            });
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        return (
            <div>
                This is UserProfile. {this.state.user.name}
                <input type='text' defaultValue='1' />
                <button onClick={() => this.getUser()}>Get User</button>
            </div>
        );
    }
}