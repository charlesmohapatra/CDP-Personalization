import React, {useEffect} from "react";
import { AnalyticsBrowser } from "@segment/analytics-next";
import HubspotContactForm from "./components/HubspotForm";
const writeKey = process.env.write_key;
const analytics = AnalyticsBrowser.load({ writeKey: "trt2mhv6rjiqM8rpsRExWM1pBiguWqUm" });
    
const HubspotContactForm = props => {
    const { region, portalId, formId } = props;
    useEffect(() => {
        const script = document.createElement('script');
        script.src='https://js-eu1.hsforms.net/forms/embed/v2.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            // @TS-ignore
            if (window.hbspt) {
                // @TS-ignore
                window.hbspt.forms.create({
                    region: region,
                    portalId: portalId,
                    formId: formId,
                    target: '#hubspotForm',
                    onFormSubmit: () => {
                        const formData = new FormData(form.target);
                        const username = formData.get('username');
                        const email = formData.get('email');
                        const message = formData.get('message');

                        analytics.track('Hubspot Form Submitted', {
                        attributes: {
                            type: 'Contacts',
                            userName: username,
                            email: email,
                            message: message,
                        },
                        });
                    },
                })
            }
        });
    }, []);

    return (
        <div>
            <div id="hubspotForm"></div>
        </div>
    );
};

export default HubspotContactForm;

{/* <script charset="utf-8" type="text/javascript" src="//js-eu1.hsforms.net/forms/embed/v2.js"></script>
<script>
  hbspt.forms.create({
    region: "eu1",
    portalId: "143378670",
    formId: "64549387-8218-4d05-b6c2-2d3dd954dc9f"
  });
</script> */}
