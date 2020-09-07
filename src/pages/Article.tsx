import React, { FC, useCallback } from 'react';
import { RouteComponentProps, useParams } from '@reach/router';
import useArticle from 'hooks/useArticle';
import NotFound from 'pages/Notfound';
import TheCommenter from 'components/TheCommenter';
import BaseArticleMeta from 'components/BaseArticleMeta';
import useActionFavoriteArticle from 'hooks/useActionFavoriteArticle';
import { queryCache } from 'react-query';
import IArticleResponse from 'models/ArticleResponse';

const Article: FC<RouteComponentProps> = () => {
  const { slug } = useParams();
  const { data, status } = useArticle(slug);
  const article = data?.article;
  const favorited = !!article?.favorited;
  const { handleDeleteFavorite, handleFavorite } = useActionFavoriteArticle({
    slug,
    options: {
      onMutate: (variables) => {
        const previousValue = data;
        queryCache.setQueryData<IArticleResponse>(
          `articles/${slug}`,
          (oldData) => {
            if (!oldData) return undefined;
            return {
              article: {
                ...oldData.article,
                favorited: variables?.isDelete ? false : true,
                favoritesCount: variables?.isDelete
                  ? oldData.article.favoritesCount - 1
                  : oldData.article.favoritesCount + 1,
              },
            };
          }
        );
        return previousValue;
      },
      onError: (err, variables, previousValue) =>
        queryCache.setQueryData(`articles/${slug}`, previousValue),
      onSettled: () => {
        queryCache.invalidateQueries(`articles/${slug}`);
      },
    },
  });
  const favoriteAction = useCallback(() => {
    if (favorited) {
      handleDeleteFavorite();
    } else {
      handleFavorite();
    }
  }, [favorited, handleDeleteFavorite, handleFavorite]);
  const baseArticleMeta = (
    <BaseArticleMeta
      username={article?.author.username}
      favorited={favorited}
      favoritesCount={article?.favoritesCount}
      following={article?.author.following}
      image={article?.author.image}
      updatedAt={article?.updatedAt}
      favoriteAction={favoriteAction}
    />
  );
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <NotFound />;
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article?.title}</h1>
          {baseArticleMeta}
        </div>
      </div>
      <div className="container page">
        <div dangerouslySetInnerHTML={{ __html: article?.body || '' }} />
        <hr />
        <div className="article-actions">{baseArticleMeta}</div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <TheCommenter slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
