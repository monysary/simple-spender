"use client"

import { useState } from "react";
import { useParams } from "next/navigation";

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

import { IconPlus } from "@tabler/icons-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createTransaction } from "@/db/crud/create-transaction";

const formSchema = z.object({
  name: z.string().min(1, "Please enter a name for your transaction"),
  amount: z.number().min(0, "Please enter an amount"),
  description: z.string().optional(),
  date: z.date({ error: "Please enter a valid date" }),
});

export function AddTransaction() {
  const [open, setOpen] = useState(false);
  
  const params = useParams();
  const id = Array.isArray(params.spending_tracker_id)
  ? params.spending_tracker_id[0]
  : params.spending_tracker_id ?? "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      description: "",
      date: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const input = {
      ...values,
      spending_tracker_id: id?.toString(),
      date: new Date(values.date).toISOString()
    }
    values.amount = values.amount * 100; // convert float to integer for accuracy
    const newTransaction = await createTransaction(input);
    if (newTransaction.changes === 1) {
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
              <IconPlus />
            </EmptyMedia>
            <EmptyTitle>Add Transaction</EmptyTitle>
          </EmptyHeader>
        </Empty>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input 
                      id="amount" 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)} 
                    />
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