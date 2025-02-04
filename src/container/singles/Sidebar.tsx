import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1';
import WidgetAddSubscriberForm from '@/components/WidgetAddSubscriberForm/WidgetAddSubscriberForm';
import WidgetCategories from '@/components/WidgetCategories/WidgetCategories';
import WidgetSocialsFollow from '@/components/WidgetSocialsFollow/WidgetSocialsFollow';
import WidgetAdInserter from '@/components/WidgetAdInserter'; // 🔹 Importação do componente de anúncios
import React, { FC } from 'react';

export interface SidebarProps {
  className?: string;
  categories: TCategoryCardFull[] | null;
}

export const Sidebar: FC<SidebarProps> = ({
  className = 'space-y-6 ',
  categories,
}) => {
  return (
    <div className={`nc-SingleSidebar lg:sticky lg:top-24 ${className}`}>
      <WidgetAddSubscriberForm />

      {/* 🔹 Inserindo o bloco de anúncio Ad Inserter na Sidebar */}
      <WidgetAdInserter block={1} />

      <WidgetSocialsFollow />

      <WidgetCategories categories={categories || []} />
    </div>
  );
};
