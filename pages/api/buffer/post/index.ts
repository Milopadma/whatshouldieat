import { prisma } from "../../../../src/lib/prisma";

export default async function handle(req: any, res: any) {
  const food = req.body;
  const result = await prisma.buffer.create({
    data: {
      name: food,
    },
  });
  res.json(result);
}
