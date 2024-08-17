'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {SignInSchema, SignInSchemaType} from "@/lib/definitions";
import {zodResolver} from "@hookform/resolvers/zod";
import SubmitButton from "@/components/submit-button";
import {useTransition} from "react";
import {signIn} from "@/actions/auth";
import {toast} from "@/components/ui/use-toast";
import {redirect} from "next/navigation";

export default function SignInForm() {
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const [pending, startTransition] = useTransition();

  const onSubmit = (data: SignInSchemaType) => {
    startTransition(async () => {
      const res = await signIn(data);

      if (res.status === 400) {
        toast({
          title: 'Unable to sign in with provided credentials',
          variant: 'destructive'
        });
      } else if (res.status === 200) {
        toast({
          title: 'Signed in successfully',
        });
        form.reset();
        redirect('/');
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4 capitalize'}>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>email address</FormLabel>
            <FormControl>
              <Input type={'email'} autoFocus {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} name={'email'}/>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>password</FormLabel>
            <FormControl>
              <Input type={'password'} {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} name={'password'}/>
        <SubmitButton pending={pending}>Sign in</SubmitButton>
      </form>
    </Form>
  )
}