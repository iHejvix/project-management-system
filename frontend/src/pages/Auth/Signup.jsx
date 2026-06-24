import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch} from "react-redux";
import {register} from "@/redux/authSlice.js";

export const Signup = () => {
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            fullName: ""
        },
    });

    const dispatch = useDispatch()

    function onSubmit(formValues) {
        dispatch(register(formValues));
        console.log(formValues);
    }

    return (
        <div className="space-y-5">
            <h1 className="text-xl">Register</h1>
            <Form {...form}>

            <FormField control={form.control}
                           name="fullName"
                           render=
                           { ({field}) =>
                               <FormItem>
                               <FormControl>
                                   <Input {...field} type="email"
                                          className="border w-full border-gray-700 py-5 px-5"
                                          placeholder="Full name..."/>
                               </FormControl>
                               <FormMessage/>
                               </FormItem>}
                />

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField control={form.control}
                               name="email"
                               render={({field}) => <FormItem>
                                   <FormControl>
                                       <Input {...field} type="text"
                                              className="border w-full border-gray-700 py-5 px-5"
                                              placeholder="email..."/>
                                   </FormControl>
                                   <FormMessage/>
                               </FormItem>}
                    />

                    <FormField control={form.control}
                               name="password"
                               render={({field}) => <FormItem>
                                   <FormControl>
                                       <Input {...field} type="password"
                                              className="border w-full border-gray-700 py-5 px-5"
                                              placeholder="password..."/>
                                   </FormControl>
                                   <FormMessage/>
                               </FormItem>}
                    />


                    <Button type="submit" className="w-full mt-5">
                        Register
                    </Button>
                </form>
            </Form>
        </div>
    )
}
export default Signup
