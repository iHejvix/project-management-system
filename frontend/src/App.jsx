import './App.css'
import { Home } from './pages/Home/Home'
import {Navbar} from "@/pages/Navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import {ProjectDetails} from "@/pages/ProjectDetails/ProjectDetails.jsx";
import IssueDetails from "@/pages/IssueDetails/IssueDetails.jsx";
import Subscription from "@/pages/Subscription/Subscription.jsx";
import {Auth} from "@/pages/Auth/Auth.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUser, selectCurrentUser} from "@/redux/authSlice.js";
import {fetchProject} from "@/redux/projectSlice.js";
import {AcceptInvitation} from "@/pages/Invitation/AcceptInvitation.jsx";



function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const jwt = useSelector(state => state.auth.jwt);

    useEffect(() => {
        dispatch(getUser());
        //todo add category and tag in params async thunk
        dispatch(fetchProject({category: null, tag: null}));
    }, [dispatch, jwt])

    return (
        <>
            {
                user ? <div>
                    <Navbar/>
                    <Routes>
                        <Route path="/accept_invitations" element={<AcceptInvitation/>}/>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/project/:id" element={<ProjectDetails/>}/>
                        <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails/>}/>
                        <Route path="/upgrade_plan" element={<Subscription/>}/>
                    </Routes>
                </div> : <Auth/>
            }

        </>
    )
}

export default App
