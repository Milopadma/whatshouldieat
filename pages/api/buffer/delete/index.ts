import { prisma } from "../../../../src/lib/prisma";

export default async function handle(req: any, res: any) {
  //api endpoint for deleting a food by id
  const food = req.body;
  const result = await prisma.buffer.delete({
    where: {
      id: food,
    },
  });
  res.json(result);
}
