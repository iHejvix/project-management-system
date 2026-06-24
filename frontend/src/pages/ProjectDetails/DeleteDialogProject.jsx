import React, {forwardRef, useState} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import {useDispatch, useSelector} from "react-redux";
import { deleteProject } from "@/redux/projectSlice.js";
import {deleteIssue} from "@/redux/issueSlice.js";
import CreateProjectForm from "@/pages/Project/CreateProjectForm.jsx";

// eslint-disable-next-line react/prop-types
export const DeleteDialogProject = forwardRef(({id}, ref) => {
    const dispatch = useDispatch();
    const project = useSelector((state) =>
        state.project.projects.find(project => project.id === id));

    const handleDelete = () => {
        console.log(id)
        if (project) {
            dispatch(deleteProject(id));
        } else {
            dispatch(deleteIssue(id))
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full">Delete</Button>
                </DialogTrigger>
            <DialogContent ref={ref} className="sm:max-w-[425px]">
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone.
                    This will permanently delete your {project ? "project" : "issue"}.
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </>
    );
});

DeleteDialogProject.displayName = "DeleteDialogProject";
