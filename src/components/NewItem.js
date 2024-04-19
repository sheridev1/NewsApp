import React from "react";

const  NewItem =(props)=>{
  
    let {
      title,
      description,
      imageUrl,
      newsUrl,
      author,
      date,
      source,
    } = props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={
              !imageUrl
                ? "https://i.ytimg.com/vi/t_hGnpACG2E/hqdefault.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}...
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {source}
              </span>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}{" "}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-dark">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }


export default NewItem;
