import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";
import {selectIssues} from "@/redux/issueSlice.js";
import {useSelector} from "react-redux";
import CreateIssueForm from "@/pages/ProjectDetails/CreateIssueForm.jsx";

export const UpdateDialogIssue = ({id}) => {
    const issue = useSelector(state =>
        state.issue.issues.find(issue => issue.id === id));

    const [open, setOpen] = useState(false);


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full">Update Issue</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Update issue</DialogTitle>
                <DialogDescription/>
                <CreateIssueForm status={issue.status} setOpen={setOpen} issue={issue}/>
            </DialogContent>
        </Dialog>
    )
}
