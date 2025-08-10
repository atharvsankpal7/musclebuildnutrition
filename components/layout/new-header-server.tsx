import { getNavigationSections } from '@/lib/section-utils';
import { getHeaderData } from '@/lib/actions';
import { NewHeader } from './new-header';

export const dynamic = 'force-dynamic';

export async function NewHeaderServer() {
  const [navigationSections, headerData] = await Promise.all([
    getNavigationSections(),
    getHeaderData()
  ]);

  return <NewHeader 
    navigationSections={navigationSections} 
    headerData={headerData}
  />;
}
