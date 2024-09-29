"use server";

import { db } from "@/db";

export async function add_policy(data) {
  try {
    console.log(data)

    const new_policy = await db.policy.create({
      data: {
        insurancePolicyId: data.id,
        policyName: data.name,
        basePrice: data.price
      },
    });

    await db.policyPolicyType.create({
        data: {
          policyId: new_policy.id,
          policyTypeName: data.type,
        },
    });

    // for (const policyType of data.type) {
    //     await db.policyPolicyType.create({
    //         data: {
    //           policyId: new_policy.id,
    //           policyTypeName: policyType,
    //         },
    //       });
    // }

  } catch (error) {
    return { error: "Error creating new policy" };
  }
}