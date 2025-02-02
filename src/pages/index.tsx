import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { WordPressTemplateProps } from '../types';
import { GetStaticProps } from 'next';
import { REVALIDATE_TIME } from '@/contains/contants';

export default function Page(props: WordPressTemplateProps) {
	return <WordPressTemplate {...props} />;
}

// Definir revalidação específica para a home: 5 minutos (300 segundos)
export const getStaticProps: GetStaticProps = (ctx) => {
	return getWordPressProps({ ctx, revalidate: 60 }); // 300s = 5 minutos
};
