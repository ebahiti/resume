import styles from './Credentials.module.css';
import { OptimizedImage } from './components/OptimizedImage';

/**
 * Credential image filenames from /assets/credentials.
 * Sorted by numeric prefix (1, 2, … 11) to preserve display order.
 */
const CREDENTIAL_FILES = [
  '1_RCM.jpg',
  '2_Advanced_Security.webp',
  '3_fire_safety.webp',
  '4_advanced_plumbing.webp',
  '5_accounting_certificate.jpg',
  '6_advanced_ethics.webp',
  '7_network_admin_certificate.webp',
  '8_new_builds_Tarion.webp',
  '9_advanced_communication.webp',
  '10_reserve_funds.webp',
  '11_financial_audits.webp',
  '12_advanced_fire.png',
].sort((a, b) => {
  const numA = parseInt(a.match(/^\d+/)?.[0] ?? '0', 10);
  const numB = parseInt(b.match(/^\d+/)?.[0] ?? '0', 10);
  return numA - numB;
});

/** Human-readable label from filename: "1_RCM.jpg" → "1 RCM", "2_Advanced_Security.webp" → "2 Advanced Security" */
function labelFromFilename(filename) {
  const base = filename.replace(/\.[^.]+$/, '');
  return base.replace(/_/g, ' ');
}

export function Credentials() {
  return (
    <div className={styles.credentialsPage}>
      <section className={styles.credentialsSection}>
        <h2 className={styles.credentialsHeading}>Credentials</h2>
        <div className={styles.credentialsIntro}>
          <p>
            Elinor Bahiti, a Registered Condominium Manager in Toronto, has pursued an extensive educational path to
            enhance his expertise in condominium management. His academic achievements include:
          </p>
          <ul className={styles.credentialsList}>
            <li>
              <strong>ACMO Program at Mohawk College (2017-2018):</strong> Focused on condominium law, financial
              planning, administration, human relations, and physical building management.
            </li>
            <li>
              <strong>Accounting Certificate from George Brown College (2010-2013):</strong> Covered financial
              accounting fundamentals, economics, business law, managerial accounting, taxation, and professional
              communications.
            </li>
            <li>
              <strong>Network Administration Support Certificate from George Brown College (2006-2007):</strong>{' '}
              Emphasized computer hardware maintenance, operating systems troubleshooting, and network management.
            </li>
          </ul>
          <p>
            Additionally, Elinor has obtained certifications in advanced ethics, communication and conflict management,
            managing new builds and Tarion, advanced financials, security and technology, fire safety and records, and
            advanced plumbing and water management. These qualifications underscore his commitment to professional
            development and excellence in condominium management.
          </p>
        </div>
        <ul className={styles.gallery} aria-label="Credentials gallery">
          {CREDENTIAL_FILES.map((filename) => (
            <li key={filename} className={styles.item}>
              <figure className={styles.itemFigure}>
                <OptimizedImage
                  src={`/assets/credentials/${filename}`}
                  alt={labelFromFilename(filename)}
                  decoding="async"
                />
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
