import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { WordPressTemplateProps } from '../types';
import { GetServerSideProps } from 'next';

export default function Page(props: WordPressTemplateProps) {
    return <WordPressTemplate {...props} />;
}

// Buscar os dados mais recentes diretamente do backend
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    console.log('🔄 Buscando dados em tempo real da home...');
    return getWordPressProps({ ctx });
};
