import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch} from "react-redux";
import {login} from "@/redux/authSlice.js";
import {MyAlertDialog} from "@/pages/ProjectDetails/MyAlertDialog.jsx";
import {useState} from "react";

export const Login = () => {


    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const dispatch = useDispatch()

    function onSubmit(formValues) {
        console.log("Create invitation ", formValues)
        dispatch(login(formValues));
    }

    return (
        <div className="space-y-5">

            <h1 className="text-xl">Login</h1>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField control={form.control}
                               name="email"
                               render={({field}) => <FormItem>
                                   <FormControl>
                                       <Input {...field} type="email"
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
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    )
}
export default Login
