import React, { Component } from 'react';
import './PluginCard.css'

export class PluginCard extends Component {
    static displayName = PluginCard.name;

    render() {
        console.log(this.props.data);
        const { id, pluginName, monthlyPrice, image } = this.props.data
        const textDecoNone = {
            textDecoration: "none"
        }
        const imageData = image ? image.imageData : "https://via.placeholder.com/344x216.png";
        console.log(imageData);
        return (
            <a style={textDecoNone} className="card plugin" href={"/plugins/" + id }>
                <div className="card-body">
                    <img src={imageData} alt={pluginName} />
                </div>
                <div className="card-footer">
                    <span>{pluginName}</span>
                    <span className="float-end">
                        {/* <span><i className="far fa-sm fa-comment"></i> 123</span> */}
                        <span className="pl-2"> &euro;{monthlyPrice}</span>
                    </span>
                </div>
            </a>
        );
    }
}
