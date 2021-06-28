import { useState, useEffect, useLayoutEffect } from 'react'
import { getFilmName, getPeoples, getSpeciesName } from '../api';
import { useStyles } from '../theme/theme'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import starWarsImg from '../img/starwars.jpg'



const People = () => {
    const classes = useStyles();
    const [peoples, setPeoples] = useState()
    const [person, setPerson] = useState()
    const [peopleSpecie, setPeopleSpecie] = useState()
    const [personFilms, setPersonFilms] = useState()
    const [exibirComboBox, setExibirComboBox] = useState(false)
    const [exibirDetails, setExibirDetails] = useState(false)
    const [exibirFavoritos, setexibirFavoritos] = useState(false)
    const [favoritos, setFavoritos] = useState()


    const handleConsultar = () => {
        document.getElementById('teste').style.display = 'none'
        setExibirComboBox(true)
        setexibirFavoritos(false)
    }

    const handleFavoritos = () => {
        document.getElementById('teste').style.display = 'none'
        setPerson("")
        setPeopleSpecie("")
        setexibirFavoritos(true)
        setExibirComboBox(false)
        setExibirDetails(false)
        setFavoritos(JSON.parse(localStorage.getItem("Favoritos")))
    }

    const handleCancelar = () => {
        document.getElementById('teste').style.display = 'none'
        setExibirDetails(false)
    }

    const handleSalvar = () => {
        document.getElementById('teste').style.display = 'flex'
        var lista_pessoas = JSON.parse(localStorage.getItem('Favoritos') || '[]');
        lista_pessoas.push(person.name)
        localStorage.setItem("Favoritos", JSON.stringify(lista_pessoas))
    }


    const getSepeciesName = (specie) => {
        getSpeciesName(specie).then((result) => {
            setPeopleSpecie(result)
        });
    }

    const getPersonFilms = (films) => {
        getFilmName(films).then((result) => {
            setPersonFilms(result)
        });
    }

    const handleAutoComplete = (event, value) => {
        setPerson("")
        setPeopleSpecie("")
        setExibirDetails(true)
        for (let i = 0; i < peoples.length; i++) {
            if (peoples[i].name === value) {
                setPerson(peoples[i])
                getSepeciesName(peoples[i].species)
                getPersonFilms(peoples[i].films)
            }
        }
    }

    useEffect(() => {
        getPeoples().then((result) => {
            setPeoples(result)
        });
    }, []);

    return (
        
        <div style={{ 
            backgroundImage: `url(${starWarsImg})`, height: "100vh"
          }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleConsultar()}
                >
                    Consultar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleFavoritos()}
                >
                    Favoritos
                </Button>

            </div>
            <Alert id="teste"
                style={{
                    display: "none",
                    alignItems: "center",
                    justifyContent: "center"

                }}

                severity="success">Personagem salvo ao favoritos com sucesso !</Alert>

            {exibirComboBox ? <div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}

                >
                    <Autocomplete
                        id="combo-box-demo"
                        className={classes.comboBox}
                        options={peoples}
                        getOptionLabel={(option) => option.name}
                        style={{ width: '60%' }}
                        renderInput={(params) => <TextField {...params} label="Personagens" variant="outlined" />}
                        onInputChange={handleAutoComplete}
                    ></Autocomplete>
                </div>
                {exibirDetails ?
                    <div
                        style={{
                            display: "grid",
                            alignItems: "center",
                            justifyContent: "center"
                        }}

                    >
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleSalvar(person.name)
                                }>
                                Salvar
                            </Button>
                            <Button
                                className={classes.meuButton}
                                variant="contained"
                                color="primary"
                                onClick={() => handleCancelar()}
                            >
                                Cancelar
                            </Button>
                        </div>
                        <TextField
                            className={classes.nomeForm}
                            label="Nome"
                            name="nome"
                            value={person.name}
                        />
                        <h1>Informações:</h1>
                        <TextField
                            label="Altura"
                            name="altura"
                            value={person.height}
                        /><br />
                        <TextField
                            label="Peso"
                            name="peso"
                            value={person.mass}
                        /><br />
                        <TextField
                            label="Especie"
                            name="especie"
                            value={person.species != '' ? person.species : 'Human'}
                        /><br />
                        <h1>Filmes:</h1>
                        {personFilms &&
                            personFilms.map((row) => (
                                <li>{row[0]} - {row[1]}</li>
                            ))}
                    </div> : ""}
            </div> : ""}
            {exibirFavoritos ? <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <ul>
                    {favoritos.map((favorito) =>( <li>{favorito}</li>))}
                </ul>
            </div> : ""}
        </div>
    );
};

export default People;