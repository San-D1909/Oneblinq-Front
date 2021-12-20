import React, { Component } from 'react';
import './PluginCard.css'

export class PluginCard extends Component {
    static displayName = PluginCard.name;

    render() {
        const { id, pluginName, monthlyPrice } = this.props.data
        const textDecoNone = {
            textDecoration: "none"
        }
        return (
            <a style={textDecoNone} className="card plugin" href={"/plugins/" + id }>
                <div className="card-body">
                    <img src="https://via.placeholder.com/344x216.png" alt={pluginName} />
                </div>
                <div className="card-footer">
                    <span>{pluginName}</span>
                    <span className="float-end">
                        <span><i className="far fa-sm fa-comment"></i> 123</span>
                        <span className="pl-2"> &euro;{monthlyPrice}</span>
                    </span>
                </div>
            </a>
        );
    }
}
