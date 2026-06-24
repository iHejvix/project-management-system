import {useState} from "react";
import Signup from "@/pages/Auth/Signup.jsx";
import {Button} from "@/components/ui/button.jsx";
import Login from "@/pages/Auth/Login.jsx";

export const Auth = () => {
    const [active, setActive] = useState(true);

    return (
        <div className="flex justify-center h-screen items-center">
            <div className="box h-[30rem] w-[25rem]">
                <div className="minContainer login">
                    <div className="loginBox w-full px-10 space-y-5"></div>
                    {active ? <Signup/> : <Login/>}

                    <div className="flex justify-between pt-10">
                        <span>{active ? "Already have account? " : "Create account"}</span>
                        <Button variant="ghost" onClick={() => setActive(!active)}
                        className="w-1/3">
                            {active ? "SignIn" : "Signup"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
