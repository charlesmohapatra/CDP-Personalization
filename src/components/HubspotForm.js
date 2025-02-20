import React, {useEffect} from "react";
    
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
                        window.alert("Form Submitted Successfully");
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
