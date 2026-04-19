import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContexts';
import Swal from 'sweetalert2';

const SignUp = () => {

    const { createUser } = use(AuthContext);

    const handleSignUp = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const { email, password, ...restFormData } = Object.fromEntries(formData.entries());

        

        // 🔥 Firebase User Create
        createUser(email, password)
            .then(result => {
                console.log("Firebase User:", result.user);

                const userProfile = {
                    email, 
                    ...restFormData,
                    creationTime: result.user?.metadata?.creationTime,
                    lastSignInTime: result.user?.metadata?.lastSignInTime,
                }

                // 🔥 Save user in DB
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userProfile)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('DB Response:', data);


                        // ✅ Sweet Alert Success
                        if (data.insertedId || data.acknowledged) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "User created successfully 🎉",
                                showConfirmButton: false,
                                timer: 1500
                            });

                            form.reset(); // 🔥 Reset form
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "User not saved in database!"
                            });
                        }
                    })
                    .catch(err => {
                        console.log("DB Error:", err);
                        Swal.fire("Error!", "Database error", "error");
                    });

            })
            .catch(error => {
                console.log("Firebase Error:", error);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    return (
        <div className="card bg-base-100 mx-auto max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Sign Up Now</h1>

                <form onSubmit={handleSignUp} className="fieldset">

                    <label className="label">Name</label>
                    <input type="text" name='Name' className="input" placeholder="Name" required />

                    <label className="label">Email</label>
                    <input type="email" name='email' className="input" placeholder="Email" required />

                    <label className="label">Address</label>
                    <input type="text" name='Address' className="input" placeholder="Address" />

                    <label className="label">Phone</label>
                    <input type="text" name='Phone' className="input" placeholder="Phone" />

                    <label className="label">Photo</label>
                    <input type="text" name='Photo' className="input" placeholder="Photo URL" />

                    <label className="label">Password</label>
                    <input type="password" name='password' className="input" placeholder="Password" required />

                    <div>
                        <a className="link link-hover">Forgot password?</a>
                    </div>

                    <button className="btn btn-neutral mt-4">Sign Up</button>

                </form>
            </div>
        </div>
    );
};

export default SignUp;