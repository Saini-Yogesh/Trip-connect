import React from "react";
import { Shield, Lock, Eye, Database, HelpCircle } from "lucide-react";
import styles from "./PrivacyPolicyPage.module.css";

const PrivacyPolicyPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className="container">
        <div className={styles.titleSection}>
          <h1>Privacy Policy</h1>
          <p>Last updated: June 25, 2026</p>
        </div>

        <div className={`${styles.contentCard} glass-panel`}>
          <div className={styles.section}>
            <h2>
              <Shield size={20} /> 1. Introduction
            </h2>
            <p>
              Welcome to TripConnect. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact our support team.
            </p>
            <p>
              When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
            </p>
          </div>

          <div className={styles.section}>
            <h2>
              <Database size={20} /> 2. Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide to us when registering on the platform, expressing an interest in obtaining information about us or our products, or otherwise participating in activities on our services.
            </p>
            <p>The personal information we collect depends on the context of your interactions with us, and may include:</p>
            <ul className={styles.list}>
              <li><strong>Profile Information:</strong> Name, email address, password, age, gender, city/location, bio, and profile image.</li>
              <li><strong>Travel Preferences:</strong> Travel interests, budgets, destinations, itineraries, and trip descriptions.</li>
              <li><strong>Interactive Data:</strong> Join request statuses, ratings/reviews given to or received from other users, and communications within trip group chat rooms.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>
              <Eye size={20} /> 3. How We Use Your Information
            </h2>
            <p>
              We use personal information collected via our services for a variety of business and community safety purposes described below:
            </p>
            <ul className={styles.list}>
              <li><strong>To Facilitate Account Creation and Logon Process:</strong> We use your registration details to set up your account and manage sessions.</li>
              <li><strong>To Connect Travelers:</strong> We display your profile information (like ratings, interests, and bio) to other members to help evaluate compatibility for shared trips.</li>
              <li><strong>To Manage Request Workflows:</strong> Letting trip hosts view pending member profiles and manage join requests.</li>
              <li><strong>To Enable In-App Communications:</strong> Enabling live real-time chats between accepted group members.</li>
              <li><strong>To Maintain Safety and Security:</strong> Review ratings, comments, and reports to detect spam or abusive behavior.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>
              <Lock size={20} /> 4. Sharing Your Information
            </h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
            </p>
            <p>
              Specifically, your profile details (excluding password and email address, unless opted-in) are shared publicly on the platform for match-making. Chat messages and join requests are only shared with relevant members involved in those specific trips. We do not sell, rent, or trade your personal information to third parties.
            </p>
          </div>

          <div className={styles.section}>
            <h2>
              <HelpCircle size={20} /> 5. Your Privacy Rights
            </h2>
            <p>
              You have the right to review, change, or terminate your account at any time. You can edit your profile information (including your bio, profile photo, and interests) directly in the Edit Profile section.
            </p>
            <p>
              If you request to delete your account, we will deactivate or delete your account and information from our active databases. However, some info may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, or enforce our Terms of Service.
            </p>
          </div>

          <div className={styles.footerNote}>
            © {new Date().getFullYear()} TripConnect. All rights reserved. If you have questions about this policy, please contact privacy@tripconnect.com.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
