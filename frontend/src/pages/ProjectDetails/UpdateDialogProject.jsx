import {forwardRef, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import CreateProjectForm from "@/pages/Project/CreateProjectForm.jsx";
import {useSelector} from "react-redux";

export const UpdateDialogProject = forwardRef(({id}, ref) => {
    const project = useSelector((state) =>
        state.project.projects.find(project => project.id === id));

    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button variant="ghost" className="w-full">Update Project</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Update project</DialogTitle>
                <DialogDescription/>
                <CreateProjectForm project={project} setOpen={setOpen}/>
            </DialogContent>
        </Dialog>
    );
});

UpdateDialogProject.displayName = "UpdateDialogProject";
