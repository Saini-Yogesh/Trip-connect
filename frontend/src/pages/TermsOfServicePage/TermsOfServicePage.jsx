import React from "react";
import { FileText, Users, Scale, MessageSquare, AlertTriangle } from "lucide-react";
import styles from "./TermsOfServicePage.module.css";

const TermsOfServicePage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className="container">
        <div className={styles.titleSection}>
          <h1>Terms of Service</h1>
          <p>Last updated: June 25, 2026</p>
        </div>

        <div className={`${styles.contentCard} glass-panel`}>
          <div className={styles.section}>
            <h2>
              <FileText size={20} /> 1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the TripConnect platform, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you may not access or use the platform.
            </p>
            <p>
              We reserve the right to review, update, or modify these terms at any time without prior notice. Your continued use of the website or services constitutes your acceptance of the updated terms.
            </p>
          </div>

          <div className={styles.section}>
            <h2>
              <Users size={20} /> 2. User Accounts & Registration
            </h2>
            <p>
              To use most parts of the service, you must register and create a profile. You agree to provide accurate, current, and complete information during registration and keep your profile updated.
            </p>
            <ul className={styles.list}>
              <li>You are responsible for keeping your password secure and for all actions taken under your account.</li>
              <li>You must be at least 18 years old to register and participate in trips.</li>
              <li>We reserve the right to suspend or delete accounts that provide false details or violate community rules.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>
              <Scale size={20} /> 3. Nature of Service & Financial Disclaimers
            </h2>
            <p>
              TripConnect is a social platform designed solely to connect travelers. We are NOT a travel agency, tour operator, booking portal, transport provider, or accommodation host.
            </p>
            <p>
              Any agreements, expense divisions, transport bookings, or villa sharing arrangements are entered into strictly between individual users. TripConnect is not responsible for handling transactions, resolving monetary disputes, or verifying expenses.
            </p>
            <ul className={styles.list}>
              <li>Always clarify budget requirements and division of costs in the group chat before setting off.</li>
              <li>We highly recommend using safe payment methods and keeping record of group expense agreements.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>
              <MessageSquare size={20} /> 4. User Conduct & Standards
            </h2>
            <p>
              You agree to interact with other members in a respectful and safe manner. The following actions are strictly prohibited on the platform:
            </p>
            <ul className={styles.list}>
              <li>Harassment, bullying, hate speech, or discrimination against any user based on race, gender, sexual orientation, or religion.</li>
              <li>Creating false profiles, spamming other users with commercial solicitations, or posting fake trips.</li>
              <li>Sharing illegal materials, violating local regulations, or using the group chat for unrelated business transactions.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>
              <AlertTriangle size={20} /> 5. Limitation of Liability
            </h2>
            <p>
              <strong>Travel at your own risk:</strong> You acknowledge that meeting and traveling with individuals matched through our service carries inherent risks. TripConnect does not perform criminal background checks or verify the character of its users.
            </p>
            <p>
              Under no circumstances shall TripConnect or its affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from your interactions, meetings, or travel arrangements with other members.
            </p>
          </div>

          <div className={styles.footerNote}>
            © {new Date().getFullYear()} TripConnect. All rights reserved. If you have questions about these terms, please contact legal@tripconnect.com.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
