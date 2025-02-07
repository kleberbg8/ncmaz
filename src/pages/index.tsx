import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { WordPressTemplateProps } from '../types';
export const getStaticProps = async () => {
	const data = await fetch('https://app.ziao.com.br/wp-json/wp/v2/posts'); // Exemplo de API
  
	return {
	  props: { data },
	  revalidate: 60, // Atualiza automaticamente a cada 60 segundos
	};
  };
  