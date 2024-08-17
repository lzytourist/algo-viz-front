'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {SignUpSchema, SignUpSchemaType} from "@/lib/definitions";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";
import {useTransition} from "react";
import {signUp} from "@/actions/auth";
import {toast} from "@/components/ui/use-toast";

export default function SignUpForm() {
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      re_password: "",
      institute: ""
    }
  });

  const [pending, startTransition] = useTransition();

  const onSubmit = (data: SignUpSchemaType) => {
    startTransition(async () => {
      const res = await signUp(data);
      if (res.status === 201) {
        toast({
          title: 'Signed up successfully',
          description: 'Account activation mail sent to your email address',
        });

        form.reset();
      } else if (res.status === 400) {
        Object.entries(res.errors).forEach(([key, errors]) => {
          // @ts-ignore
          form.setError(key, {message: errors.join('. ')})
        });
      } else {
        toast({
          title: 'Something went wrong!',
          variant: 'destructive'
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
        <div className={'grid gap-4 grid-cols-1 lg:grid-cols-2'}>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>first name</FormLabel>
              <FormControl>
                <Input type={'text'} autoFocus {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} name={'first_name'}/>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>last name</FormLabel>
              <FormControl>
                <Input type={'text'} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} name={'last_name'}/>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>email address</FormLabel>
              <FormControl>
                <Input type={'email'} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} name={'email'}/>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>institute</FormLabel>
              <FormControl>
                <Input type={'text'} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} name={'institute'}/>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type={'password'} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} name={'password'}/>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>confirm password</FormLabel>
              <FormControl>
                <Input type={'password'} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} name={'re_password'}/>
        </div>
        <Button disabled={pending} className={'w-full flex items-center gap-2'}>
          <span>Sign up</span>
          {pending && <ReloadIcon className={'animate-spin'}/>}
        </Button>
      </form>
    </Form>
  );
}