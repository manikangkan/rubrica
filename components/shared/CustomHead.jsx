import Head from "next/head";

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content="Rubrica - 21st century rubric builder" />
      <meta
        name="description"
        content="Create, share and evalute rubrics for your classroom, school, or district."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://rubrica.com/" />
      <meta
        property="og:title"
        content="Rubrica - 21st century rubric builder"
      />
      <meta
        property="og:description"
        content="Create, share and evalute rubrics for your classroom, school, or district.Create, share and evalute rubrics for your classroom, school, or district."
      />
      <meta property="og:image" content="https://imgur.com/e0p2qaM.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://rubrica.com/" />
      <meta
        property="twitter:title"
        content="Rubrica - 21st century rubric builder"
      />
      <meta
        property="twitter:description"
        content="Create, share and evalute rubrics for your classroom, school, or district.Create, share and evalute rubrics for your classroom, school, or district."
      />
      <meta property="twitter:image" content="https://imgur.com/e0p2qaM.png" />
      {/* <link
        href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic"
        rel="stylesheet"
      /> */}
      <link
        href="https://static.canva.com/web/static_font_4.ltr.css"
        rel="stylesheet"
      />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: "Rubrica",
};
