"use client";

import { db } from "@/db";

import * as z from "zod";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { PolicySchema } from "@/schemas";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useRouter } from "next/navigation";

// import * as React from "react"
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
//   } from "@/components/ui/dropdown-menu"

// type Checked = DropdownMenuCheckboxItemProps["checked"]
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { add_policy } from "@/actions/add_policy";

export default function Page() {
    const form = useForm<z.infer<typeof PolicySchema>>({
    resolver: zodResolver(PolicySchema),
        defaultValues: {
            id: "",
            name: "",
            price: 0,
            type: ""
        },
    });
    

  const policyTypes = [
    { id: 1, policyTypeName: 'Health Insurance' },
    { id: 2, policyTypeName: 'Travel Insurance' },
    { id: 3, policyTypeName: 'Life Insurance' },
    { id: 4, policyTypeName: 'Critical Illness' },
    { id: 5, policyTypeName: 'Car Insurance' },
    { id: 6, policyTypeName: 'Home Insurance' },
    { id: 7, policyTypeName: 'Personal Accident' },
    { id: 8, policyTypeName: 'Business Insurance' },
    ];

  const router = useRouter();

  const onSubmit = async (values) => {
    console.log(values)

    const status = await add_policy(values);

    

    if (status?.error) {
      console.log(status.error);
    } else {
	    // This step can be deferred for later use
      router.push("/policies");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Card>
            <CardHeader>
                <CardTitle>Add Policy</CardTitle>
                <CardDescription>Add a new policy</CardDescription>
            </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>ID</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="20A123" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                        <Input
                            {...field}
                            placeholder="Basic Health Coverage"
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="15" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Policy Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {policyTypes.map((policyType) => (<SelectItem key={policyType.id} value={policyType.policyTypeName}>{policyType.policyTypeName}</SelectItem>))}
                        </SelectContent>
                        </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>

                <Button type="submit">Button</Button>
            </form>
            </Form>
        </CardContent>
        </Card>
    </main>
  );
};
