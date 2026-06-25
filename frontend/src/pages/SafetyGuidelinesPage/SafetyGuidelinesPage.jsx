import React from "react";
import { ShieldCheck, Video, Map, Eye, Compass, Heart } from "lucide-react";
import styles from "./SafetyGuidelinesPage.module.css";

const SafetyGuidelinesPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className="container">
        <div className={styles.titleSection}>
          <h1>Safety Guidelines</h1>
          <p>Important tips for a secure and happy co-traveling experience.</p>
        </div>

        <div className={`${styles.contentCard} glass-panel`}>
          <div className={styles.alertBox}>
            <h3>Trust Your Instincts</h3>
            <p>
              Your safety and comfort are paramount. If at any point during planning or on the trip you feel unsafe, uncomfortable, or sense something is wrong, remove yourself from the situation immediately. You are under no obligation to stay in a trip group.
            </p>
          </div>

          <div className={styles.section}>
            <h2>
              <Video size={20} /> 1. Before You Book
            </h2>
            <p>
              Taking active precautions before locking in plans is the best way to ensure compatibility and safety:
            </p>
            <ul className={styles.list}>
              <li><strong>Verify Profiles:</strong> Do not travel with members who have incomplete bios, lack profile images, or seem evasive about details. Look for verified accounts.</li>
              <li><strong>Review Companion Feedback:</strong> Check reviews on the member's profile page. Previous co-travelers' ratings offer honest and valuable insights.</li>
              <li><strong>Conduct a Video Call:</strong> Before finalizing any bookings (flights, villas, transport), schedule a quick video call. It helps confirm their identity and lets you gauge if your travel vibes align.</li>
              <li><strong>Agree on Budgets:</strong> Make sure you have clear, written agreement on how costs (villas, meals, tickets) are split to avoid financial arguments.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>
              <Map size={20} /> 2. During the Journey
            </h2>
            <p>
              Stay alert and follow standard travel safety protocols while exploring:
            </p>
            <ul className={styles.list}>
              <li><strong>Share Your Itinerary:</strong> Always share your exact travel plans, hotel reservations, flight details, and the full names/profiles of your travel companions with a friend or family member back home.</li>
              <li><strong>Meet in Public First:</strong> If you are meeting your group at the destination, arrange your first meetup in a bright, crowded public space (like a cafe, airport, or hotel lobby).</li>
              <li><strong>Protect Documents & Cash:</strong> Keep your passport, emergency credit cards, and bulk cash secure in a body pouch or room safe. Never leave absolute essentials in someone else's keeping.</li>
              <li><strong>Keep Local Emergency Numbers Ready:</strong> Always note down the local police, ambulance, and your national embassy's contact details of the country you are visiting.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>
              <ShieldCheck size={20} /> 3. Reporting Concerns
            </h2>
            <p>
              We want to keep TripConnect a friendly and safe space. Help us maintain the quality of the community:
            </p>
            <ul className={styles.list}>
              <li><strong>Report Inappropriate Conduct:</strong> If a user sends abusive messages, makes threats, or acts inappropriately in the chat, contact our support desk immediately.</li>
              <li><strong>Leave Honest Reviews:</strong> Be fair but truthful when reviewing companions. Your reviews directly protect future travelers.</li>
            </ul>
          </div>

          <div className={styles.footerNote}>
            Made with <Heart size={14} style={{ color: "#ef4444", fill: "#ef4444", margin: "0 2px" }} /> for a safe, shared world. TripConnect Support: support@tripconnect.com.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidelinesPage;
