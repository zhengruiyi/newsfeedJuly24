import React, {Component} from 'react';
import './App.css';
import Feed from './components/Feed'
import Loader from './components/Loader'
import shuffle from 'shuffle-array'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      loader: <Loader/>,
      fav: ''
    }
    this.randomizer = this.randomizer.bind(this);
    this.fetchArticles = this.fetchArticles.bind(this);
  }

  randomizer() {
    // We want to render a set of six random news headlines from the API data.
    // We can simply use Math.floor() to create a random set of healines, but
    // one side effect is that we get duplicates. Therefore, we use the method below to
    // remove duplicates.
    // let newsFeed = this.state.feed;
    // let tmp = newsFeed.slice(newsFeed);
    // let randomArray = [];
    // // We use a for loop to iterate over the length of the array six time.
    // // Then we grab a random news headline in each iteration, removing duplicates.
    // for (let i = 0; i < newsFeed.length; i++) {
    //   let index = Math.floor(Math.random() * tmp.length);
    //   let removed = tmp.splice(index, 1);
    //   // Since we are only removing one element
    //   randomArray.push(removed[0]);
    // }

    this.setState({
      feed: shuffle(this.state.feed)
    })
    // Set state. When the button is clicked, set the state for randomFeed and the loader.
  }

  fetchArticles(){
    console.log("fetchArticles")
    //SPECIFY-LIFECYCLE-HOOK() {
    // Set your API URL with the API key.
    let url = "https://newsapi.org/v1/articles?source=techcrunch&apiKey=8f7606b8caed437b90851173bdf8223b"
    // We use regex to extra website name.
    let extract = url.match(/source=\=*(.*?)\s*&/).pop();
    // We set site name to state.
    this.setState({site: extract})
    // Fetch data from API

    fetch(url)
    .then( r => r.json() )
    .then( data => this.setState({feed: data.articles }))
  }

  componentDidMount(){
    // this.interval = setInterval(this.fetchArticles, 2000)
    this.fetchArticles()
  }

  componentWillUnmount(){
    // clearInterval(this.interval)
  }


render() {

  let loaderContent = null;
  if (this.state.feed.length === 0){
    loaderContent = <Loader />
  }

  return (
    <div className="App row">
      <div className="col-md-12 hd">
        <h1 className="hd-title">{this.state.site}</h1>
        <h2 className="hd-sub">News Randomizer</h2>
      </div>
      {loaderContent}

      <Feed feed={this.state.feed} onClick={this.randomizer}/>
    </div>
  );
}
}

export default App;
