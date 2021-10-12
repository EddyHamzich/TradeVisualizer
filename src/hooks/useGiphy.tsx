import { useState, useEffect } from "react";

interface IGiphyData {
  images: {
    fixed_height: {
      url: string
    }
  }
}

export const useGiphy = (howMany: number, keyword: string): { gifs: string[], loading: boolean } => {
  const [gifs, setGifs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const baseURL = "https://api.giphy.com/v1/gifs"
  const key = "&api_key=FxXQpnTRThkWImh93DG7bFk4CwO4gDXz"
  
  useEffect(() => {
    async function getGifs() {
      await fetch(baseURL + `/search?q=${keyword}&limit=${howMany}&rating=g` + key)
      .then(res => res.json())
      .then(res => {
        res.data.forEach((x: IGiphyData) => {
          let imgUrl = x.images.fixed_height.url

          // preload img trick
          let img = new Image()
          img.src = imgUrl

          setGifs(prev => [...prev, imgUrl])
        })
        setLoading(false)
      })
      .catch(err => 0)
    }
    getGifs()
    //eslint-disable-next-line
  }, [])

  return { gifs, loading }
}