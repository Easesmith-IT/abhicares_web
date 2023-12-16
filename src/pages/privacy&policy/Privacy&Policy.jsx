import { useNavigate } from "react-router";
import WebsiteWrapper from "../WebsiteWrapper"
import classes from "./Privacy&Policy.module.css"

const PrivacyPolicy = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("adUx")
  
    if(!token){
      navigate('/admin/login');
      return;
    }
    return (
        <WebsiteWrapper>
            <section className={classes.privacy_policy}>
                <div className={classes.heading_div}>
                    <h1 className={classes.heading}>Privacy Policy</h1>
                </div>

                <div className={classes.wrapper}>
                    <div className={classes.container}>
                        <h3 className={classes.h3}>Privacy Policy</h3>
                        <p className={classes.p}>Welcome to AbhiCares's privacy policy (<strong>"Privacy Policy"</strong> or <strong>"Policy"</strong>).</p>

                        <p className={classes.p}><b>Azadkart Private Limited</b> and its affiliates
                            (collectively, <b>"AbhiCares"</b>, <b>"we"</b> or <b>"us"</b>)
                            are engaged in the business of providing web-based solutions to
                            facilitate connections between customers that seek specific
                            services and service professionals that offer these services.
                            This Policy outlines our practices in relation to the
                            collection, storage, usage, processing, and disclosure of
                            personal data that you have consented to to share with us when
                            you access, use, or otherwise interact with our website
                            available at https://www.AbhiCares.com/or mobile application
                            'AbhiCares' (collectively, <b>"Platform"</b>) or avail products
                            or
                            services that <b>AbhiCares</b> offers you on or through the
                            Platform
                            (collectively, the <b>"Services"</b>). In this Policy, the
                            services
                            offered to you by service professionals on or through the
                            Platform are referred to as <b>"Professional Services"</b>.
                        </p>

                        <p className={classes.p}>At <b>AbhiCares</b>, we are committed to protecting your personal
                            data and respecting your privacy. In order to provide you with
                            access to the Services or the Professional Services, we have to
                            collect and otherwise process certain data about you. This
                            Policy explains how we process and use personal data about you.
                            Please note that unless specifically defined in this Policy,
                            capitalised terms shall have the same meaning ascribed to them
                            in our Terms and Conditions, available at
                            https://www.abhicares.com/terms("Terms"). Please read this
                            Policy in consonance with the Terms. By using the Services, you
                            confirm that you have read and agree to be bound by this Policy
                            and consent to the processing activities described under this
                            Policy. Please refer to Section 1 to understand how the terms of
                            this Policy apply to you.
                        </p>

                        <div>
                            <ol>
                                <li className={classes.bold}> BACKGROUND AND KEY INFORMATION
                                    <ol type="a">
                                        <li>

                                            <b>How this Policy applies:</b>
                                            <p className={classes.p}>This Policy applies to
                                                individuals who access
                                                or use the Services or otherwise avail the
                                                Professional Services. For the avoidance of
                                                doubt, references to <b>"you"</b> across
                                                this Policy are to an end user that uses the
                                                Platform. By using the Platform, you consent
                                                to the collection, storage, usage, and
                                                disclosure of your personal data, as
                                                described in and collected by us in
                                                accordance with this Policy.</p>
                                        </li>

                                        <li>

                                            <b>Review and Updates:</b>
                                            <p className={classes.p}>We regularly review and update our Privacy
                                                Policy, and we request you to regularly
                                                review this Policy. It is important that the
                                                personal data we hold about you is accurate
                                                and current. Please let us know if your
                                                personal data changes during your
                                                relationship with us.</p>
                                        </li>
                                        <li>

                                            <b>Third-Party Services:</b>
                                            <p className={classes.p}>The Platform may include links to third-party
                                                websites, plug-ins, services, and
                                                applications ("Third-Party Services").
                                                Clicking on those links or enabling those
                                                connections may allow third parties to
                                                collect or share data about you. We neither
                                                control nor endorse these Third-Party
                                                Services and are not responsible for their
                                                privacy statements. When you leave the
                                                Platform or access third-party links through
                                                the Platform, we encourage you to read the
                                                privacy policy of such third-party service
                                                providers.</p>
                                        </li>

                                    </ol>
                                </li>

                                <li className={classes.bold}> PERSONAL DATA THAT WE COLLECT
                                    <ol type="a">
                                        <li>We collect different types of personal data
                                            about you. This includes, but is not limited to:
                                            <ol type="i">
                                                <li><b>Contact Data</b>, such as your
                                                    mailing or home address, location, email
                                                    addresses, and mobile numbers.</li>

                                                <li><b>Identity and Profile Data</b>, such
                                                    as your name, username or similar
                                                    identifiers, photographs, and gender.</li>

                                                <li><b> Marketing and Communications Data</b>,
                                                    such as your address, email address,
                                                    information posted in service requests,
                                                    offers, wants, feedback, comments,
                                                    pictures and discussions in our blog and
                                                    chat boxes, responses to user surveys
                                                    and polls, your preferences in receiving
                                                    marketing communications from us and our
                                                    third parties, and your communication
                                                    preferences. We also collect your chat
                                                    and call records when you communicate
                                                    with service professionals through the
                                                    Platform.</li>

                                                <li><b>Technical Data</b>, which includes
                                                    your IP address, browser type, internet
                                                    service provider, details of operating
                                                    system, access time, page views, device
                                                    ID, device type, frequency of visiting
                                                    our website and use of the Platform,
                                                    website and mobile application activity,
                                                    clicks, date and time stamps, location
                                                    data, and other technology on the
                                                    devices that you use to access the
                                                    Platform.</li>

                                                <li><b>Transaction Data</b>, such as details
                                                    of the Services or Professional Services
                                                    you have availed, a limited portion of
                                                    your credit or debit card details for
                                                    tracking transactions that are provided
                                                    to us by payment processors, and UPI IDs
                                                    for processing payments.</li>

                                                <li> <b>Usage Data</b>, which includes
                                                    information about how you use the
                                                    Services and Professional Services, your
                                                    activity on the Platform, booking
                                                    history, user taps and clicks, user
                                                    interests, time spent on the Platform,
                                                    details about user journey on the mobile
                                                    application, and page views.</li>
                                            </ol>
                                        </li>

                                        <li><b>We also collect</b>, use, and share
                                            aggregated data such as statistical or
                                            demographic data for any purpose. Aggregated
                                            data could be derived from your personal data
                                            but is not considered personal data under law as
                                            it does not directly or indirectly reveal your
                                            identity. However, if we combine or connect
                                            aggregated data with your personal data so that
                                            it can directly or indirectly identify you, we
                                            treat the combined data as personal data which
                                            will be used in accordance with this Policy.</li>

                                        <li>
                                            <b>What happens if I refuse to provide my
                                                personal data?</b>
                                            <p>Where we need to collect personal data by
                                                law, or under the terms of a contract (such
                                                as the Terms), and you fail to provide that
                                                data when requested, we may not be able to
                                                perform the contract (for example, to
                                                provide you with the Services). In this
                                                case, we may have to cancel or limit your
                                                access to the Services.</p>
                                        </li>
                                    </ol>
                                </li>

                                <li className={classes.bold}>HOW DO WE COLLECT PERSONAL DATA?
                                    <p className={classes.p}>We use different methods to collect personal data
                                        from and about you including through:</p>
                                    <ol type="a">
                                        <li><b>Direct Interactions.</b> You provide us your
                                            personal data when you interact with us. This
                                            includes personal data you provide when you:
                                            <ol type="i">
                                                <li> create an account or profile with us;</li>
                                                <li>use our Services or carry out other
                                                    activities in connection with the
                                                    Services;</li>
                                                <li> enter a promotion, user poll, or online
                                                    surveys;</li>
                                                <li> request marketing communications to be
                                                    sent to you; or</li>
                                                <li>report a problem with the Platform
                                                    and/or our Services, give us feedback or
                                                    contact us.</li>
                                            </ol>
                                        </li>

                                        <li>
                                            <b> Automated technologies or interactions.</b>Each
                                            time you visit the Platform or use the Services,
                                            we will automatically collect Technical Data
                                            about your equipment, browsing actions, and
                                            patterns. We collect this personal data by using
                                            cookies, web beacons, pixel tags, server logs,
                                            and other similar technologies. We may also
                                            receive Technical Data about you if you visit
                                            other websites or apps that employ our cookies.
                                        </li>
                                        <li>Third parties or publicly available sources. We
                                            will receive personal data about you from
                                            various third parties:
                                            <ol type="i">
                                                <li>Technical data from analytics providers
                                                    such as Facebook and advertising
                                                    networks;</li>
                                                <li>Identity and profile-related Data and
                                                    Contact Data from service professionals,
                                                    publicly available sources, etc.</li>
                                                <li>Personal data about you from our
                                                    affiliate entities.</li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>

                                <li className={classes.bold}>HOW DO WE USE YOUR PERSONAL DATA?
                                    <ol type="a">
                                        <li>We will only use your personal data when the law
                                            allows us to. Most commonly, we will use your
                                            personal data where we need to provide you with
                                            the Services, enable you to use the Professional
                                            Services, or where we need to comply with a
                                            legal obligation. We use your personal data for
                                            the following purposes:
                                            <ol type="i">
                                                <li>to verify your identity to register you
                                                    as a user, and create your user account
                                                    with us on the Platform;</li>

                                                <li> to provide the Services to you;</li>
                                                <li>to enable the provision of Professional
                                                    Services to you;

                                                </li>
                                                <li>to monitor trends and personalise your
                                                    experience;</li>
                                                <li>to improve the functionality of our
                                                    Services based on the information and
                                                    feedback we receive from you;</li>
                                                <li> to improve customer service to
                                                    effectively respond to your Service
                                                    requests and support needs;</li>

                                                <li>to track transactions and process
                                                    payments;</li>

                                                <li>to send periodic notifications to manage
                                                    our relationship with you including to
                                                    notify you of changes to the Services,
                                                    send you information and updates
                                                    pertaining to the Services you have
                                                    availed, and to receive occasional
                                                    company news and updates related to us
                                                    or the Services;</li>
                                                <li>to assist with the facilitation of the
                                                    Professional Services offered to you,
                                                    including to send you information and
                                                    updates about the Professional Services
                                                    you have availed;</li>
                                                <li> to market and advertise the Services to
                                                    you;</li>
                                                <li>to comply with legal obligations;</li>
                                                <li>to administer and protect our business
                                                    and the Services, including for
                                                    troubleshooting, data analysis, system
                                                    testing, and performing internal
                                                    operations;</li>
                                                <li>to improve our business and delivery
                                                    models;</li>
                                                <li>to perform our obligations that arise
                                                    out of the arrangement we are about to
                                                    enter or have entered with you;</li>
                                                <li>to enforce our Terms; and</li>
                                                <li>to respond to court orders, establish or
                                                    exercise our legal rights, or defend
                                                    ourselves against legal claims.</li>
                                            </ol>
                                        </li>

                                        <li>
                                            You agree and acknowledge that by using our
                                            Services and creating an account with us on the
                                            Platform, you authorise us, our service
                                            professionals, associate partners, and
                                            affiliates to contact you via email, phone, or
                                            otherwise. This is to provide the Services to
                                            you and ensure that you are aware of all the
                                            features of the Services and for related
                                            purposes.
                                        </li>

                                        <li>You agree and acknowledge that any and all
                                            information pertaining to you, whether or not
                                            you directly provide it to us (via the Services
                                            or otherwise), including but not limited to
                                            personal correspondence such as emails,
                                            instructions from you, etc., may be collected,
                                            compiled, and shared by us in order to render
                                            the Services to you. This may include but not be
                                            limited to service professionals who provide or
                                            seek to provide you with Professional Services,
                                            vendors, social media companies, third-party
                                            service providers, storage providers, data
                                            analytics providers, consultants, lawyers, and
                                            auditors. We may also share this information
                                            with other entities in the Azadkart(abhiCares)
                                            group in connection with the above-mentioned
                                            purposes.</li>

                                        <li>You agree and acknowledge that we may share data
                                            without your consent, when it is required by law
                                            or by any court or government agency or
                                            authority to disclose such information. Such
                                            disclosures are made in good faith and belief
                                            that it is reasonably necessary to do so for
                                            enforcing this Policy or the Terms, or in order
                                            to comply with any applicable laws and
                                            regulations.</li>
                                    </ol>
                                </li>

                                <li className={classes.bold}>COOKIES
                                    <ol type="a">
                                        <li>Cookies are small files that a site or its
                                            service provider transfers to your device's hard
                                            drive through your web browser (if you permit it
                                            to) that enables the sites or service providers'
                                            systems to recognise your browser and capture
                                            and remember certain information.</li>

                                        <li>We use cookies to help us distinguish you from
                                            other users of the Platform, understand and save
                                            your preferences for future visits, keep track
                                            of advertisements and compile aggregate data
                                            about site traffic and site interaction so that
                                            we can offer you a seamless user experience. We
                                            may contact third-party service providers to
                                            assist us in better understanding our site
                                            visitors. These service providers are not
                                            permitted to use the information collected on
                                            our behalf except to help us conduct and improve
                                            our business.</li>

                                        <li>Additionally, you may encounter cookies or other
                                            similar devices on certain pages of the Platform
                                            that are placed by third parties. We do not
                                            control the use of cookies by third parties. If
                                            you send us personal correspondence, such as
                                            emails, or if other users or third parties send
                                            us correspondence about your activities or
                                            postings on the Platform, we may collect such
                                            information within a file specific to you.</li>
                                    </ol>
                                </li>

                                <li className={classes.bold}>
                                    DISCLOSURES OF YOUR PERSONAL DATA
                                    <ol type="a">
                                        <li>We may share your personal data with third
                                            parties set out below for the purposes set out
                                            in Section 4:
                                            <ol type="i">
                                                <li>Service professionals to enable them to
                                                    provide you with Professional Services;</li>
                                                <li>Internal third parties, which are other
                                                    companies within the AbhiCares
                                                    (Azadkart) group of companies.

                                                </li>

                                                <li> External third parties such as: trusted
                                                    third parties such as our associate
                                                    partners, and service providers that
                                                    provide services for us or on our
                                                    behalf. This includes hosting and
                                                    operating our Platform, providing
                                                    marketing assistance, conducting our
                                                    business, processing payments and
                                                    transaction-related processes,
                                                    transmitting content, and providing our
                                                    Services to you, analytic service
                                                    providers and advertising networks that
                                                    conduct web analytics for us to help us
                                                    improve the Platform. These analytics
                                                    providers may use cookies and other
                                                    technologies to perform their services
                                                    other registered users on our Platform
                                                    upon your request or where you
                                                    explicitly consent to such disclosure;
                                                    and regulators and other bodies, as
                                                    required by law or regulation.</li>

                                                <li>We require all third parties to respect
                                                    the security of your personal data and
                                                    to treat it in accordance with the law.
                                                    We do not allow our third-party service
                                                    providers to use your personal data for
                                                    their own purposes and only permit them
                                                    to process your personal data for
                                                    specified purposes and in accordance
                                                    with our instructions.

                                                </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>

                                <li className={classes.bold}>
                                    YOUR RIGHTS IN RELATION TO YOUR PERSONAL DATA
                                    <ol type="a">
                                        <li>Access and Updating your Personal Data: You
                                            hereby warrant that all personal data that you
                                            provide us with is accurate, up-to-date, and
                                            true. When you use our Services, we make best
                                            efforts to provide you with the ability to
                                            access and correct inaccurate or deficient data,
                                            subject to any legal requirements. You can
                                            request AbhiCares for a copy of your personal
                                            data by sending an email to
                                            support@abhicares.com. AbhiCares may take up to
                                            7 (seven) working days respond to such request.</li>

                                        <li>Opting-out of Marketing and Promotional
                                            Communications: When we send you marketing and
                                            promotional content through email, we make best
                                            efforts to provide you with the ability to
                                            opt-out of such communications by using the
                                            opt-out instructions provided in such emails.
                                            You understand and acknowledge that it may take
                                            us up to 10 (Ten) business days to give effect
                                            to your opt-out request. Please note that we may
                                            still send you emails about your user account or
                                            any Services you have requested or received from
                                            us.</li>
                                    </ol>
                                </li>

                                <li className={classes.bold}>
                                    DELETION OF ACCOUNT AND PERSONAL DATA
                                    <ol type="a">
                                        <li> Not withstanding anything contained in the
                                            Terms, you may delete your account as well as
                                            your personal data stored with AbhiCares by
                                            sending an email to support@abhiCares.com.
                                            AbhiCares may take up to 7 (seven) working days
                                            to process your request. Once your account is
                                            deleted, you will lose access to all Services.
                                            For avoidance of doubt, it is hereby clarified
                                            that all data with respect to transactions
                                            performed by you on the Platform will be
                                            retained in accordance with applicable law.</li>
                                    </ol>
                                </li>

                                <li className={classes.bold}>
                                    TRANSFERS OF YOUR PERSONAL DATA

                                    <ol type="a">
                                        <li>We comply with applicable laws in respect of
                                            storage and transfers of personal data. As a
                                            part of your use of the Services, the
                                            information and personal data you provide to us
                                            may be transferred to and stored in countries
                                            other than the country you are based in. This
                                            may happen if any of our servers are from time
                                            to time located in a country other than the one
                                            you are based, or one of our vendors, partners,
                                            or service providers is located in a country
                                            other than one you are based in.</li>

                                        <li> By submitting your information and personal
                                            data to us, you agree to the transfer, storage,
                                            and processing of such information and personal
                                            data in the manner described above.</li>
                                    </ol>
                                </li>

                                <li className={classes.bold}>
                                    DATA SECURITY
                                    <ol type="a">
                                        <li>We implement appropriate security measures and
                                            privacy-protective features on our Platform
                                            including encryption, password protection, call
                                            masking, and physical security measures to
                                            protect your personal data from unauthorised
                                            access and disclosure, and follow standards
                                            prescribed by applicable law.</li>

                                        <li>Where you have chosen a password that enables
                                            you to access certain parts of the Services or
                                            Professional Services, you are responsible for
                                            keeping this password secret and confidential.
                                            We will not be responsible for any unauthorised
                                            use of your information, or for any lost,
                                            stolen, or compromised passwords, or for any
                                            activity on your user account due to such
                                            unauthorised disclosure of your password. In the
                                            event your password has been compromised in any
                                            manner whatsoever, you should promptly notify us
                                            to enable us to initiate a change of password.</li>
                                    </ol>
                                </li>

                                <li className={classes.bold}>
                                    DATA RETENTION
                                    <ol type="a">
                                        <li>
                                            You agree and acknowledge that your personal
                                            data will continue to be stored and retained by
                                            us for as long as necessary to fulfil our stated
                                            purpose(s) and for a reasonable period after the
                                            termination of your account on the Platform or
                                            access to the Services to comply with our legal
                                            rights and obligations.

                                        </li>

                                        <li>
                                            In some circumstances, we may aggregate your
                                            personal data (so that it can no longer be
                                            associated with you) for research or statistical
                                            purposes, in which case we may use this
                                            information indefinitely without further notice
                                            to you.
                                        </li>
                                    </ol>
                                </li>

                                <li className={classes.bold}>
                                    BUSINESS TRANSITIONS
                                    <p className={classes.p}>You are aware that in the event we go through a
                                        business transition, such as a merger, acquisition
                                        by another organisation, or sale of all or a portion
                                        of our assets, your personal data might be among the
                                        assets transferred.</p>
                                </li>

                                <li className={classes.bold}>USER GENERATED CONTENT
                                    <p className={classes.p}>We invite you to post content on our Platform,
                                        including your comments, feedback, pictures, or any
                                        other information that you would like to be made
                                        available on our Platform. Please note that such
                                        content will be available to all visitors to our
                                        Platform and may become public. We cannot prevent
                                        such information from being used in a manner that is
                                        contrary to this Policy, applicable laws, or your
                                        personal privacy, and we disclaim all liability
                                        (express or implied) in this regard. Further, you
                                        agree to comply with all applicable laws in relation
                                        to the content uploaded or otherwise shared by you
                                        on our Platform. You understand and acknowledge that
                                        you will be solely responsible for any information
                                        published by you on our Platform that violates
                                        applicable laws.</p>
                                </li>

                                <li className={classes.bold}>UPDATES TO THIS POLICY
                                    <ol type='a'>
                                        <li>We may occasionally update this Policy. If we
                                            make changes to this Policy, we will upload the
                                            revised policy on the Platform or share it with
                                            you through other means, such as email. To the
                                            extent permitted under applicable law, by using
                                            our Platform after such notice, you consent to
                                            updates made to this Policy.</li>

                                        <li>
                                            We encourage you to periodically review this
                                            Policy for the latest information on our privacy
                                            practices.
                                        </li>
                                    </ol>
                                </li>

                                <li className={classes.bold}>
                                    GRIEVANCE OFFICER
                                    <p className={classes.p}>If you have any questions about this Policy, how we
                                        process or handle your personal data, or otherwise,
                                        you may reach out to us, with your queries,
                                        grievances, feedback, and

                                        comments at support@abhicares.com or contact our
                                        grievance officer whose contact details are provided
                                        below:</p>
                                    <p className={classes.p}>Grievance Officers</p>
                                    <p className={classes.p}>Name: Abhimanyu kumar azad</p>
                                    <p className={classes.p}>Designation: Director</p>
                                    <p className={classes.p}>Email: support@abhicares.com</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section >
        </WebsiteWrapper>
    )
}

export default PrivacyPolicy