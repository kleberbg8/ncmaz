import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { WordPressTemplateProps } from '../types';
import { GetStaticProps } from 'next';
import { REVALIDATE_TIME } from '@/contains/contants'; // Importando a constante

export default function Page(props: WordPressTemplateProps) {
    return <WordPressTemplate {...props} />;
}

// Usando a constante para definir o tempo de revalidação
export const getStaticProps: GetStaticProps = async (ctx) => {
    console.log(`🔄 Revalidando a home a cada ${REVALIDATE_TIME} segundos...`);
    return getWordPressProps({
        ctx,
        revalidate: REVALIDATE_TIME, // Agora o tempo de revalidação vem da constante
    });
};
