import { prisma } from "../../../../src/lib/prisma";

export default async function handle(req: any, res: any) {
  const newFood = req.body;
  const result = await prisma.food.create({
    data: {
      name: newFood,
    },
  });
  res.json(result);
}
