"use client"

import Backend from "../utils/backendRestAPI/backend";

export default function SigninClientPage(){

    async function onSubmit(e: any) {
        e.preventDefault();

        const backend = new Backend();
        await backend.auth.signin("DeepKung", "slkdfjslkdfj");
    }

    return (
        <>
        <main>
            <div>
                <div></div>
                <h3 className="font-soria ">HarvestCraft</h3>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div>
                        <button type="submit">Sign in</button>
                    </div>
                </form>
            </div>
        </main>
        </>
    )
}