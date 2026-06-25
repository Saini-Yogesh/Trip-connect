import React from "react";
import { Compass, Users, DollarSign, Shield, Heart, HeartHandshake } from "lucide-react";
import styles from "./AboutUsPage.module.css";

const AboutUsPage = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Hero Header */}
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className="text-gradient">About TripConnect</h1>
          <p>
            Our mission is to empower solo travelers around the globe to connect safely, share amazing experiences, and split costs.
          </p>
          <div className={styles.heroGlow}></div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container">
        <div className={styles.storyContainer}>
          <div className={styles.storyContent}>
            <h2>Why We Built TripConnect</h2>
            <p>
              Travel is one of the most enriching experiences life offers, but solo travel can sometimes be lonely, expensive, and intimidating. Booking accommodations, hiring local guides, or renting transport all carry high single-occupancy costs.
            </p>
            <p>
              We realized that there are millions of travelers around the world heading to the same destinations, searching for the same experiences, and facing the same costs.
            </p>
            <p>
              TripConnect was created as a bridge. We match solo adventurers based on shared dates, budgets, and travel styles. We don't act as agents; instead, we build the core safety and messaging platforms that let you find your own companions and plan details together.
            </p>
          </div>

          <div className={`${styles.storyCard} glass-panel`}>
            <HeartHandshake size={48} className={styles.storyIcon} />
            <h3>Our core belief</h3>
            <p>
              "We believe that sharing a journey makes it twice as memorable, half as expensive, and significantly safer."
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={`${styles.valuesSection} container`}>
        <div className={styles.sectionHeader}>
          <h2>Our Core Values</h2>
          <p>The principles that guide how we build our community and platform.</p>
        </div>

        <div className={styles.valuesGrid}>
          <div className={`${styles.valueCard} glass-panel`}>
            <div className={styles.valueIconWrapper}>
              <Shield size={20} />
            </div>
            <h3>Community Safety First</h3>
            <p>We mandate detailed profiles, encourage strict review systems, and provide tools for users to verify their matches before setting off.</p>
          </div>

          <div className={`${styles.valueCard} glass-panel`}>
            <div className={styles.valueIconWrapper}>
              <DollarSign size={20} />
            </div>
            <h3>Accessible Exploration</h3>
            <p>By helping travelers split costs on housing, excursions, and transport, we make dream destinations accessible to everyone.</p>
          </div>

          <div className={`${styles.valueCard} glass-panel`}>
            <div className={styles.valueIconWrapper}>
              <Users size={20} />
            </div>
            <h3>Inclusive Companionship</h3>
            <p>Whether you're a slow traveler, budget backpacker, digital nomad, or history buff, we help you find travelers who match your vibe.</p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className={`${styles.teamSection} container`}>
        <div className={styles.sectionHeader}>
          <h2>Meet the Minds Behind it</h2>
          <p>A group of passionate travelers and developers working to connect the world.</p>
        </div>

        <div className={styles.teamGrid}>
          <div className={`${styles.teamCard} glass-panel`}>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
              alt="Yogesh Saini"
              className={styles.teamAvatar}
            />
            <h3>Yogesh Saini</h3>
            <div className={styles.teamRole}>Founder & Tech Lead</div>
            <p className={styles.teamBio}>
              Software engineer and adventure enthusiast. Yogesh built TripConnect's backend and socket routing to solve travel coordination.
            </p>
          </div>

          <div className={`${styles.teamCard} glass-panel`}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
              alt="Alice Vance"
              className={styles.teamAvatar}
            />
            <h3>Alice Vance</h3>
            <div className={styles.teamRole}>Community Director</div>
            <p className={styles.teamBio}>
              Veteran solo traveler who has explored 45+ countries. Alice ensures community guidelines are respected and helpful resources are updated.
            </p>
          </div>

          <div className={`${styles.teamCard} glass-panel`}>
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
              alt="Bob Miller"
              className={styles.teamAvatar}
            />
            <h3>Bob Miller</h3>
            <div className={styles.teamRole}>Product Advisor</div>
            <p className={styles.teamBio}>
              Digital nomad advocating for remote work accessibility. Bob focuses on travel budget design and cost-splitting features.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
