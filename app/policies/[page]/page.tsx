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

export default async function Page({params}
    // searchParams:  {
    //     searchParams?: {
    //       page?: string,
    //     },
    //   },
) {
    // const searchParams = useSearchParams();

    // function handleSearch(term: string) {
    //     const params = new URLSearchParams(searchParams);
    // }
  
    // const currentPage = Number(searchParams?.page) || 1;

    const currentPage = Number(params.page);

    console.log(currentPage);
    const totalPages = await db.policy.count()

    const policyItems = await db.policy.findMany({
        skip: 5*(currentPage-1),
        take: 5,
        include: {
            PolicyPolicyType: true
        }
    });

    // console.log(policyItems);
    // console.log(policyItems[0].PolicyPolicyType[0].policyTypeName);

    const renderedPolicyItems = policyItems.map((policyItem) => {
      return (
        <TableRow key={policyItem.id}>
            <TableCell className="font-medium">{policyItem.insurancePolicyId}</TableCell>
            <TableCell>{policyItem.policyName}</TableCell>
            <TableCell>{policyItem.basePrice.toString()}</TableCell>
            <TableCell><Badge className="border-gray-300 bg-white text-black">{policyItem.PolicyPolicyType[0].policyTypeName}</Badge>
                {/* {policyItem.PolicyPolicyType.map((policyType) => {
                return <Badge asChild className="border-gray-300 bg-white text-black">{policyType.PolicyType.policyTypeName}</Badge>
            })} */}
            </TableCell>
        </TableRow>);
    })
  
    return (
    <main className="flex min-h-screen flex-col items-start justify-between px-16">
    <Button className="bg-black my-8 py-0"><Link href="/policies/add" className="flex"><CirclePlus color="#ffffff" className="p-0" /><p className="mx-2">Add Policy</p></Link></Button>
    
    <Card className="w-full mt-0 mb-32">
        <CardHeader>
          <CardTitle>Insurance Policies</CardTitle>
          <CardDescription>Critical details of insurance policies</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
                  {/* <TableCaption>Insurance Policies: Critical details of insurance policies</TableCaption> */}
                  <TableHeader>
                  <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Base Price (SGD)</TableHead>
                      <TableHead>Type of Policy</TableHead>
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
                        <PaginationPrevious href={"/policies/"+(currentPage-1).toString()} />
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href={"/policies/"+(currentPage).toString()}>{(currentPage).toString()}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationEllipsis />
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

