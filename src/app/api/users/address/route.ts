import { NextResponse } from 'next/server';

import { dummyDeliveryDatas } from '@/data/dummyDeliveryDatas';

export async function GET() {
  const data = dummyDeliveryDatas;

  return NextResponse.json(data, { status: 200 });
}
