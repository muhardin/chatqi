"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

const FormSchema = z.object({
    email: z.string().min(1, {
      message: "Email is required",
    }).email('Invalid Email'),
    password: z.string().min(1,'Password is required'),
  })


 
const SignInForm = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    
    const onSubmit = (value:z.infer<typeof FormSchema>) => {
        console.log(value);
      } 
    return (
        <Form {...form}>
            
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="space-y-2">
      <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
            
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
            
          )}
        />
        </div>
        
        <Button className="w-full mt-6" type="submit">Sign In</Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p>
        If you don&apos;t have account, please&nbsp; 
        <Link className="text-blue-500 hover:underline" href='/sign-up'>Sign Up</Link>
      </p>
    </Form>
    )
}

export default SignInForm;