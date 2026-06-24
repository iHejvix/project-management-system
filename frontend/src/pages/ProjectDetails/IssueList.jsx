import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {PlusIcon} from "lucide-react";
import CreateIssueForm from "@/pages/ProjectDetails/CreateIssueForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchIssueByProjectId} from "@/redux/issueSlice.js";
import {useParams} from "react-router-dom";
import IssueCard from "@/pages/ProjectDetails/IssueCard.jsx";

export const IssueList = ({title, status}) => {
    const issues = useSelector(state =>
        state.issue.issues.filter(issue => issue.status === status));
    const dispatch = useDispatch();
    const {id} = useParams()
    const [open, setOpen] = useState(false);


    useEffect(() => {
        dispatch(fetchIssueByProjectId(id));
        console.clear()
    }, [dispatch, id]);

    // function handleFormSubmit(open) {
    //     console.log("handleFormSubmit", open);
    //     setOpen(open);
    // }

    // || (Array.isArray(issues) && issues.length === 0))
    // if (issues === undefined) {
    //     return <p>Loading issues...</p>;
    // }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <Card className="w-full md:w-[300px] lg:w-[310px]">
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-2">
                        <div className="space-y-2">
                            {issues.map((item, index) => (
                                <IssueCard key={index} issue={item} projectId={id}/>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <DialogTrigger>
                            <Button variant="outline" className="w-full border flex items-center gap-2">
                                <PlusIcon className="w-3 h-3"/>
                                Create Issue
                            </Button>
                        </DialogTrigger>
                    </CardFooter>
                </Card>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Issue</DialogTitle>
                    </DialogHeader>
                    <DialogDescription/>
                    <CreateIssueForm status={status} setOpen={setOpen}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default IssueList
