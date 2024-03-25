export function fetchImgs(query) {
    
    const refs = {
      KEYWORD: 'nature', 
      IMAGE_TYPE: 'photo', 
      SAFESEARCH: 'true', 
      ORIENTATION: 'horizontal', 
      API_KEY: '42993354-9366f462d179fd9692b03d8e1', 
      URL: 'https://pixabay.com/api/', 
    };
  
   
    const linkWithQuery = `${refs.URL}?key=${refs.API_KEY}&q=${query}&image_type=${refs.IMAGE_TYPE}&safesearch=${refs.SAFESEARCH}&orientation=${refs.ORIENTATION}`;
  
    
    return fetch(linkWithQuery)
      .then(response => {
       
        if (!response.ok) {
          throw new Error(response.status); 
        }
        return response.json(); 
      })
      .then(data => {
       
        if (data && data.hits) {
          return data; 
        }
      });
  }