import styles from './Services.module.css';

export function Services() {
  return (
    <div className={styles.servicesPage}>
      <section className={styles.servicesSection}>
        <h2 className={styles.servicesHeading}>Professional Condo Meeting Minutes – Automated & Accurate</h2>
        <p>
          Save time and reduce errors with an app that automates the creation of condominium meeting minutes.
          From agenda to action items, the tool captures discussions and decisions in a consistent format,
          so your board gets accurate, professional minutes with less manual work and faster turnaround.
        </p>
        <p className={styles.serviceLink}>
          <a href="https://minutes.mycondo.space/" target="_blank" rel="noopener noreferrer">Minutes by My Condo Space →</a>
        </p>
      </section>

      <section className={styles.servicesSection}>
        <h2 className={styles.servicesHeading}>Secure Voting Platform Customized for Condo Governance</h2>
        <p>
          Run board and owner votes with confidence. The online voting platform is built for condominium
          governance: secure, transparent, and adaptable to annual meetings, special resolutions, and
          board elections. Owners can cast ballots remotely while the process stays auditable and
          compliant with your governing documents.
        </p>
        <p className={styles.serviceLink}>
          <a href="https://vote.mycondo.space/" target="_blank" rel="noopener noreferrer">Vote – My Condo Space →</a>
        </p>
      </section>

      <section className={styles.servicesSection}>
        <h2 className={styles.servicesHeading}>Custom Website Design for Condo Corporations & Managers</h2>
        <p>
          Give your corporation or management practice a clear, professional presence online.
          Custom websites are tailored to condo governance and manager needs—from resident portals
          and document access to board resources and contact information—so boards and owners
          get the information they need in one place.
        </p>
        <p className={styles.serviceLink}>
          <a href="https://mycondo.space/services/websites" target="_blank" rel="noopener noreferrer">Websites – My Condo Space →</a>
        </p>
      </section>

      <section className={styles.servicesSection}>
        <h2 className={styles.servicesHeading}>Built for Real Condo Operations</h2>
        <p>
          Condominium boards and managers face unique demands: compliance, transparency, and efficient
          communication. These services address those needs directly—streamlined minutes, trustworthy
          voting, and a dedicated web presence—so you can focus on governance and community instead
          of paperwork and technical hurdles.
        </p>
      </section>
    </div>
  );
}
