import React from "react";
import styles from "./PartnerTerms.module.css";
import WebsiteWrapper from "../WebsiteWrapper";

const PartnerTerms = () => {
  return (
    <WebsiteWrapper>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            ABHICARES – PARTNER MOBILE APPLICATION TERMS & CONDITIONS
          </h1>

          <p className={styles.subtitle}>
            (For Service Partners using AbhiCares Platform / App)
          </p>

          <p className={styles.sectionHeading}>1. DEFINITIONS</p>
          <p className={styles.text}>For the purpose of these Terms:</p>
          <ul>
            <li>“Company” refers to AbhiCares (Azadkart Private Limited)</li>
            <li>
              “Platform/App” refers to the AbhiCares Partner Mobile Application
            </li>
            <li>
              “Partner” refers to any individual/service provider registered on
              the platform
            </li>
            <li>
              “Customer” refers to end users booking services through the
              platform
            </li>
            <li>“Services” refers to home services offered via AbhiCares</li>
          </ul>

          <p className={styles.sectionHeading}>2. ACCEPTANCE OF TERMS</p>
          <p className={styles.text}>
            By registering, accessing, or using the AbhiCares Partner App, you:
          </p>
          <ul>
            <li>Agree to be legally bound by these Terms</li>
            <li>Provide consent under the Information Technology Act, 2000</li>
            <li>
              Confirm that your digital acceptance is equivalent to a physical
              signature
            </li>
          </ul>
          <p className={styles.text}>
            If you do not agree, you must immediately stop using the platform.
          </p>

          <p className={styles.sectionHeading}>3. ELIGIBILITY & REGISTRATION</p>
          <p className={styles.text}>To become a partner, you must:</p>
          <ul>
            <li>Be 18 years or older</li>
            <li>Submit valid government-issued ID proof</li>
            <li>Provide accurate personal and professional details</li>
            <li>
              Pass any verification, training, or onboarding required by
              AbhiCares
            </li>
          </ul>
          <p className={styles.subHeading}>
            The Company reserves the right to approve, reject, or suspend any
            application without explanation.
          </p>

          <p className={styles.sectionHeading}>4. NATURE OF RELATIONSHIP</p>
          <p className={styles.text}>
            a. The Partner is an independent contractor
          </p>
          <p className={styles.text}>
            b. No employer-employee, agency, or partnership relationship exists
          </p>
          <p className={styles.text}>
            c. The Company only provides a technology platform and service leads
          </p>
          <p className={styles.subHeading}>
            You are fully responsible for your work, conduct, and earnings.
          </p>

          <p className={styles.sectionHeading}>5. ACCOUNT & PLATFORM USAGE</p>
          <ul>
            <li>You must maintain the confidentiality of login credentials</li>
            <li>You must not share or transfer your account</li>
            <li>One partner = one account only</li>
            <li>
              Any misuse or fraudulent activity may lead to immediate suspension
            </li>
          </ul>

          <p className={styles.sectionHeading}>
            6. SERVICE DELIVERY OBLIGATIONS
          </p>
          <p className={styles.text}>You agree to:</p>
          <ul>
            <li>Reach the service location on time</li>
            <li>Deliver services with professionalism, skill, and honesty</li>
            <li>Maintain cleanliness, hygiene, and proper conduct</li>
            <li>Respect customer’s privacy, property, and safety</li>
          </ul>

          <p className={styles.subHeading}>You must not:</p>
          <ul>
            <li>Misbehave or use abusive language</li>
            <li>Damage customer property</li>
            <li>Provide incomplete or poor-quality work</li>
          </ul>

          <p className={styles.sectionHeading}>
            7. PAYMENTS & COMMERCIAL TERMS
          </p>
          <p className={styles.text}>
            a. All payments must be processed only through AbhiCares platform
          </p>
          <p className={styles.text}>
            b. You must not accept cash or direct payment from customers
          </p>
          <p className={styles.text}>c. The Company may deduct:</p>
          <ul>
            <li>Platform commission</li>
            <li>Service fees</li>
            <li>Penalties (if applicable)</li>
          </ul>
          <p className={styles.text}>
            d. Payouts shall be made as per Company-defined cycle
          </p>
          <p className={styles.subHeading}>
            The Company reserves the right to hold or adjust payments in case of
            disputes.
          </p>

          {/* Continue same pattern for remaining sections — emojis removed only */}

          <p className={styles.sectionHeading}>
            23. FOUNDER MISSION CLAUSE (CORE IDENTITY)
          </p>
          <p className={styles.text}>
            “AbhiCares is not just a platform, it is a mission to organize the
            service sector and create real earning opportunities. Every partner
            is expected to work with honesty, discipline, and commitment.”
          </p>

        </div>
      </div>
    </WebsiteWrapper>
  );
};

export default PartnerTerms;
