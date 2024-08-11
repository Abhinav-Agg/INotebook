import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/auth/page/loginSlice';
import useAlert from '../customhook/useAlert';
import AlertMessage from './AlertMessage';

export default function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const showAlert = useAlert();
    const validationAlertMsg = useSelector(state => state.ValidationAlert.alert);

    /* By this without useSelector also get results from an api method as we do below. which we do in redux method with extra reducer. */
    /* we add logic here. By this I get to know that if needed we add own code logic as well not depend on useSelector to get data. if we are not able to work with useSelector. */
    const login = async (ev) => {
        ev.preventDefault();
        const result = await dispatch(loginUser({ email, password }));
        if (result.type === 'loginUser/fulfilled') {
            const { authToken, ErrorMsg } = result.payload;
            if (authToken) {
                localStorage.setItem('token', authToken.split(":")[1]);
                navigate("/");
            }
            else if (ErrorMsg) {
                showAlert({type : "danger", message : ErrorMsg});
            }
            else {
                showAlert({type : "danger", message : "login failed"});
            }
        }
    };


    return (
        <div className='mt-5'>
            <form onSubmit={login}>
                <h1 className='heading'>Sign In</h1>
                <div className='col-md-6 offset-md-3 my-3 mt-5'>
                    <div className="mb-3 row">
                        <label htmlFor="email" className="col-sm-2 form-label labelheading">Email</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="password" className="col-sm-2 form-label labelheading">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                    </div>
                    <div className='text-end'>
                        <Link id="forgotpassword" to={"/Forgotpassword"} className="form-text">Forgot Password</Link>
                    </div>
                    <div className="col-12 mt-3">
                        <button className="btn btn-primary" type="submit">Login</button>
                        {
                            /* Here when use onClick or onSubmit method so page will be reload because its a functionality of form. We prevent this using from event.preventDefault */
                            /* If we use form so we need to add method of for submit or click type in form tag not in button so by all this when we click on button page will not reload.*/
                        }
                    </div>
                </div>
            </form>
            <div className='errordiv'>
                {validationAlertMsg && <AlertMessage alert={validationAlertMsg.type} message={validationAlertMsg.message} />}
            </div>
        </div>
    )
}
