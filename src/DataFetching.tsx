import React, { useState, useEffect } from "react";
import axios from "axios";

function DataFetching() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
      )
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch(Error);
  });
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.name.english}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataFetching;
