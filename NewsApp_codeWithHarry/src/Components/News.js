import React, { Component, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import { PropTypes } from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

// import LoadingBar from 'react-top-loading-bar'




export class News extends Component {

  

  // Static variable is the one that is common to all the instances of the class.
  static defaultProps = {
    country: 'in', 
    pageSize: 8, 
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

//   articles = [
//     {
//         "source": {
//             "id": null,
//             "name": "Daily Mail"
//         },
//         "author": "Alyssa Guzman, Carly Johnson",
//         "title": "Actress Estelle Harris, who famously played George Costanza's mother on Seinfeld, passes away at 93 - Daily Mail",
//         "description": "According to her son Glen Harris, the star died of natural causes at her home in Palm Desert, California on Saturday night. She was just weeks away from celebrating her 94th birthday.",
//         "url": "https://www.dailymail.co.uk/tvshowbiz/article-10680559/Actress-Estelle-Harris-famously-played-George-Costanzas-mother-Seinfeld-passes-away-93.html",
//         "urlToImage": "https://i.dailymail.co.uk/1s/2022/04/03/03/56147439-0-image-a-7_1648954740870.jpg",
//         "publishedAt": "2022-04-03T04:12:00Z",
//         "content": "Beloved actress Estelle Harris, who famously played George Costanzas mother Estelle on Seinfeld and voiced Mrs. Potato Head in the animated feature Toy Story, has passed away at the age of 93. Accor… [+3189 chars]"
//     },
//     {
//         "source": {
//             "id": null,
//             "name": "The Guardian"
//         },
//         "author": "Martin Farrer",
//         "title": "Russia-Ukraine war: what we know on day 39 of the Russian invasion - The Guardian",
//         "description": "Russian retreat reveals evidence of execution of civilians and mass graves; Kremlin ‘accepts’ Ukraine’s position on all issues bar Crimea",
//         "url": "https://amp.theguardian.com/world/2022/apr/03/russia-ukraine-war-what-we-know-on-day-39-of-the-russian-invasion",
//         "urlToImage": "https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1435,w_2551,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1648958045/SNL_mygini",
//         "publishedAt": "2022-04-03T03:42:00Z",
//         "content": "<li>Ukrainian troops have retaken the entire Kyiv region, but they have discovered widespread evidence of what the Kyiv government says are war crimes committed by Russian forces. This includes bodie… [+3401 chars]"
//     },
//     {
//         "source": {
//             "id": "bloomberg",
//             "name": "Bloomberg"
//         },
//         "author": null,
//         "title": "Russia-Ukraine Latest News: April 2, 2022 - Bloomberg",
//         "description": "Police in Santa Barbara declared a 'multi casualty incident' in Isla Vista where a raucous college Spring Break party Deltopia is underway. Santa Barbara County Sheriff's office made three arrests Friday.",
//         "url": "https://www.bloomberg.com/tosv2.html?vid=&uuid=1adb14ce-b31b-11ec-9198-586c644a5454&url=L25ld3MvYXJ0aWNsZXMvMjAyMi0wNC0wMi91a3JhaW5lLXVwZGF0ZS11LXMtc2VuZGluZy1hZGRpdGlvbmFsLW1pbGl0YXJ5LWFpZC10by1reWl2",
//         "urlToImage": "https://sportshub.cbsistatic.com/i/r/2022/04/03/c4c04265-2764-41c3-a544-5a6cba694709/thumbnail/1200x675/fd985346f655ce28fe811ab4711cbf88/heels.jpg",
//         "publishedAt": "2022-04-03T05:02:00Z",
//         "content": "To continue, please click the box below to let us know you're not a robot."
//     },
//     {
//         "source": {
//             "id": null,
//             "name": "CBS Sports"
//         },
//         "author": "Brent Brookhouse",
//         "title": "2022 WWE WrestleMania 38 results, Night 1 grades: Steve Austin wrestles surprise match, Cody Rhodes returns - CBS Sports",
//         "description": "Bianca Belair and Becky Lynch stole the show but Austin provided a lasting memory",
//         "url": "https://www.cbssports.com/wwe/news/2022-wwe-wrestlemania-38-results-night-1-grades-steve-austin-wrestles-surprise-match-cody-rhodes-returns/live/",
//         "urlToImage": "https://sportshub.cbsistatic.com/i/r/2022/04/03/7087246f-f751-4f44-8286-ba20116b802b/thumbnail/1200x675/73136cdc20336d08b497b740d2cace1d/steve-austin-kevin-owens-wrestlemania-wwe.jpg",
//         "publishedAt": "2022-04-03T04:19:35Z",
//         "content": "An already wild Night 1 of WrestleMania hit an entirely new gear in the final segment of the show when Steve Austin's appearance on Kevin Owens' turned into an impromptu No Holds Barred mat… [+11337 chars]"
//     }
// ]

  constructor(props){
    super(props);
    console.log("constructor called")

    // const [articles, setArticles] = useState([])
    // const [loading, serLoading] = useState(false)
    // const [page, serPage] = useState('1')
    // const [totalResults, serTotalResults] = useState('0')

    this.state = {
      articles : [], 
      loading : false, 
      page: 1 ,      // &page=1 shows the json file available for page 1 
      totalResults: 0 // by default
    }

    const captalize = (string)=>{
      return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
    }

    // the props send in constructor are only for
    document.title = `NewsMonkey-${captalize(this.props.category)}`

  }

  // const updateNews = ()=>{

  // }

  async updateNews (){
    this.props.setProgress(10)
    console.log("CDM")
    // how beautifully we played with the url with adding multiple functionality we take &
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    this.props.setProgress(50)
    let data = await fetch(url)     // fetch api returns a promise await for that promise to resolve
    let parsedData = await data.json()
    this.props.setProgress(70)
    console.log(parsedData)
    this.setState({
      articles : parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })  
    this.props.setProgress(100)
    
  }

  // useEffect(() => {
  //   first
  
  //   return () => {
  //     second(cleanup)
  //   }
  // }, [third/input])   // input--> jiske change pr ye chiz run ho

  // useEffect(() => {
  //   // effect ==> what to mount
  //   updateNews()
    
  // }, [])
  
  

  async componentDidMount(){
    // console.log("CDM")
    // // how beautifully we played with the url with adding multiple functionality we take &
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=317e390ae6524c8e80026de9c473e30e&page=1&pageSize=${this.props.pageSize}`
    // this.setState({loading: true})
    // let data = await fetch(url)     // fetch api returns a promise await for that promise to resolve
    // let parsedData = await data.json()
    // console.log(parsedData)
    // this.setState({
    //   articles : parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })    
    this.updateNews(); 
  }

  // handlePreClick = async ()=>{
    
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=317e390ae6524c8e80026de9c473e30e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`

  //   let data = await fetch(url)     // fetch api returns a promise await for that promise to resolve
  //   this.setState({loading: true})
  //   let parsedData = await data.json()
  //   console.log(parsedData)
  //   this.setState({ 
  //     page: this.state.page-1, 
  //     articles : parsedData.articles,
  //     loading: false
  // })
  // // this.updateNews();
  // // this.setState({page: this.state.page+1})
  
    
  // }
  // handleNextClick = async ()=> {

  //   console.log("Next")
  //   if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=317e390ae6524c8e80026de9c473e30e&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
  //     this.setState({loading: true})
  //     let data = await fetch(url)     // fetch api returns a promise await for that promise to resolve
  //     let parsedData = await data.json()
  //     this.setState({loading: false})
  //     console.log(parsedData)
      
  //     this.setState({ 
  //       page: this.state.page+1, 
  //       articles : parsedData.articles
  //   })

  // }
  // // this.updateNews();
  // // this.setState({page: this.state.page-1})
  // }

  fetchMoreData = async() => {
   this.setState({page: this.state.page + 1})
   console.log("CDM")
    // how beautifully we played with the url with adding multiple functionality we take &
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=317e390ae6524c8e80026de9c473e30e&page=${this.state.page}&pageSize=${this.props.pageSize}`
    // this.setState({loading: true}) 
    let data = await fetch(url)     // fetch api returns a promise await for that promise to resolve
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      articles : this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false
    }) 
   
  };





  render() {
    console.log("render method")
    return (
      <div className='container my-3' style={{position:'relative'}}>
        <h2 style={{marginTop:'80px'}} className='text-center'>NewsMonkey-Top Headlines <strong>- {(this.props.category)}</strong></h2>

        {/* {this.state.loading && <Spinner />} */}


          {/* {this.state.articles.map((article)=>{console.log(article)})} */}
          
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className='row'>

          {/* { !this.state.loading && this.state.articles.map((element)=>{ */}
          {this.state.articles.map((element)=>{
            // a unique key must be given while using map 
            return <div className='col-md-4' key={element.url}>
            < NewsItem  title = {element.title} description = {element.description} 
            imageurl = {element.urlToImage} newUrl = {element.url}
            author = {!element.author === null? 'unknown' : element.author}  date = {element.publishedAt} 
            source = {element.source.name} />
            </div>
          })}
  
          </div>
         </InfiniteScroll>

          {/* <div className="container">
          <div className="d-flex justify-content-between">
          <button disabled= {this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
          <button disabled= {this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
          
          </div> */}
        
      </div>
    )
  }
}

export default News