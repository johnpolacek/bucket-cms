import { PageHeading } from "../bucket/src/views/brand"
import TransitionWrapper from "../bucket/src/views/admin/TransitionWrapper"

export default function Contact() {
  return (
    <main>
      <div className="py-12 flex justify-center ">
        <TransitionWrapper>
          <div className="prose max-w-[960px] px-4 pb-16">
            <PageHeading>Terms of Service</PageHeading>
            <p className="text-sm italic -mt-8">Effective Date: October 1, 2023</p>
            <h2 id="1-acceptance-of-terms">1. Acceptance of Terms</h2>
            <p>
              By using Bucket CMS (&quot;the Service&quot;), you agree to be bound by the following terms and conditions (&quot;Terms of Service&quot;). The Service is owned and controlled by [Your
              Company]. These Terms of Service affect your legal rights and obligations. If you do not agree to be bound by all of these Terms of Service, do not access or use the Service.
            </p>
            <h2 id="2-basic-terms">2. Basic Terms</h2>
            <p>
              You are responsible for your use of the Service, for any content you post to the Service, and for any consequences thereof. The Content you submit, post, or display will be able to be
              viewed by other users of the Service and through third party services and websites.
            </p>
            <p>
              You may use the Service only if you can form a binding contract with [Your Company] and are not a person barred from receiving services under the laws of the United States or other
              applicable jurisdiction. You may use the Service only in compliance with these Terms and all applicable local, state, national, and international laws, rules, and regulations.
            </p>
            <h2 id="3-service-usage">3. Service Usage</h2>
            <p>You agree not to engage in any of the following prohibited activities:</p>
            <ul>
              <li>Copying, distributing, or disclosing any part of the Service in any medium, including without limitation by any automated or non-automated &quot;scraping.&quot;</li>
              <li>Using any automated system, including without limitation “robots,” “spiders,” “offline readers,” etc., to access the Service.</li>
              <li>Transmitting spam, chain letters, or other unsolicited email.</li>
              <li>Attempting to interfere with, compromise the system integrity or security or decipher any transmissions to or from the servers running the Service.</li>
              <li>Taking any action that imposes, or may impose at our sole discretion an unreasonable or disproportionately large load on our infrastructure.</li>
              <li>Uploading invalid data, viruses, worms, or other software agents through the Service.</li>
              <li>Impersonating another person or otherwise misrepresenting your affiliation with a person or entity, conducting fraud, hiding or attempting to hide your identity.</li>
              <li>Interfering with the proper working of the Service.</li>
              <li>Accessing any content on the Service through any technology or means other than those provided or authorized by the Service.</li>
            </ul>
            <h2 id="4-content-ownership">4. Content Ownership</h2>
            <p>
              You retain your rights to any Content you submit, post or display on or through the Service. By submitting, posting or displaying Content on or through the Service, you grant us a
              worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such Content in
              any and all media or distribution methods (now known or later developed).
            </p>
            <p>
              You agree that this license includes the right for [Your Company] to provide, promote, and improve the Service and to make Content submitted to or through the Service available to other
              companies, organizations or individuals who partner with [Your Company] for the syndication, broadcast, distribution or publication of such Content on other media and services.
            </p>
            <h2 id="5-data-storage-and-security">5. Data Storage and Security</h2>
            <p>
              All data is stored securely on Amazon S3, and benefits from S3&#39;s foundational security features such as encryption and access controls to prevent unauthorized modifications. The data
              you store with Bucket CMS is yours, and resides in a location you control and trust. You have full freedom to access, modify, and manage your content as you see fit, following the
              guidelines provided by the Service.
            </p>
            <h2 id="6-copyright-policy">6. Copyright Policy</h2>
            <p>
              [Your Company] respects the intellectual property rights of others and expects users of the Service to do the same. We will respond to notices of alleged copyright infringement that
              comply with applicable law and are properly provided to us.
            </p>
            <h2 id="7-changes-to-terms-of-service">7. Changes to Terms of Service</h2>
            <p>
              We may revise these Terms of Service from time to time. The most current version of the Terms will govern our relationship with you. We will notify you of any change to these Terms via
              email to the email address linked to your account or through the Service.
            </p>
            <h2 id="8-miscellaneous">8. Miscellaneous</h2>
            <p>
              These Terms of Service shall be governed by the laws of the state of [Your State, USA], without respect to its conflict of laws principles. Any claim or dispute between you and [Your
              Company] that arises in whole or in part from the Service shall be decided exclusively by a court of competent jurisdiction located in [Your City, Your State, USA].{" "}
            </p>
          </div>
        </TransitionWrapper>
      </div>
    </main>
  )
}
