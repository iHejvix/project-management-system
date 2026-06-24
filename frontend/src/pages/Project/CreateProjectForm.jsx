import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Cross1Icon} from "@radix-ui/react-icons";
import {useDispatch} from "react-redux";
import {createProject, updateProject} from "@/redux/projectSlice.js";
import {tags} from "@/config/tags.js";
import {MyAlertDialog} from "@/pages/ProjectDetails/MyAlertDialog.jsx";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
export const CreateProjectForm = ({project, setOpen}) => {
    const [showWrong, setShowWrong] = useState(false);
    const dispatch = useDispatch();

    const form = useForm({
        defaultValues: {
            // eslint-disable-next-line react/prop-types
            name: project?.name || "",
            // eslint-disable-next-line react/prop-types
            description: project?.description || "",
            // eslint-disable-next-line react/prop-types
            category: project?.category || "",
            // eslint-disable-next-line react/prop-types
            tags: project?.tags || [],
        }
    })

    const onSubmit = (values) => {
        const valid = Object.values(values).flat()
        let isDifferent;

        if (project) {
            isDifferent = JSON.stringify(Object.values(project).flat().slice(1, 5)) !== JSON.stringify(valid)
        } else {
            isDifferent = true
        }

        if (valid.every(e => e !== "") && isDifferent) {
            if (project) {
                dispatch(updateProject({projectId: project.id, project: values}))
            } else {
                dispatch(createProject(values))
            }
            setOpen(false)
        } else {
            setOpen(true)
            setShowWrong(true)
        }
    }

    function handleTextChange(item) {
        const currentTags = form.getValues("tags");

        const updatedTags = currentTags.includes(item) ? currentTags.filter(tag => tag !== item) :
        [...currentTags, item];

        form.setValue("tags", updatedTags);

    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField control={form.control}
                    name="name"
                    render={({field}) => <FormItem>
                            <FormControl>
                                <Input {...field} type="text"
                                       className="border w-full border-gray-700 py-5 px-5"
                                       placeholder="project name..."
                                />
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
                                              placeholder="project description..."/>
                                   </FormControl>
                                   <FormMessage/>
                               </FormItem>}
                    />
                    <FormField control={form.control}
                               name="category"
                               render={({field}) =>
                                   <FormItem>
                                       <FormControl>
                                           <Select
                                               defaultValue="fullstack"
                                               value={field.value}
                                               onValueChange={(value) => {
                                                   field.onChange(value)
                                               }}
                                           >
                                               <SelectTrigger className="w-full">
                                                   <SelectValue placeholder="Category"/>
                                               </SelectTrigger>
                                               <SelectContent>
                                                   <SelectItem value="fullstack">Fullstack</SelectItem>
                                                   <SelectItem value="frontend">Frontend</SelectItem>
                                                   <SelectItem value="backend">Backend</SelectItem>
                                               </SelectContent>
                                           </Select>
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                                   }
                    />

                    <FormField control={form.control}
                               name="tags"
                               render={({field}) =>
                                   <FormItem>
                                       <FormControl>
                                           <Select
                                               onValueChange={(value) => {
                                                   handleTextChange(value)
                                               }}
                                           >
                                               <SelectTrigger className="w-full">
                                                   <SelectValue placeholder="Tags"/>
                                               </SelectTrigger>
                                               <SelectContent>
                                                   {tags.map((tag,index) =>
                                                       <SelectItem value={tag} key={index}>{tag}</SelectItem>)
                                                   }
                                               </SelectContent>
                                           </Select>
                                       </FormControl>
                                       <div className="flex gap-1 flex-wrap">
                                           {field.value.map(item =>
                                               <div key={item} onClick={() => handleTextChange(item)}
                                                    className="cursor-pointer flex rounded-full
                                                    items-center border gap-2 px-4 py-1">
                                                   <span className="text-sm">{item}</span>
                                                   <Cross1Icon className="h-3 w-3"/>
                                           </div>)}
                                       </div>
                                       <FormMessage/>
                                   </FormItem>
                               }
                    />

                    <Button type="submit" className="mt-5">
                        {project ? "Update project" : "Create Project"}
                    </Button>
                    {
                        showWrong && (
                            <MyAlertDialog project={true} isNew={!!project} open={showWrong} setOpen={setShowWrong}/>
                        )
                    }

                </form>
            </Form>
        </div>
    )
}

export default CreateProjectForm
