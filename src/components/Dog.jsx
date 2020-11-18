import React from 'react'


class Dog extends React.Component {
  constructor(props) {
    super(props)
    this.fetchDog = this.fetchDog.bind(this)
    this.newDog = this.newDog.bind(this)
    this.saveData = this.saveData.bind(this)
    this.state = {
      imgSrc:'',
      loading: true,
      result:[],
    }
  }

  async fetchDog() {
    console.log('fetchdog')
    this.setState({loading: true},
      async () => {
        const request = await fetch('https://dog.ceo/api/breeds/image/random')
        const response = await request.json()
        this.setState({
          imgSrc: response.message,
          loading: false,
        })
      })
  }

  shouldComponentUpdate() {
    const { imgSrc } = this.state
    const terrierIncluded = imgSrc.includes('terrier')
    return terrierIncluded ? false : true
  }

  componentDidUpdate() {
    const { imgSrc, result } = this.state
    localStorage.setItem('url', result)
    const raca = imgSrc.split('/')

    if (raca === undefined) {
      return 'raca'
    }
      alert(raca[4])
  }
  
  saveData() {
    const inputName = document.getElementById('dogName')
    const { imgSrc } = this.state

    this.setState(() => ({
      result: [imgSrc, inputName.value],
    }))
  }

  newDog() {
    this.fetchDog()
  }

  componentDidMount() {
    const storedDog = localStorage.getItem('url')
    console.log(storedDog.length)
    if (storedDog.length > 0) {
      storedDog.split(',')
      this.setState(() => ({
        imgSrc: storedDog.split(',')[0],
        loading: false,
      }))
    } else {
      console.log('not stored')
      this.fetchDog()
    }
  }
  render() {
    const { imgSrc, loading } = this.state
    const loadingElement = <span>Loading...</span>
    return(
      <div>
        <h1>Doggy</h1>
        <input placeholder="name it" id="dogName"></input><button onClick={this.saveData}>Save Name</button>
        <button onClick={this.newDog}>Search Dog</button>
      <p>{loading ? loadingElement : <img src={imgSrc} alt="doggy" ></img> }</p>
      </div>
    )
  }
}

export default Dog;