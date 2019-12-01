import React from 'react';
import axios from 'axios';

const apiPeopleUrl = 'https://swapi.co/api/people/';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: 'Default Name'
            },
            isLoading: false
        };
        this.userId = React.createRef();
    }

    source = axios.CancelToken.source();

    getUserAsync = async () => {
        try {
            this.setState({
                isLoading: true
            });
            
            var res = await axios.get(apiPeopleUrl + this.userId.current.value + '/', {
                cancelToken: this.source.token
            });
            console.log(res.data);
            this.setState({
                user: res.data,
                isLoading: false
            });
        } catch (e) {
            if (axios.isCancel(e)) {
                console.log('Error: ', e.message); // => prints: Api is being canceled
            } else {
                this.setState({
                    isLoading: false
                });
            }
        }
    }

    getUser() {
        this.setState({
            isLoading: true
        });

        axios.get(apiPeopleUrl + this.userId.current.value + '/', {
            cancelToken: this.source.token
        })
            .then(res => {
                console.log(res.data);
                this.setState({
                    user: res.data,
                    isLoading: false
                });
            })
            .catch(e => {
                if (axios.isCancel(e)) {
                    console.log('Error: ', e.message);
                } else {
                    this.setState({
                        isLoading: false
                    });
                }
            });
    }

    cancelAllRequests() {
        this.source.cancel('Operation cancelled');
        this.source = axios.CancelToken.source();
        this.setState({
            isLoading: false
        });
    }

    componentDidMount() {
        console.log('cDM');
        this.getUserAsync();
    }
    
    componentDidUpdate() {
        console.log('cDU');
    }
    
    componentWillUnmount() {
        console.log('cWU');
        this.cancelAllRequests();
    }

    render() {
        const { user, isLoading } = this.state;

        return (
            <div>
                This is UserProfile.
                <input type='text' defaultValue='1' ref={this.userId} />
                <button onClick={() => this.getUserAsync()}>Get User Async</button>
                <button onClick={() => this.getUser()}>Get User</button>
                <button onClick={() => this.cancelAllRequests()}>Cancel</button>
                <div>{isLoading ? 'Loading...' : ''}</div>
                <div>{user.name ? user.name : ''}</div>
            </div>
        );
    }
}