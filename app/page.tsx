import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { auth, signOut } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session !== null ? (
        <>
          <h1 className="text-4xl font-bold">Welcome, {session.user.name}!</h1>
          <form
            action={async (formData) => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Who is Heicoders?</AccordionTrigger>
              <AccordionContent>
                A highly-rated, outcome-driven tech education provider that
                seeks to accelerate your career through high-quality classes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is SE200?</AccordionTrigger>
              <AccordionContent>
                A full-stack software engineering focusing on databases,
                engineering principles and web application frameworks.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What OS can I use for web development?
              </AccordionTrigger>
              <AccordionContent>
                Both Windows and Mac operating systems are suitable options.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What is a nanodegree?</AccordionTrigger>
              <AccordionContent>
                Comprises 3 or more individual courses that progressively equip
                learners with the skill sets required for working in the tech
                sector.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold">Welcome to Heicoders!</h1>
          <div className="flex flex-row space-x-10">
            <Button className="mt-8">
              <Link href="/login" className="hover:underline">
                Log In
              </Link>
            </Button>
            <Button className="mt-8">
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </Button>
          </div>
        </>
      )}

      <p className="font-bold">Made in Singapore</p>
    </main>
  );
}
