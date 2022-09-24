import axios from 'axios';

export const baseUrl = "https://bayut.p.rapidapi.com"  




export const fetchApi = async (url: string) => {
    const {data} = await axios.get(url, {
        headers: {
            'X-RapidAPI-Key': '69cfed012emsh9d500083783d80bp1d9468jsna0e520d46c86',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }
    });

    return data;
}