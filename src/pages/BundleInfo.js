import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardImg from 'reactstrap/lib/CardImg';
import { NavMenu } from '../components/NavMenu';
import { Footer } from '../components/Footer';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import React from 'react'
import { useParams } from 'react-router-dom';

const textStyling = {
    color: 'white'
};

const hrStyling = {
    height: "2px ",
    opacity: 0.80,
    color: "#edeffc"
};

const subscriptionOptionStyling = {
    width: '100%',
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "0",
    boxSizing: "border-box",
    color: "#252a2e",
    cursor: "pointer",
    display: "block",
    fontSize: "17px",
    marginTop: "10px",
    overflow: "hidden",
    padding: "15px",
    textDecoration: "none",
    transition: "all .05s ease-in-out",
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

function ProductVariants({ variant, setVariant, variants }) {
    return (
        <RadioGroup value={variant} onChange={setVariant}>
            {variants.map((variant) => (
                <RadioGroup.Option
                    key={variant.id}
                    value={variant}
                    className={({ active, checked }) =>
                        `${checked ? 'selected' : ''}`
                    }
                >
                    {({ active, checked }) => (
                        <>
                            <RadioGroup.Description
                                as="span"
                                className={''}
                            >
                                <label style={subscriptionOptionStyling}>
                                    <div className="pricetag" style={subscriptionPriceTag}>
                                        <b>€ {variant.price}</b>
                                        <span> per maand</span>
                                    </div>
                                    <div>
                                        <h4 style={subscriptionTitle}>{variant.description}</h4>
                                    </div>
                                    <div style={subscriptionSubTitle}>For todo maxamount </div>
                                </label>
                            </RadioGroup.Description>
                        </>
                    )}
                </RadioGroup.Option>
            ))}
        </RadioGroup>
    )
}

export default function BundleInfo() {
    const { bundleId } = useParams();

    const [bundle, setPlugin] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const { data: pluginData } = await axios.get(process.env.REACT_APP_API_BACKEND + '/api/v1/PluginBundle/' + bundleId)
            setPlugin(pluginData)
        }
        fetchData()
    }, [bundleId])

    return (
        <>
            <NavMenu />
            <div className="row p-0 mx-auto container">

                <h1 className="row m-0" style={{ color: '#edeffc' }} >{bundle.pluginName}</h1>
                <hr style={hrStyling} className="container" />

                <div className="col-md-8 p-1 col-12">

                    <Card className="order-last">
                        <CardBody className="p-0">
                            <CardImg className="" src="https:www.figma.com/community/plugin/980021361387673169/thumbnail" />

                        </CardBody>
                    </Card>
                    <div className="p-1" style={textStyling} dangerouslySetInnerHTML={{ __html: bundle.bundleDescription }} />
                </div>
                <div className="col">
                    <form action={process.env.REACT_APP_API_BACKEND + "/api/v1/CheckoutApi/create-checkout-session"} method="POST">
                        <button className="btn btn-oneblinq-roze mt-2 col-12" type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}
