import { useState, useEffect } from "react";

const TheLinks = () => {
  const [links, setLinks] = useState([]);

  const getLinks = async () => {
    const data =  await fetch ('https://linknote.onrender.com/api/links');
    const json = await data.json();
    const result = json.data;
    // console.log(result);
    setLinks([...links, ...json.data]);
    console.log(links);
  } 

  useEffect(()=> {
    getLinks();
  }, [])

  return ( 
    <div>
      <h1>Links</h1>
      <div>
        <ul>
          {
            links.map(link => <li key={link._id}> 
            <p>

            <span>
              {link.link} 
            </span> |
            <span>
              {link.group}
            </span>
            </p>
              </li>)
          }
          
        </ul>
      </div>
    </div>
  );
}
 
export default TheLinks;