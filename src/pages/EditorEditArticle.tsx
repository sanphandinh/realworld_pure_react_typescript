import { RouteComponentProps, useParams } from '@reach/router';
import TheEditor from 'components/TheEditor';
import useArticle from 'hooks/useArticle';
import React from 'react';

const EditorEditArticle: React.FC<RouteComponentProps> = () => {
  const { slug } = useParams();
  const { data } = useArticle(slug);
  const articles = data?.article;
  return (
    <TheEditor
      title={articles?.title}
      description={articles?.description}
      body={articles?.body}
      tagList={articles?.tagList}
      slug={articles?.slug}
    />
  );
};

export default EditorEditArticle;
