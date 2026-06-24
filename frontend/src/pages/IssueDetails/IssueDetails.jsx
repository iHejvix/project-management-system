import {useParams} from "react-router-dom";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {CreateCommentForm} from "@/pages/ProjectDetails/CreateCommentForm.jsx";
import CommentCard from "@/pages/ProjectDetails/CommentCard.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {fetchProjectById} from "@/redux/projectSlice.js";
import {fetchIssueById, updateIssueStatus} from "@/redux/issueSlice.js";
import {fetchComments} from "@/redux/commentSlice.js";

export function IssueDetails() {
    const {projectId, issueId} = useParams();
    const dispatch = useDispatch();
    const issue = useSelector(state => state.issue.issueDetails);
    const comments = useSelector(state => state.comment.comments);

    useEffect(() => {
        dispatch(fetchIssueById(issueId));
        dispatch(fetchComments(issueId))
    }, [dispatch, issueId])


    function handleUpdatedIssueStatus(status) {
        dispatch(updateIssueStatus({issueId, status}))
    }

    if (!issue) {
        return <p>Loading issues...</p>;
    }

    return (
        <div className="px-20 py-8 text-gray-400">
            <div className="flex justify-between border p-10 rounded-lg">
                <ScrollArea className="h-[80vh] w-[60%]">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-400">{issue?.title}</h1>

                        <div className="py-5">
                            <h2 className="font-semibold text-gray-400">Description</h2>
                            <p className="text-gray-400 text-sm mt-3">{issue?.description}</p>
                        </div>
                        <div className="mt-5">
                            <h1 className="pb-3">Activity</h1>
                            <Tabs defaultValue="comments" className="w-[400px]">
                                <TabsList className="mb-5">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="comments">Comments</TabsTrigger>
                                    <TabsTrigger value="hisotry">History</TabsTrigger>
                                </TabsList>

                                <TabsContent value="all">all make change to your account here</TabsContent>
                                <TabsContent value="history">History change your password here</TabsContent>
                                <TabsContent value="comments">
                                    <CreateCommentForm issueId={issueId} />

                                    <div className="mt-8 space-y-6">
                                        {comments.map((item) => (
                                            <CommentCard key={item.id + " index"} commentDetails={item}/>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </ScrollArea>
                <div className="w-full lg:w-[30%] space-y-2">
                    <Select onValueChange={handleUpdatedIssueStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="To Do"/>
                        </SelectTrigger>
                        <SelectContent defaultValue={issue?.status}>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="border rounded-lg ">
                        <p className="border-b py-3 px-5">Details</p>
                        <div className="p-5">
                            <div className="space-y-7">
                                {[["Assignee", issue?.assignee?.fullName], ["Labels", "None"], ["Status", issue?.status],
                                    ["Release", issue?.dueDate], ["Reporter", issue?.assignee?.fullName]].map((item) => (
                                    <div className="flex gap-10 items-center" key={item}>
                                        <div className="flex items-center gap-3">
                                            {item[0] === "Assignee" || item[0] === "Reporter" ?
                                                <>
                                                    <p className="w-[7rem]">{item[0]}</p>
                                                    <Avatar className="h-8 w-8 text-xs">
                                                        <AvatarFallback>{item[1] ? item[1].at(0) : ""}</AvatarFallback>
                                                    </Avatar>
                                                </>
                                                : <p className="w-[7rem]">{item[0]}</p>
                                            }
                                            {
                                                item[1] ?
                                                    item[0] !== "Status" ?
                                                        <p>{item[1]}</p>
                                                        :
                                                        <Badge>{[item[1]]}</Badge>
                                                    : <p>Unassigned</p>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IssueDetails;