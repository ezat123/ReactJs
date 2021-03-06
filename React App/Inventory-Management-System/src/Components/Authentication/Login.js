import React, { Component } from 'react';
import { SignInAction,LoaderAction } from '../../Actions/AuthActions';
import { connect } from 'react-redux';
import * as mat from 'material-ui';

const styles = {
    card: {
        width: '90%',
        height: 'auto',
        position: 'relative',
        top: '50px',
    },
    login: {
        textAlign: 'left',
    },
    title: {
        textAlign: 'left',
    },
    
}

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.SignIn = this.SignIn.bind(this)
    }
    SignIn(ev) {
        ev.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;

        let userLogin = {
            email: email,
            password: password
        }
        this.props.LoaderAction();
        this.props.SignInAction(userLogin);

    }
    render() {
        const {
            Errors,
        } = this.props;
        // console.log("Erors", this.props.Errors);
        return (
            <div >
                <center>
                    <mat.Card style={styles.card} zDepth={2}>
                        <mat.AppBar style={styles.title} title="Log In" showMenuIconButton={false} />
                        <mat.CardText>
                            <form onSubmit={this.SignIn} style={styles.login}>
                                <div className="form-group " >
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" ref="email" placeholder="Enter email" />
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="password">Enter Password</label>
                                    <input type="password" className="form-control" ref="password" placeholder="Enter password" />
                                </div>
                                {(Errors) ? (
                                    <div>
                                        <p className="alert alert-danger">{Errors}</p>
                                    </div>
                                ) : (
                                        <span></span>
                                    )}
                                <div className="form-group ">
                                    <mat.RaisedButton type="submit" label="Log In" primary={true} />
                                </div>

                            </form>
                        </mat.CardText>
                    </mat.Card>
                </center>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.AuthReducer,
        Errors: state.AuthReducer.authErrors
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        SignInAction: (userLogin) => {
            dispatch(SignInAction(userLogin));
        },
        LoaderAction: ()=>{
            dispatch(LoaderAction())
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
