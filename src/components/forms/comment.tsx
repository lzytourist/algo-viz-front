'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {CommentSchema, CommentSchemaType} from "@/lib/definitions";
import {zodResolver} from "@hookform/resolvers/zod";
import {Textarea} from "@/components/ui/textarea";
import {useTransition} from "react";
import {postComment} from "@/actions/algorithm";
import SubmitButton from "@/components/submit-button";
import {useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";

export default function CommentForm({slug}: { slug: string }) {
  const form = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      text: ''
    }
  });

  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onSubmit = (data: CommentSchemaType) => {
    startTransition(async () => {
      const res = await postComment(data, slug);

      if (res.status === 201) {
        toast({
          title: 'Thank you for your comment',
        });
        form.reset();
        router.refresh();
      } else {
        toast({
          title: 'Failed to register comment',
          description: 'There might be some problem in the server, please try again later',
          variant: 'destructive'
        });
      }
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
        <FormField
          render={({field}) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
          name={'text'}/>
        <SubmitButton pending={pending}>Submit</SubmitButton>
      </form>
    </Form>
  )
}