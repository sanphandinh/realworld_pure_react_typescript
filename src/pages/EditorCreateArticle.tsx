import { RouteComponentProps } from '@reach/router';
import TheEditor from 'components/TheEditor';
import React from 'react';

const EditorCreateArticle: React.FC<RouteComponentProps> = () => {
  return <TheEditor title="" description="" body="" tagList={[]} />;
};

export default EditorCreateArticle;
