import React, { Component } from 'react';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardImg from 'reactstrap/lib/CardImg';
import { NavMenu } from '../components/NavMenu';
import { Footer } from '../components/Footer';
import axios from 'axios';

const textStyling = {
    color: 'white'
};

const hrStyling = {
    height: "2px",
    opacity: 0.80,
    color: "#edeffc"
};

const SubscribeButtonStyle = {
    background: "#36a9ae linear-gradient(to bottom, #37adb2, #329ca0) !important",
    border: "1px solid #2a8387 !important"
}

function SubscriptionList(props) {

    const subscriptionOptionStyling = {
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "4px",
        boxSizing: "border-box",
        color: "#252a2e",
        cursor: "pointer",
        display: "block",
        fontSize: "17px",
        marginTop: "10px",
        overflow: "hidden",
        padding: "15px",
        textDecoration: "none",
        transition: "all .05s ease-in-out"
    }

    const subscriptionPriceTag = {
        background: "#eee",
        display: "inline-block",
        fontSize: "13px",
        fontWeight: 700,
        marginBottom: "10px",
        padding: "6px 10px",
        pointerEvents: "none",
        position: "relative"
    }

    const subscriptionTitle = {
        fontWeight: 700
    }

    const subscriptionSubTitle = {
        color: "#797874",
        fontSize: "15px",
        marginTop: "10px"
    }

    const { licenseTypes, subscriptionClick, subscribeSubscription } = props;


    const listItems = licenseTypes.map(({ price, name, maxAmount }, i) => {
        return (
            <label data-listnumber={i} onClick={subscriptionClick} key={i} className="subscriptionoption" style={subscriptionOptionStyling} aria-selected={i === 1 ? "false" : "true"}>
                <div className="pricetag" style={subscriptionPriceTag}>
                    <b>€ {price}</b>
                    <span> een maand</span>
                </div>
                <div>
                    <h4 style={subscriptionTitle}>{name}</h4>
                </div>
                <div style={subscriptionSubTitle}>For {maxAmount === 1 ? "a single Figma user" : maxAmount + " Figma users"} </div>
            </label>
        );
    });
    return (
        <div className="col-md-4 col-12">
            {listItems}
            <button onClick={subscribeSubscription} className="btn btn-oneblinq-roze mt-2 col-12" style={SubscribeButtonStyle}>Subscribe</button>
        </div>
    )
}

export default class PluginInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            licenseTypes: [],
            plugin: {
                Id: 0,
                pluginName: "Loading",
                pluginDescription: "Loading",
                price: "Loading"
            },
            selectedSubscription: {},
            pluginId: props.match.params.pluginId
        }
    }

    async componentDidMount() {
        const { data: plugin } = await axios.get(process.env.REACT_APP_API_BACKEND + '/api/v1/Plugin/' + this.state.pluginId)
        const { data: variants } = await axios.get(process.env.REACT_APP_API_BACKEND + `/api/v1/admin/PluginVariant?filter={"pluginId":${plugin.id}}`);
        this.setState({ plugin, licenseTypes: variants, selectedSubscription: variants[0] });
    }

    selectSubscription = async (e) => {
        let elements = document.getElementsByClassName("subscriptionoption");
        for (let i = 0; elements.length > i; i++) {
            if (elements[i].attributes.getNamedItem("aria-selected")) {
                elements[i].attributes.removeNamedItem("aria-selected");
            }
        }

        let selectedNumber = e.target.dataset.listnumber;
        elements[parseInt(selectedNumber)].setAttribute("aria-selected", true);
        this.setState({ selectedSubscription: this.state.licenseTypes[selectedNumber] });
    }

    subscribeSubscription = (e) => {
        console.log(this.state.selectedSubscription);
    }

    render() {
        return (
            <>
                <NavMenu />
                <div className="row p-0 mx-auto logincontainer">

                    <h1 className="row m-0" style={{ color: '#edeffc' }} >{this.state.plugin.pluginName}</h1>
                    <hr style={hrStyling} className="container" />

                    <div className="col-md-8 p-1 col-12">

                        <Card className="order-last">
                            <CardBody className="p-0">
                                <CardImg className="" src="https://www.figma.com/community/plugin/980021361387673169/thumbnail" />

                            </CardBody>
                        </Card>
                        <div className="p-1" style={textStyling} dangerouslySetInnerHTML={{ __html: this.state.plugin.pluginDescription }} />
                    </div>
                    <SubscriptionList subscriptionClick={this.selectSubscription} subscribeSubscription={this.subscribeSubscription} plugin={this.state.plugin} licenseTypes={this.state.licenseTypes} />
                </div>
                <Footer />
            </>
        );
    }
}