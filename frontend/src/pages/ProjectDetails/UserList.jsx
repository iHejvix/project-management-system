import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx"
import {useDispatch, useSelector} from "react-redux";
import {assigneeUserToIssue} from "@/redux/issueSlice.js";

function UserList({issue}) {
    const usersList = useSelector((state) => state.project.projectDetails);
    const dispatch = useDispatch();

    function handleAssignee(userId) {
        dispatch(assigneeUserToIssue({issueId: issue.id, userId}))
    }

    return (
        <div>
            <div className="border rounded-md">
                    <p className="py-2 px-3 text-gray-400">{"Assignee: " + issue?.assignee?.fullName || "Unassigned"}</p>
            </div>


            {usersList?.team.map((item) => (
                <div key={"index: " + item.id} className="py-2 group hover:bg-slate-800 cursor-pointer
            flex items-center space-x-4 rounded-md border px-4" onClick={() => handleAssignee(item.id)}>
                    <Avatar>
                        <AvatarFallback>{item.fullName.at(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <p className="text-sm leading-none">{item.fullName}</p>
                        <p className="text-sm text-muted-foreground">{item.email}</p>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default UserList;