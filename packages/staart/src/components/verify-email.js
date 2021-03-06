import React, {Component} from 'react'
import {withOoth} from 'ooth-client-react'

export default ({token, userId}) => (
        <div style={{
            maxWidth: '300px',
            margin: 'auto'
        }}>
            <h1>Verify email</h1>
            <VerifyEmail token={token} userId={userId}/>
        </div>
)

class VerifyEmailComponent extends Component {
    constructor() {
        super()
        this.state = {
            verified: false
        }
    }
    componentDidMount() {
        if (!this.props.token) {
            console.error('No token specified.')
            return
        }
        if (!this.props.userId) {
            console.error('No userId specified.')
        }
        this.props.oothClient.method('local', 'verify', {
            token: this.props.token,
            userId: this.props.userId,
        }).then(() => {
            this.setState({
                verified: true
            })
        }).catch(e => {
            this.setState({
                error: e.message
            })
        })
    }
    render() {
        if (!this.props.token) {
            return <p>No token specified.</p>
        } else if (!this.props.userId) {
            return <p>No userId specified.</p>
        } else {
            if (this.state.error) {
                return <p>{this.state.error}</p>
            } else if (this.state.verified) {
                return <p>Your email has been verified.</p>
            } else {
                return <p>Verifying email...</p>
            }
        }
    }
}
const VerifyEmail = withOoth(VerifyEmailComponent)
