import React, { FC } from 'react';
import { RouteComponentProps, Router } from '@reach/router';

const EditorCreateArticleAsync = React.lazy(
  () => import('./EditorCreateArticle')
);

const EditorEditArticleAsync = React.lazy(() => import('./EditorEditArticle'));

const Editor: FC<RouteComponentProps> = () => {
  return (
    <Router>
      <EditorEditArticleAsync path="/:slug" />
      <EditorCreateArticleAsync path="/" />
    </Router>
  );
};

export default Editor;
