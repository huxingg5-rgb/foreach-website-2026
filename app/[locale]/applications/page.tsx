import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ApplicationIndexPage from '@/components/applications/ApplicationIndexPage';

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return [{ locale: 'en' }]; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  return {
    title: '应用领域：按设备与工作流程了解液路元件 | FOREACH',
    description: '从体外诊断、生命科学、实验室自动化、分析仪器、环保监测与合成生物，进入设备专题、产品应用和具体液体操作任务。',
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  return <ApplicationIndexPage />;
}
