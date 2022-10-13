import { ReactComponent as ScrollDown } from "../../assets/scroll-down-icon.svg";
import blogBgc from "../../assets/blog-bgc.webp";
import profileImg from "../../assets/blog-portrait.webp";

import BlogCards from "../../components/Blog/BlogCards/BlogCards.component";

import "./blog.styles.css";

const Blog = () => {
  return (
    <section className="section-blog">
      <div
        className="blog-header-container"
        style={{
          backgroundImage: `url(${blogBgc})`,
        }}
      ></div>
      <div className="blog-intro-container">
        <div className="blog-profile-img-container">
          <div
            className="blog-profile-img"
            style={{
              backgroundImage: `url(${profileImg})`,
            }}
          ></div>
        </div>
        <div className="blog-intro-info">
          <div className="blog-title">Zero Waste Blog</div>
          <div className="blog-subtitle">How to leave left footprints</div>
          <p className="blog-text">
            We are lucky to be able to choose what we eat, because many people
            around the world don't have that same choice. Canadian households
            toss out about $1,300 worth of food a year, while Americans waste
            about $2,000 worth annually. If we add restaurants, grocery stores,
            farms, etc. we are wasting – $31 billion in Canada and $165 billion
            in the U.S.
          </p>
          <p className="blog-text">
            Fortunately, there are many things we can do at home to reduce food
            waste, and there are tons of zero-waste recipes you can easily make
            in your kitchen with basic tools.
          </p>
          <p className="blog-check">
            Wanna learn more? Check my Blog
            <span>
              <ScrollDown />
            </span>
          </p>
        </div>
      </div>
      <BlogCards />
    </section>
  );
};

export default Blog;
