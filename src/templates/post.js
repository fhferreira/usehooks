import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeStyle } from "react-syntax-highlighter/dist/styles/prism";

export const PostTemplate = ({ content, frontmatter, slug, ...props }) => {
  return (
    <Hook id={frontmatter.title}>
      <Name>
        <i class="fas fa-link link-icon" />

        <Link to={slug}>{frontmatter.title}</Link>
      </Name>

      <Content dangerouslySetInnerHTML={{ __html: content }} />

      <SyntaxHighlighter
        language="javascript"
        style={codeStyle}
        customStyle={{ borderRadius: "10px", padding: "1.5em" }}
      >
        {frontmatter.code}
      </SyntaxHighlighter>

      {frontmatter.links && frontmatter.links.length && (
        <Links>
          <div className="links-title">📚 Also check out:</div>
          <ul>
            {frontmatter.links.map((link, i) => (
              <LinksLi>
                <a target={link.target || "_blank"} href={link.url}>
                  {link.name}
                </a>{" "}
                -{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: link.description
                  }}
                />
              </LinksLi>
            ))}
          </ul>
        </Links>
      )}

      <Info>
        <div className="level-item">{frontmatter.date}</div>
        <div className="level-item is-hidden-mobile">
          <span>•</span>
        </div>
        <div className="level-item">
          <a target="_blank" href={frontmatter.sandbox}>
            Open in CodeSandbox
          </a>
        </div>
        <div className="level-item is-hidden-mobile">
          <span>•</span>
        </div>
        <div className="level-item">
          <a target="_blank" href={frontmatter.gist}>
            Suggest a change
          </a>
        </div>
      </Info>
    </Hook>
  );
};

const Post = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} | useHooks`}>
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content="" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <PostTemplate
        content={post.html}
        frontmatter={post.frontmatter}
        slug={post.fields.slug}
      />
      <More>
        <Link to="/">
          <i class="fas fa-home" />
          See more hook recipes
        </Link>
      </More>
    </Layout>
  );
};

export default Post;

export const pageQuery = graphql`
  query PostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        gist
        sandbox
        links {
          url
          name
          description
        }
        code
      }
    }
  }
`;

const Hook = styled("div")`
  margin-bottom: 4rem;
`;

const Name = styled("h2").attrs({
  className: "title is-3"
})`
  position: relative;

  .link-icon {
    display: none;
    position: absolute;
    left: -30px;
    top: 10px;
    opacity: 0.3;
    font-size: 22px;
  }

  a {
    color: inherit;
  }

  &:hover {
    .link-icon {
      display: inline;
    }
  }
`;

const Content = styled("div")`
  margin-bottom: 25px;
`;

const Links = styled("div")`
  background-color: #f3f9f8;
  padding: 25px;
  margin-top: 15px;
  border-radius: 10px;
  .links-title {
    margin-bottom: 5px;
    font-weight: bold;
  }
`;

const LinksLi = styled("li")`
  margin-bottom: 5px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Info = styled("div").attrs({ className: "level" })`
  margin: 20px auto 0 auto;
  max-width: 560px;
  span {
    padding: 0 0.5rem;
    opacity: 0.2;
  }
`;

const More = styled("div")`
  text-align: center;
  font-weight: bold;

  i {
    opacity: 0.3;
    margin-right: 10px;
  }
`;
