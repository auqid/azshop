import { Helmet } from 'react-helmet-async';

const Meta = ({
  title = 'Nargis — Handcrafted in Kashmir',
  description = 'Pashmina, saffron, walnut wood and papier-mâché, handcrafted in the Kashmir Valley and shipped across India.',
  keywords = 'kashmir, pashmina, saffron, kahwa, walnut wood, papier-mache, handicrafts',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

export default Meta;
