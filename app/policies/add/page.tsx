"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";
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

export default function Page() {
	// This step can be deferred for later use
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    const status = null

    if (status?.error) {
      console.log(status.error);
    } else {
	    // This step can be deferred for later use
      router.push("/login");
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
                        <Input {...field} placeholder="Health Insurance" />
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
