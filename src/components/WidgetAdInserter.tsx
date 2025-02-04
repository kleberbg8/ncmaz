import { gql, useQuery } from "@apollo/client";

const GET_AD = gql`
  query GetAd($block: Int!) {
    adBlock(block: $block)
  }
`;

const WidgetAdInserter = ({ block = 1 }) => {
  const { data, loading, error } = useQuery(GET_AD, { variables: { block } });

  if (loading) return <p>Carregando anúncio...</p>;
  if (error) return <p>Erro ao carregar o anúncio.</p>;

  return (
    <div className="widget-ad">
      <div dangerouslySetInnerHTML={{ __html: data?.adBlock || "" }} />
    </div>
  );
};

export default WidgetAdInserter;
