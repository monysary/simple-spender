"use client"

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createNewTracker } from "@/db/crud/create-new-tracker";

const formSchema = z.object({
  name: z.string().min(1, "Please enter a name for your tracker"),
  description: z.string().optional(),
});

export function AddNewTracker() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newTracker = await createNewTracker(values);
    if (newTracker.changes === 1) {
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          form.reset();
        }
      }}
    >
      <DialogTrigger className="cursor-pointer border border-dashed rounded-xl hover:border-slate-500/50">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FontAwesomeIcon icon={faPlus} />
            </EmptyMedia>
            <EmptyTitle>Add New Tracker</EmptyTitle>
          </EmptyHeader>
        </Empty>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Spending Tracker</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input id="name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input id="description" type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit" variant="default">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
};