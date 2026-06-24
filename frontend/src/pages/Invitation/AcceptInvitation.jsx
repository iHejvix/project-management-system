import {Button} from "@/components/ui/button.jsx";
import Signup from "@/pages/Auth/Signup.jsx";
import Login from "@/pages/Auth/Login.jsx";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {acceptInvitation} from "@/redux/projectSlice.js";

export const AcceptInvitation  = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleAcceptInvitation() {
        dispatch(acceptInvitation({token, navigate}))
    }

    return (
        <>
            <div className="flex justify-center h-screen items-center">
                <div className="box h-[30rem] w-[25rem]">
                    <div className="minContainer login">
                        <div className="loginBox w-full px-10 space-y-5">
                            Are you sure you want to accept invitation?
                        </div>
                        <div className="flex justify-between pt-10">
                            <Button className="w-1/3" onClick={() =>
                                dispatch(acceptInvitation({token, navigate}))}>
                                Yes</Button>
                            <Button className="w-1/3" onClick={() => navigate("/")}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
