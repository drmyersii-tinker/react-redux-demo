import React     from 'react';
import ReactDOM  from 'react-dom';
import SearchBar from './components/SearchBar';
import GifList   from './components/GifList';

import request   from 'superagent';

class App extends React.Component
{
    constructor (props)
    {
        super(props);

        this.state = {
            gifs: []
        };

        // fix lexical binding of `this`
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleTermChange (term)
    {
        // url for the Giphy API with the public dev API key
        const url = `https://api.giphy.com/v1/gifs/search?q=${term}&api_key=dc6zaTOxFJmzC`;

        request.get(url, (err, res) =>
        {
            this.setState({
                gifs: res.body.data
            });
        });
    }

    render ()
    {
        return (
            <div>
                <SearchBar onTermChange={this.handleTermChange} />
                <GifList gifs={this.state.gifs} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
