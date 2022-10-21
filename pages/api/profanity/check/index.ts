import { Filter } from "bad-words";

export default async function handle(req: any, res: any) {
  const filter = new Filter();
  const { text } = req.body;

  const filteredText = filter.clean(text);
  //if filtered text is not equal to the original text, then there is profanity
  const isProfane = filteredText !== text;
  if (isProfane) {
    res.status(200).json({ isProfane }); //this will return true
  } else res.status(201).json({ isProfane }); //this will return false
}
