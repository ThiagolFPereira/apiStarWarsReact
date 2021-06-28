
import axios from 'axios';

export const getPeoples = async () => {
    var response = [];
    var responseAux = [];
    var dadosPersons = [];

    for(let i=1; i<=9; i++) {
        responseAux = await axios.get(`https://swapi.dev/api/people/?page=${i}`)
        response.push(responseAux)
    }
    for(let i=0; i<response.length; i++){
        dadosPersons.push(...response[i].data.results)
    }

    return dadosPersons
}

export const getSpeciesName = async (specieUrl) => {
    var url = specieUrl
    var response = await axios.get(url)
    return response.data.name
}

export const getFilmName = async (filmUrl) => {
    var url = filmUrl
    var response = [];
    var infoFilmes = [];

    for(let i=0; i<filmUrl.length; i++) {
        response.push(await axios.get(url[i]))
        infoFilmes.push([response[i].data.release_date, response[i].data.title])
    }
    
    return infoFilmes;
}

