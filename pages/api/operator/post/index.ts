import { prisma } from "../../../../src/lib/prisma";

export default async function handle(req: any, res: any) {
  const email = req.body;
  const result = await prisma.operator.create({
    data: {
      email: email,
    },
  });
  res.json(result);
}
