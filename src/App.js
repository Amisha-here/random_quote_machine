import React, { Component } from 'react';
import "./App.css";
import { FaTwitter } from "react-icons/fa";

class App extends Component {
    constructor(props){
        super(props);

        this.state={
            data:null,
            currentquote:'',
            currentauthor:'',
            randomIndex:''
        };
        this.getQuote=this.getQuote.bind(this);
    }

    componentWillMount(){
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.json())
      .then(data => this.setState({ data }, this.getQuote(data)))
    }

    getQuote(data){
        const {quotes}=data;
        const quotesdata=Math.floor(Math.random()*quotes.length);

        this.setState({
            currentquote: quotes[quotesdata].quote,
            currentauthor:quotes[quotesdata].author,
            randomIndex: Math.floor(Math.random() * 12)
        });
    }

    render(){
        const colors=['#16a085',
        '#27ae60',
        '#2c3e50',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        '#342224',
        '#472E32',
        '#BDBB99',
        '#77B1A9',
        '#73A857']
        const { data, currentquote, currentauthor } = this.state;
        const randomcolor = colors[this.state.randomIndex];

        return (
            <div id="wrapper" className="app" style={{backgroundColor: randomcolor}} >
                <div id="quote-box">
                    <div className="quote-text" style={{color: randomcolor}}  >
                        <span id="text">{currentquote}</span>
                    </div>

                    <div className="quote-author" style={{color: randomcolor}} >
                       -{currentauthor} <span id="author"></span>
                    </div>

                    <div className="buttons" style={{backgroundColor: randomcolor}}>
                        <a className="button"
                            id="tweet-quote"
                            href={`https://twitter.com/intent/tweet?text=${currentquote} - ${currentauthor}`}
                            title="Tweet this quote!" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ backgroundColor: randomcolor }}
                        >
                            <FaTwitter />
                        </a>
                        <button className="button" id="new-quote" onClick={()=>this.getQuote(data)} style={{backgroundColor:randomcolor}}  >New Quote</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;