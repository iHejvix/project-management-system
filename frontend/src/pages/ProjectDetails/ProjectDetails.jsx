import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader, DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {PlusIcon} from "lucide-react";
import InviteUserForm from "@/pages/ProjectDetails/InviteUserForm.jsx"; //sagte5CQBhtfnNoeGjU.lw.QlveCaBla044SN0v9APU-1754657649-1.3.1.1-QsqMj0WDUkc2F_e_oIBF_dLWztUwXeN50mPQafB6onnePGzXF4N._6XuDBQvo6VPQ245TFu3PQ6Tt2TGK29Ulg
// bnhINEVMQnU5S0hrWXBhU0JPWjhJUTBjanROdVFJemouTE50c1ViY2RKQ3Nk
import IssueList from "@/pages/ProjectDetails/IssueList.jsx";
import ChatBox from "@/pages/ProjectDetails/ChatBox.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchProjectById, selectProjectDetails} from "@/redux/projectSlice.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export const ProjectDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [open, setOpen] = useState();
    const projectDetails = useSelector(selectProjectDetails);

    useEffect(() => {
        dispatch(fetchProjectById(id));
    }, [dispatch, id])

    if (Array.isArray(projectDetails) && projectDetails.length === 0) {
        return <p>Loading projects...</p>;
    }

    if (!projectDetails) {
        return <p>Loading projects...</p>;
    }

    return (
        <>
            <div className="mt-5 lg:px-10">
                <div className="lg:flex gap-5 justify-between pb-4">
                    <ScrollArea className="h-screen lg:w-[69%] pr-2">
                        <div className="text-gray-400 pb-10 w-full">
                            <h1 className="text-lg font-semibold pb-5">{projectDetails.name}</h1>
                            <div className="space-y-5 pb-10 text-sm">
                                <p className="w-full md:max-w-lg lg:max-w-xl">{projectDetails.description}</p>
                                <div className="flex">
                                    <p className="w-36">Members: </p>
                                    <div className="flex items-center gap-2">
                                        {
                                            projectDetails.team.map((item) => (
                                            <Avatar className="cursor-pointer" key={item.id + "index project"}>
                                                <AvatarFallback>{item.fullName.at(0)}</AvatarFallback>
                                            </Avatar>)
                                            )
                                        }
                                    </div>

                                    <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogTrigger>
                                            <DialogTitle/>
                                            <DialogClose>
                                                <Button size="sm" variant="outline" className="ml-2">
                                                    <span>Invite</span>
                                                    <PlusIcon className="w-3 h-3"/>
                                                </Button>
                                            </DialogClose>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>Invite User</DialogHeader>
                                            <DialogDescription/>
                                            <InviteUserForm setOpen={setOpen}/>
                                        </DialogContent>
                                    </Dialog>

                                </div>
                                <div className="flex">
                                    <p className="w-36">Category: </p>
                                    <p>Fullstack</p>
                                    <p></p>
                                </div>

                                <div className="flex">
                                    <p className="w-36">Project Lead:</p>
                                    <Badge>{projectDetails.owner.fullName}</Badge>
                                    <p></p>
                                </div>
                            </div>

                            <section>
                                <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
                                <div className="lg:flex md:flex p-3 justify-between py-5">
                                    <IssueList status="pending" title="Todo List"/>
                                    <IssueList status="in_progress" title="In progress"/>
                                    <IssueList status="done" title="Done"/>

                                    {/*<div className="border w-full lg:max-w-xl my-5">*/}
                                    {/*    <p>Todo list</p>*/}

                                    {/*    <div className="flex border justify-between">*/}
                                    {/*        <p>create footer</p>*/}
                                    {/*        <Button variant="ghost" size="icon" className="rounded-full">*/}
                                    {/*            <DotsVerticalIcon/>*/}
                                    {/*        </Button>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="flex justify-between">*/}
                                    {/*        <p>Cret</p>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </section>
                        </div>
                    </ScrollArea>
                    <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
                        <ChatBox/>
                    </div>
                </div>
            </div>
        </>
    )
}
