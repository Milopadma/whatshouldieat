import { prisma } from "../../../../src/lib/prisma";

export default async function handle(req: any, res: any) {
  //api endpoint for deleting a food by id
  const newFood = req.body;
  const result = await prisma.food.delete({
    where: {
      id: newFood,
    },
  });
  res.json(result);
}
