import { promises as fs } from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({ error: 'Failed to load products' });
  }
} 