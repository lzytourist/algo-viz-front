'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UserSchema, UserSchemaType} from "@/lib/definitions";
import SubmitButton from "@/components/submit-button";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTransition} from "react";
import {updateUser} from "@/actions/auth";

export default function UpdateAccountForm({user}: { user: UserSchemaType }) {
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      first_name: user.first_name ?? '',
      last_name: user.last_name ?? '',
      gender: user.gender ?? '',
      institute: user.institute ?? '',
      date_of_birth: user.date_of_birth ?? new Date()
    }
  });

  const [pending, startTransition] = useTransition();

  const onSubmit = (data: UserSchemaType) => {
    startTransition(async () => {
      const res = await updateUser(data);
      console.log(res);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
        <div className={'grid grid-cols-1 gap-4 lg:grid-cols-2'}>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input type={'text'} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} name={'first_name'}/>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input type={'text'} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} name={'last_name'}/>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Input type={'date'} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} name={'date_of_birth'}/>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder={'Select gender'}/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={'male'}>Male</SelectItem>
                    <SelectItem value={'female'}>Female</SelectItem>
                    <SelectItem value={'other'}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} name={'gender'}/>
          <FormField render={({field}) => (
            <FormItem className={'col-span-2'}>
              <FormLabel>Institute</FormLabel>
              <FormControl>
                <Input type={'text'} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} name={'institute'}/>
        </div>
        <SubmitButton pending={pending}>Update</SubmitButton>
      </form>
    </Form>
  );
}