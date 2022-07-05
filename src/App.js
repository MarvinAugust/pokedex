import axios from 'axios';
import React from 'react';
import Page from './components/Page'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      pic: "",
      name: '',
      height: '',
      weight: '',
      type: '',
    }
  }


  componentDidMount() {
    const URL = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
    axios(URL).then(reponse => {
      const pokemons = reponse.data.results;
      pokemons.forEach(pokemon => {
        axios(pokemon.url).then((reponse) => {
          let newPokemons = [...this.state.pokemons];
          const pokemonDetail = reponse.data
          newPokemons.push(pokemonDetail)
          this.setState({
            pokemons: newPokemons,
          })

        });
      })
    })
  }
  getPoke = (pokemon) => {
    const URL2 = 'https://pokeapi.co/api/v2/pokemon/' + pokemon.name;
    axios(URL2).then((resultat) => {
      // console.log(resultat);
      const poke = resultat.data;
      const pic = poke.sprites.other.dream_world.front_default;
      const name = poke.name;
      const height = poke.height;
      const weight = poke.weight;
      const type = poke.types;
      this.setState({
        poke: poke,
        pic: pic,
        name: name,
        height: height,
        weight: weight,
        type: type
      });
      console.log(poke.types)
    })
  }
  getWeight = () => {
    weight = 0
    if (this.state.weight) {
      var weight = this.state.weight
      weight = weight.toString()
      var array = weight.split('')
      var indexAvantDernier = array.length - 1
      array.splice(indexAvantDernier, 0, ",")
      var newArray = array.join('')
      weight = newArray
    }
    return weight
  }
  render() {

    console.log(this.state.poke)

    return (
      <>
        {/* <h2>Pokemon</h2> */}
        <div className="cards">
          <header>
            <p><img src={this.state.pic} height="300px" /></p>
            <div className="stats">
              <p className="name">{this.state.name}</p>
              <p>Height: {this.state.height} cm</p>
              <p>Weight: {this.getWeight()} kg</p>
              {this.state.poke?this.state.poke.types.map(type=>{  
                // console.log(type.type.name)
                  return <p>Type: {type.type.name}</p>
              }):null}
            </div>
          </header>
          {/* <SwitchPoke /> */}
          {
            this.state.pokemons.map((pokemon, index) => {
              return (
                <div className="wrapper" onClick={() => this.getPoke(pokemon)} key={index + pokemon.name}>
                  <p className="pic">
                    <img src={pokemon.sprites.front_default} height="180px" /></p>
                  <p className="poke">{pokemon.name}
                  </p>
                </div>
              )
            })
          }
          
        </div>
      </>
    )
  }
}