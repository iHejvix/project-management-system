import {Card} from "@/components/ui/card.jsx";
import {DotFilledIcon} from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {DeleteDialogProject} from "@/pages/ProjectDetails/DeleteDialogProject.jsx";
import {UpdateDialogProject} from "@/pages/ProjectDetails/UpdateDialogProject.jsx";
import {MoreHorizontal} from "lucide-react";

const ProjectCard = ({projectDependencies}) => {
    const navigate = useNavigate();

    return (
        <Card className="p-5 w-full lg:max-w-3xl">
            <div className="space-y-5">
                <div className="flex justify-between">
                    <div className="flex items-center gap-5">
                        <h1 onClick={() => navigate("/project/" + projectDependencies.id)}
                            className="cursor-pointer font-bold text-lg">{projectDependencies.name}</h1>
                        <DotFilledIcon/>
                        <p className="text-sm text-gray-400">{projectDependencies.category}</p>
                    </div>
                    <div>
                        {/*<DropdownMenu>*/}
                        {/*    <DropdownMenuTrigger>*/}
                        {/*        <Button variant="ghost" size="icon" className="rounded-full">*/}
                        {/*            <DotsVerticalIcon/>*/}
                        {/*        </Button>*/}
                        {/*    </DropdownMenuTrigger>*/}
                        {/*    <DropdownMenuContent>*/}
                        {/*        <DropdownMenuItem asChild>*/}
                        {/*            <UpdateDialogProject id={projectDependencies.id}/>*/}
                        {/*        </DropdownMenuItem>*/}
                        {/*        <DropdownMenuItem asChild>*/}
                        {/*            <DeleteDialogProject id={projectDependencies.id}/>*/}
                        {/*        </DropdownMenuItem>*/}
                        {/*    </DropdownMenuContent>*/}
                        {/*</DropdownMenu>*/}

                        {/*<DropdownMenu modal={false}>*/}
                        {/*    <DropdownMenuTrigger asChild>*/}
                        {/*        <Button variant="ghost" className="h-8 w-8 p-0">*/}
                        {/*            <DotsVerticalIcon/>*/}
                        {/*        </Button>*/}
                        {/*    </DropdownMenuTrigger>*/}
                        {/*    <DropdownMenuContent align="end">*/}
                        {/*        <DropdownMenuLabel>Actions</DropdownMenuLabel>*/}
                        {/*        <Dialog>*/}
                        {/*            <DialogTrigger>*/}
                        {/*                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>*/}
                        {/*                    Delete*/}
                        {/*                </DropdownMenuItem>*/}
                        {/*            </DialogTrigger>*/}
                        {/*            <DeleteDialogProject id={projectDependencies.id}/>*/}
                        {/*        </Dialog>*/}

                        {/*        <DropdownMenuSeparator />*/}
                        {/*        <DropdownMenuItem  asChild>*/}
                        {/*            <UpdateDialogProject id={projectDependencies.id}/>*/}
                        {/*        </DropdownMenuItem>*/}
                        {/*    </DropdownMenuContent>*/}
                        {/*</DropdownMenu>*/}


                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <UpdateDialogProject id={projectDependencies.id}/>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <DeleteDialogProject id={projectDependencies.id}/>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <p className="text-gray-500 text-sm">{projectDependencies.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
                {
                    projectDependencies.tags.map((item, index) =>
                    <Badge key={index} variant="outline">{item}</Badge>)
                }
            </div>
        </Card>
    )
}

// ProjectCard.propTypes = {
//     projectDependencies: PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         name: PropTypes.string.isRequired,
//         description: PropTypes.string,
//         category: PropTypes.string,
//         tags: PropTypes.arrayOf(PropTypes.string),
//     }).isRequired,
// };
export default ProjectCard;