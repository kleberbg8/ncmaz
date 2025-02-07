import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { WordPressTemplateProps } from '../types';
import { GetStaticProps } from 'next';
import { REVALIDATE_TIME } from '@/contains/contants'; // Importando a constante

export default function Page(props: WordPressTemplateProps) {
    return <WordPressTemplate {...props} />;
}

// Use a constante REVALIDATE_TIME
export const getStaticProps: GetStaticProps = (ctx) => {
    return getWordPressProps({ ctx, revalidate: REVALIDATE_TIME });
};
