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

export default async function Page() {
    const policyItems = await db.policy.findMany({
        take: 5,
        include: {
            PolicyPolicyType: {
                include: {
                    PolicyType: true
                }
            }
        }
    });
  
    // console.log(policyItems);
    console.log(policyItems[0].PolicyPolicyType.map((policyType) => {
        return policyType.PolicyType.policyTypeName
    }));

    const renderedPolicyItems = policyItems.map((policyItem) => {
      return (
        <TableRow key={policyItem.id}>
            <TableCell className="font-medium">{policyItem.insurancePolicyId}</TableCell>
            <TableCell>{policyItem.policyName}</TableCell>
            <TableCell>{policyItem.basePrice.toString()}</TableCell>
            <TableCell>{policyItem.PolicyPolicyType.map((policyType) => {
                return <Badge asChild className="border-gray-300 bg-white text-black">{policyType.PolicyType.policyTypeName}</Badge>
            })}
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
        <CardFooter>
          <p>Showing 1-5 of 21 policies</p>
        </CardFooter>
      </Card>
      </main>
      );
}

