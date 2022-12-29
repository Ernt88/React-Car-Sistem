import { Response } from 'express';

export default function respond(
  res: Response,
  statusCode: number,
  body?: unknown
): void {
  res.writeHead(statusCode, {
    'Content-type': 'aplication/json',
  });

  if (body) {
    res.end(JSON.stringify(body));
  } else {
    res.end();
  }
}
