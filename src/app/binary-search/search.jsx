import React, {Component} from 'react';
import Result from "./result";
import SearchVisualization from "./search-visualization";

class Search extends Component {
    render() {
        return (
            <div className="space-y-8 p-4 max-w-6xl mx-auto">
                <SearchVisualization 
                    upper={this.props.upper}
                    lower={this.props.lower}
                    max={this.props.max}
                    yesButton={this.props.yesButton}
                    noButton={this.props.noButton}
                    onRestart={this.props.onRestart}
                />
            </div>
        );
    }

}

export default Search;