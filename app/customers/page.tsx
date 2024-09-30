import { db } from "@/db";

import {
    CirclePlus
  } from 'lucide-react';

import { Button } from "@/components/ui/button"

import Link from "next/link";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
import { Badge } from "@/components/ui/badge"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { useSearchParams } from 'next/navigation';

export default async function Page() {
    const currentPage = 1;
    const totalPages = await db.holder.count()

    const holderItems = await db.holder.findMany({
        skip: 5*(currentPage-1),
        take: 5,
        include: {
            HolderPolicy: {
                include: {
                    policy: true
                }
            }
        }
    });

    // console.log(holderItems[0].HolderPolicy[0].policy.policyName);

    const renderedPolicyItems = holderItems.map((holderItem) => {
      return (
        <TableRow key={holderItem.id}>
            <TableCell>{holderItem.nric}</TableCell>
            <TableCell>{holderItem.email}</TableCell>
            <TableCell>{holderItem.firstName}</TableCell>
            <TableCell>{holderItem.lastName}</TableCell>
            <TableCell>
            {holderItem.HolderPolicy.map((policy) => {
                return <Badge key={policy.policyId} className="border-gray-300 bg-white text-black">{policy.policy.policyName}</Badge>
            })}
            </TableCell>
        </TableRow>);
    })
  
    return (
    <main className="flex min-h-screen flex-col items-start justify-between px-16">
    <Button className="bg-black my-8 py-0"><Link href="/policies/add" className="flex"><CirclePlus color="#ffffff" className="p-0" /><p className="mx-2">Add Policy</p></Link></Button>
    
    <Card className="w-full mt-0 mb-32">
        <CardHeader>
          <CardTitle>Policy Holders</CardTitle>
          <CardDescription>Personal details of all policy holders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
                  {/* <TableCaption>Insurance Policies: Critical details of insurance policies</TableCaption> */}
                  <TableHeader>
                  <TableRow>
                      <TableHead className="w-[100px]">NRIC</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Policies Held</TableHead>
                  </TableRow>
                  </TableHeader>
                  <TableBody>
                  {renderedPolicyItems}
                  </TableBody>
              </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div><p>Showing 1-5 of 21 policies</p></div>
          <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious 
                        href={"/policies/"+(currentPage-1).toString()}
                        aria-disabled={currentPage <= 1}
                        tabIndex={currentPage <= 1 ? -1 : undefined}
                        className={
                            currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                        }
                    />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink 
                        // href={"/policies/"+(currentPage).toString()}
                        aria-disabled={currentPage <= 1}
                    >{(currentPage).toString()}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationNext href={"/policies/"+(currentPage+1).toString()} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            </div>
        </CardFooter>
      </Card>
      </main>
      );
}

