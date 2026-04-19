import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContexts';

const SignIn = () => {
    const {signInUser} = use(AuthContext);
 
    const handleSignIn = (e)=>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // firebase signIn send
        signInUser(email,password)
        .then(res=> {console.log(res.user)
            const SignInInfo = {
                email , 
                lastSignInTime : res.user?.metadata?.lastSignInTime
            }
            // update Last Sign In to the Db
            fetch('http://localhost:3000/users', {
                method: 'PATCH',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(SignInInfo)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log('after update patch', data)
            })
        })
        .catch(error=>console.log(error));

    }
    return (
         <div className="card bg-base-100 mx-auto max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Sign Up Now</h1>

                <form onSubmit={handleSignIn} className="fieldset">

                    

                    <label className="label">Email</label>
                    <input type="email" name='email' className="input" placeholder="Email" required />

                   

                    <label className="label">Password</label>
                    <input type="password" name='password' className="input" placeholder="Password" required />

                    <div>
                        <a className="link link-hover">Forgot password?</a>
                    </div>

                    <button className="btn btn-neutral mt-4">Sign In</button>

                </form>
            </div>
        </div>
    );
};

export default SignIn;