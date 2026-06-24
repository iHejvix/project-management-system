import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {CreateProjectForm} from "@/pages/Project/CreateProjectForm.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {PersonIcon} from "@radix-ui/react-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectCurrentUser} from "@/redux/authSlice.js";
import {useState} from "react";

export const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => selectCurrentUser(state)?.fullName);
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b py-4 px-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <p className="cursor-pointer" onClick={() => navigate("/")}>Project Management</p>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <Button variant="ghost">New Project</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Create new project</DialogTitle>
                        <DialogDescription/> {/*Dialog Description is required because without these is wrong*/}
                        <CreateProjectForm setOpen={setOpen} />
                    </DialogContent>
                </Dialog>
                <Button variant="ghost" onClick={() => navigate("/upgrade_plan")}>Upgrade</Button>
            </div>

            <div className="flex items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline" size="icon" className="rounded-full border-gray-500">
                            <PersonIcon/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => dispatch(logout())}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <p>{user}</p>
            </div>
        </div>
    )
}
