import React, {Component, useState} from 'react';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardImg from 'reactstrap/lib/CardImg';
import { NavMenu } from '../components/NavMenu';
import { Footer } from '../components/Footer';
import axios from 'axios';

const buttonFontSize = {
    fontSize: '1.5rem'
};

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

function SubscriptionList(props)  {

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

    const { licenseTypes, plugin, subscriptionClick, subscribeSubscription } = props;


    const listItems = licenseTypes.map((licenseType, i) => {
        let priceDecimals = parseFloat(plugin.monthlyPrice * licenseType.maxAmount).toFixed(2);
        return (
            <label data-listnumber={i} onClick={subscriptionClick} key={i} className="subscriptionoption" style={subscriptionOptionStyling} aria-selected={i === 1 ? "false" : "true"}>
                <div className="pricetag" style={subscriptionPriceTag}>
                    <b>€ {priceDecimals}</b>
                    <span> per maand</span>
                </div>
                <div>
                    <h4 style={subscriptionTitle}>{licenseType.typeName}</h4>
                </div>
                <div style={subscriptionSubTitle}>For {licenseType.maxAmount === 1 ? "a single" : licenseType.maxAmount } Figma user</div>
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
        // this.fetchLicenseTypes = this.fetchLicenseTypes.bind(this);
        // this.fetchPluginById = this.fetchPluginById.bind(this);
    }

    async componentDidMount() {
        await axios.get(process.env.REACT_APP_API_BACKEND + '/api/v1/LicenseType').then(response => {
            console.log(response);
            return response.data;
        }).then(data  => {
            this.setState({licenseTypes: data, selectedSubscription: data[0]});
        });
        await axios.get(process.env.REACT_APP_API_BACKEND + '/api/v1/Plugin/' + this.state.pluginId).then(response => {
            console.log(response.data);
            this.setState({ pluginId: response.data.id })
            return response.data;
        }).then(data => this.setState({plugin: data}));
    }

    selectSubscription = async (e) => {
        let elements = document.getElementsByClassName("subscriptionoption");
        for(let i = 0; elements.length > i; i++) {
            if (elements[i].attributes.getNamedItem("aria-selected")) {
                elements[i].attributes.removeNamedItem("aria-selected");
            }
        }

        let selectedNumber = e.target.dataset.listnumber;
        elements[parseInt(selectedNumber)].setAttribute("aria-selected", true);
        this.setState({selectedSubscription: this.state.licenseTypes[selectedNumber]});
    }

    subscribeSubscription = (e) => {
        console.log(this.state);
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
                    {/*<div className="btnholder">*/}
                    {/*    <PluginBuyButton />*/}
                    {/*    <Button style={buttonFontSize} className="m-1 px-4 py-3" variant="outline-light" href="">Add to wishlist</Button>*/}
                    {/*</div>*/}
                </div>
                <Footer />
            </>
        );
    }
}