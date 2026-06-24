import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {DotsVerticalIcon, PersonIcon} from "@radix-ui/react-icons";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import UserList from "@/pages/ProjectDetails/UserList.jsx";
import {useNavigate} from "react-router-dom";
import {UpdateDialogIssue} from "@/pages/IssueDetails/UpdateDialogIssue.jsx";
import {DeleteDialogProject} from "@/pages/ProjectDetails/DeleteDialogProject.jsx";
import {Badge} from "@/components/ui/badge.jsx";

const IssueCard = ({issue, projectId}) => {
    const navigate = useNavigate();

    return (
        <Card className="rounded-md py-1 pb-2">
            <CardHeader className="pb-1 py-0">
                <div className="items-center flex justify-between">
                    <CardTitle className="cursor-pointer" onClick={() => navigate(`/project/${projectId}/issue/${issue.id}`)}>{issue.title}</CardTitle>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" className="rounded-full" size="icon">
                                <DotsVerticalIcon/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <UpdateDialogIssue id={issue.id}/>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <DeleteDialogProject id={issue.id}/>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className="py-0">

                <div className="flex items-center justify-between">
                    <p>{issue.description}</p>
                    <DropdownMenu className="w-[30rem] border" size="icon">
                        <DropdownMenuTrigger>
                            <Button variant="ghost" className="rounded-full hover:text-black" size="icon">
                                <Avatar>
                                    <AvatarFallback>
                                        <PersonIcon/>
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <UserList issue={issue}/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex">
                    <span className="text-gray-400 mr-5">{issue.dueDate}</span>
                    <Badge>{issue.priority}</Badge>
                </div>
            </CardContent>
        </Card>
    )
}
export default IssueCard;
