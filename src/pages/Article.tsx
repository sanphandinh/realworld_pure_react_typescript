import React, { FC } from 'react';
import { RouteComponentProps, useParams, Link } from '@reach/router';
import useArticle from 'hooks/useArticle';
import IArticle from 'models/Article';
import { fillParam2Url } from 'helpers/route.helper';
import { ProfileRoute } from 'constants/routes.constants';
import NotFound from 'pages/Notfound';
import TheCommenter from 'components/TheCommenter';

const Article: FC<RouteComponentProps> = () => {
  const { slug } = useParams();
  const { data, status } = useArticle(slug);
  const response = data as { article: IArticle };
  const article = response?.article;
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <NotFound />;
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <Link
              to={fillParam2Url(ProfileRoute, {
                username: article.author?.username,
              })}>
              <img
                src={article.author?.image}
                alt={`icon ${article.author?.username}`}
              />
            </Link>
            <div className="info">
              <Link
                to={fillParam2Url(ProfileRoute, {
                  username: article.author?.username,
                })}
                className="author">
                {article.author?.username}
              </Link>
              <span className="date">
                {new Date(article.updatedAt).toDateString()}
              </span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp;{' '}
              {`${article.author?.following ? 'Unfollow' : 'Follow'} ${
                article.author.username
              }`}{' '}
              {/* <span className="counter">(10)</span> */}
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp;{' '}
              {article.favorited
                ? 'Unfavorite Article'
                : 'Favorite Article'}{' '}
              <span className="counter">({article.favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container page">
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
        {/* <div className="row article-content">
          <div className="col-md-12">
            <p>
              Web development technologies have evolved at an incredible clip
              over the past few years.
            </p>
            <h2 id="introducing-ionic">Introducing RealWorld.</h2>
            <p>It's a great solution for learning how other frameworks work.</p>
          </div>
        </div> */}

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <Link
              to={fillParam2Url(ProfileRoute, {
                username: article.author?.username,
              })}>
              <img alt="icon author" src={article.author?.image} />
            </Link>
            <div className="info">
              <Link
                to={fillParam2Url(ProfileRoute, {
                  username: article.author?.username,
                })}
                className="author">
                {article.author.username}
              </Link>
              <span className="date">
                {new Date(article.updatedAt).toDateString()}
              </span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp;{' '}
              {`${article.author?.following ? 'Unfollow' : 'Follow'} ${
                article.author.username
              }`}{' '}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp;{' '}
              {article.favorited
                ? 'Unfavorite Article'
                : 'Favorite Article'}{' '}
              <span className="counter">(29)</span>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <TheCommenter slug={slug} />
            {/* <form className="card comment-form">
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows={3}></textarea>
              </div>
              <div className="card-footer">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  className="comment-author-img"
                />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                  />
                </a>
                &nbsp;
                <a href="" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                  />
                </a>
                &nbsp;
                <a href="" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit"></i>
                  <i className="ion-trash-a"></i>
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
