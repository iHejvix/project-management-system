import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.jsx";
import {MyAlertDialog} from "@/pages/ProjectDetails/MyAlertDialog.jsx";
import {inviteToProject} from "@/redux/projectSlice.js";

export const InviteUserForm = ({setOpen}) => {
    const form = useForm({
        defaultValues: {
            email: "",
        },
    });

    const dispatch = useDispatch();
    const {id} = useParams();
    const [showWrongEmail, setShowWrongEmail] = useState(false);

    function onSubmit(formValues) {
        if (!formValues.email.includes("@") || formValues.email.slice(-1) === "@") {
            setShowWrongEmail(true)
            setOpen(true)
            return;
        }
        dispatch(inviteToProject({projectId: id, email: formValues.email}));
        setOpen(false);
    }

    return (
        <div>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField control={form.control}
                               name="email"
                               render={({field}) => <FormItem>
                                   <FormLabel>Create new project</FormLabel>
                                   <FormControl>
                                       <Input {...field} type="text"
                                              className="border w-full border-gray-700 py-5 px-5"
                                              placeholder="user email..."/>
                                   </FormControl>
                                   <FormMessage/>
                               </FormItem>}
                    />

                        <Button type="submit" className="w-full mt-5">
                            Invite User
                        </Button>
                    {
                        showWrongEmail && (
                            <AlertDialog open={showWrongEmail} onOpenChange={setShowWrongEmail}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Warn</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Your address email must contain @.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Ok</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )
                    }
                </form>
            </Form>
        </div>
    )
}

export default InviteUserForm