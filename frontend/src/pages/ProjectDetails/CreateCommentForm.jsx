import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createComment} from "@/redux/commentSlice.js";
import {selectCurrentUser} from "@/redux/authSlice.js";
import {useParams} from "react-router-dom";

export function CreateCommentForm({issueId}) {
    const form = useForm({
        defaultValues: {
            content: "",
        }
    })

    const dispatch = useDispatch()
    const user = useSelector(state => selectCurrentUser(state))
    const {projectId} = useParams();

    function onSubmit(formValues) {
        console.log("create data ", formValues);
        dispatch(createComment({
            content: formValues.content,
            issueId,
            senderId: user.id,
            projectId
        }))
    }

    return (
        <div>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                    <FormField control={form.control}
                               name="content"
                               render={({field}) =>
                                   <FormItem>
                                       <div className="flex gap-2">
                                           <div>
                                               <Avatar>
                                                   <AvatarFallback>H</AvatarFallback>
                                               </Avatar>
                                           </div>
                                           <FormControl>
                                               <Input {...field} type="text"
                                                      className="w-[20rem]"
                                                      placeholder="Hi..."/>
                                           </FormControl>
                                       </div>
                                       <FormMessage/>
                                   </FormItem>
                               }
                    />
                    <Button type="submit">Send</Button>
                </form>
            </Form>
        </div>
    )
}
