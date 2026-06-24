import {useForm} from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch} from "react-redux";
import {createIssue, updateIssue} from "@/redux/issueSlice.js";
import {useParams} from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {cn} from "@/lib/utils.js";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.jsx";
import {useState} from "react";
import {MyAlertDialog} from "@/pages/ProjectDetails/MyAlertDialog.jsx";
import {AlertDialog, AlertDialogTrigger} from "@/components/ui/alert-dialog.jsx";

// eslint-disable-next-line react/prop-types
export const CreateIssueForm = ({status, issue, setOpen}) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [showWrong, setShowWrong] = useState(false);

    const form = useForm({
        defaultValues: {
            title: issue?.title || "",
            description: issue?.description || "",
            dueDate: issue?.dueDate || "",
            priority: issue?.priority || ""
        },
    });

    function onSubmitForm(formValues) {
        const isValidForm = Object.values(formValues).every(
            (field) => field !== null && field !== "" && !(Array.isArray(field) && field.length === 0)
        );

        const issueSlice = {
            title: issue?.title,
            description: issue?.description,
            dueDate: issue?.dueDate,
            priority: issue?.priority,
        }
        console.log(issueSlice)
        console.log(formValues)
        if (isValidForm && JSON.stringify(issueSlice) !== JSON.stringify(formValues)) {
            let date = new Date(formValues.dueDate);

            const issueRequest = {
                title: formValues.title,
                description: formValues.description,
                projectId: id,
                status: status,
                priority: formValues.priority,
                dueDate: date,
            };

            if (issue) {
                dispatch(updateIssue({issueId: issue.id, issue: issueRequest}));
            } else {
                dispatch(createIssue(issueRequest));
            }
            setOpen(false);
        } else {
            setOpen(true);
            setShowWrong(true)
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-5">
                    <FormField control={form.control}
                               name="title"
                               render={({field}) => <FormItem>
                                   <FormControl>
                                       <Input {...field} type="text"
                                              className="border w-full border-gray-700 py-5 px-5"
                                              placeholder="issue name..."/>
                                   </FormControl>
                                   <FormMessage/>
                               </FormItem>}
                    />

                    <FormField control={form.control}
                               name="description"
                               render={({field}) => <FormItem>
                                   <FormControl>
                                       <Input {...field} type="text"
                                              className="border w-full border-gray-700 py-5 px-5"
                                              placeholder="issue description..."/>
                                   </FormControl>
                                   <FormMessage/>
                               </FormItem>}
                    />

                    <FormField control={form.control}
                               name="priority"
                               render={({field}) =>
                                   <FormItem>
                                       <FormControl>
                                           <Select defaultValue="low" value={field.value}
                                                   onValueChange={value => field.onChange(value)}
                                           >
                                               <SelectTrigger>
                                                   <SelectValue placeholder="Select a priority" />
                                               </SelectTrigger>
                                               <SelectContent>
                                                   <SelectGroup>
                                                       <SelectLabel>Priorities</SelectLabel>
                                                       <SelectItem value="low">Low</SelectItem>
                                                       <SelectItem value="medium">Medium</SelectItem>
                                                       <SelectItem value="high">High</SelectItem>
                                                   </SelectGroup>
                                               </SelectContent>
                                           </Select>
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>}
                    />
                    <FormField
                       control={form.control}
                       name="dueDate"
                       render={({ field }) => (
                           <FormItem className="flex flex-col">
                               <Popover>
                                   <PopoverTrigger asChild>
                                       <FormControl>
                                           <Button
                                               variant={"outline"}
                                               className={cn(
                                                   " pl-3 text-left font-normal",
                                                   !field.value && "text-muted-foreground"
                                               )}
                                           >
                                               {field.value ? (
                                                   format(field.value, "PPP")
                                               ) : (
                                                   <span>Pick a date</span>
                                               )}
                                               <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                           </Button>
                                       </FormControl>
                                   </PopoverTrigger>
                                   <PopoverContent className="w-auto p-0" align="start">
                                       <Calendar
                                           mode="single"
                                           selected={field.value}
                                           onSelect={field.onChange}
                                           initialFocus
                                       />
                                   </PopoverContent>
                               </Popover>
                               <FormMessage />
                           </FormItem>
                       )}
                    />
                    <Button type="submit" className="mt-5">
                        {issue ? "Update" : "Create"} issue
                    </Button>
                    {
                        showWrong && (
                            <MyAlertDialog project={false} isNew={!!issue} open={showWrong} setOpen={setShowWrong}/>
                        )
                    }

                </form>
            </Form>
        </div>
    )
}

export default CreateIssueForm