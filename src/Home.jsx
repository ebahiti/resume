import { useEffect } from 'react';
import { initHomePage } from './dom-init';
import { OptimizedImage } from './components/OptimizedImage';

export function Home() {
  useEffect(() => {
    initHomePage();
  }, []);

  return (
    <article className="entry content-bg single-entry">
      <div className="entry-content-wrap">
        <div className="entry-content single-content">
          <div className="resume-page">
            <section className="hero-card">
              <div className="hero-card-text">
                <p className="hero-greeting"><strong>HELLO, MY NAME IS</strong></p>
                <hr className="hero-divider" />
                <p className="hero-name">Elinor Bahiti</p>
                <p className="hero-title"><strong>Registered<br />Condominium<br />Manager</strong></p>
              </div>
              <div className="hero-card-portrait">
                <OptimizedImage src="/assets/portraitsmall.png" alt="Elinor Bahiti" className="portrait-img" width={512} height={512} decoding="async" />
              </div>
            </section>

            <section className="section-card">
              <div className="kt-row-column-wrap kt-has-1-columns">
                <div className="kt-inside-inner-col">
                  <h2>Quote of the Day</h2>
                  <div id="quote-container">Loading quote...</div>
                </div>
              </div>
            </section>

            <section className="section-card scroll-reveal">
              <div className="kt-row-column-wrap kt-has-1-columns">
                <div className="kt-inside-inner-col">
                  <h3 className="wp-block-heading">About Me</h3>
                  <div className="kt-row-column-wrap kt-has-2-columns">
                    <div className="kt-inside-inner-col about-image-col">
                      <figure className="wp-block-image">
                        <OptimizedImage src="/assets/condo tower.png" alt="" width={336} height={672} decoding="async" />
                      </figure>
                    </div>
                    <div className="kt-inside-inner-col">
                      <p>I am a Registered Condominium Manager in Toronto, dedicated to ethical practices and meticulous attention to detail.</p>
                      <p>My diverse skill set spans technical expertise, financial acumen, and strong communication abilities.</p>
                      <p>I am passionate about the dynamic nature of condominium management and committed to continuous learning to stay current with industry developments.</p>
                      <p>I prioritize building long-term client relationships founded on mutual trust, honesty, and cooperation, and I welcome new challenges and opportunities to connect.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-card scroll-reveal skills-section">
              <div className="kt-row-column-wrap kt-has-1-columns">
                <div className="kt-inside-inner-col">
                  <div className="kt-row-column-wrap kt-has-2-columns">
                    <div className="kt-inside-inner-col skills-heading-col">
                      <h2 className="wp-block-heading has-text-align-center">Skills and Expertise</h2>
                      <figure className="wp-block-image skills-arrow-wrap">
                        <img src="/assets/arrow.svg" alt="" className="skills-arrow" width="180" height="32" decoding="async" />
                      </figure>
                    </div>
                    <div className="kt-inside-inner-col">
                      <p>My work is supported by a comprehensive skill set tailored to the demands of condominium management. Key areas of expertise include:</p>
                      <ul className="wp-block-list">
                        <li><strong>Regulatory Knowledge</strong><br />A solid understanding of the Condominium Act, Condominium Management Services Act, and other relevant regulations ensures compliance and informed decision-making.</li>
                        <li><strong>Building and Safety Expertise</strong><br />Proficient in physical building management with a thorough grasp of safety and fire codes, I ensure properties remain safe, functional, and up to standard.</li>
                        <li><strong>Financial Acumen</strong><br />Skilled in interpreting financial statements and applying accounting principles, I excel at budget preparation, financial analysis, and expense management.</li>
                        <li><strong>Technical Proficiency</strong><br />Adept in using software applications like Microsoft Office (Word, Excel, Access, PowerPoint), I leverage technology to streamline processes and enhance efficiency.</li>
                        <li><strong>Communication Skills</strong><br />Strong verbal and written communication abilities allow me to liaise effectively with boards, residents, and contractors, ensuring clarity and collaboration.</li>
                        <li><strong>Organizational and Analytical Strengths</strong><br />Exceptional organizational skills and a keen analytical mindset enable me to address complex challenges, solve problems efficiently, and maintain operational excellence.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-card expertise-cards-section">
              <div className="kt-row-column-wrap kt-has-1-columns">
                <div className="kt-inside-inner-col">
                  <div className="kt-row-column-wrap kt-has-4-columns">
                    <div className="kt-inside-inner-col expertise-card">
                      <figure className="wp-block-image">
                        <OptimizedImage src="/assets/justice system.png" alt="Condo Act" width={448} height={672} decoding="async" />
                      </figure>
                      <p className="has-text-align-left has-medium-font-size"><strong>Condo Act</strong></p>
                      <p>Working knowledge of the Condo Act 1998 and its Regulations, Management Services Act, and highly experienced in all administrative procedures. Team building and staff motivation.</p>
                    </div>
                    <div className="kt-inside-inner-col expertise-card">
                      <figure className="wp-block-image">
                        <OptimizedImage src="/assets/physical building.png" alt="Physical Building" width={448} height={672} decoding="async" />
                      </figure>
                      <p className="has-medium-font-size"><strong>Physical Building</strong></p>
                      <p>A good understanding of all physical building components, including HVAC, plumbing, electrical with a focus on continuous learning and improving.</p>
                    </div>
                    <div className="kt-inside-inner-col expertise-card">
                      <figure className="wp-block-image">
                        <OptimizedImage src="/assets/financials.png" alt="Financial" width={448} height={672} decoding="async" />
                      </figure>
                      <p className="has-medium-font-size"><strong>Financial</strong></p>
                      <p>Working knowledge of the financial statements of the corporations, highly skilled in budgeting, and able to interpret and provide useful insight to the stakeholders of the condominium.</p>
                    </div>
                    <div className="kt-inside-inner-col expertise-card">
                      <figure className="wp-block-image">
                        <OptimizedImage src="/assets/administration.png" alt="Administration" width={448} height={672} decoding="async" />
                      </figure>
                      <p className="has-medium-font-size"><strong>Administration</strong></p>
                      <p>Experienced in efficiently managing condominium operations, including budgeting, maintenance coordination, stakeholder communication, and ensuring compliance with regulations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-card scroll-reveal">
              <div className="kt-row-column-wrap kt-has-2-columns">
                <div className="kt-inside-inner-col">
                  <h3 className="wp-block-heading has-text-align-center">Experience</h3>
                  <figure className="wp-block-image experience-image-col">
                    <OptimizedImage src="/assets/work experience.png" alt="Work Experience" width={416} height={831} decoding="async" />
                  </figure>
                </div>
                <div className="kt-inside-inner-col">
                  <p>Over the past 7 years, I've dedicated myself to the field of condominium management, ensuring efficient operations and fostering positive community environments.</p>
                  <p><strong>Condominium Manager</strong><br /><em>The Meritus Group Management</em><br /><em>April 2021 – Present</em><br />As a Condominium Manager, I handle the full spectrum of responsibilities that come with managing condominium corporations. My role involves:</p>
                  <ul className="wp-block-list">
                    <li>Preparing and maintaining accurate budgets to ensure financial stability.</li>
                    <li>Overseeing the physical components of buildings, coordinating with trades and contractors for timely maintenance and repairs.</li>
                    <li>Liaising with boards of directors, providing detailed reports, and ensuring smooth communication and decision-making processes.</li>
                    <li>Performing a wide range of administrative tasks, from preparing meeting minutes to managing correspondence and compliance documentation.</li>
                    <li>Tackling challenges head-on, solving problems as they arise, and maintaining a proactive approach to building management.</li>
                  </ul>
                  <p><strong>Condominium Manager</strong><br /><em>Kindle Management Inc.</em><br /><em>June 2018 – April 2021</em><br />Managed a portfolio of condominium corporations, including MTCC1284 and YCC291, where I was responsible for:</p>
                  <p>Building strong relationships with board members and fostering community satisfaction.</p>
                  <p>Financial management, including budget preparation and expense tracking.</p>
                  <p>Ensuring compliance with the Condominium Act and addressing residents' needs promptly.</p>
                </div>
              </div>
            </section>

            <section className="section-card scroll-reveal">
              <div className="kt-row-column-wrap kt-has-2-columns">
                <div className="kt-inside-inner-col">
                  <h3 className="wp-block-heading">Education</h3>
                  <figure className="wp-block-image education-image-col">
                    <OptimizedImage src="/assets/education.png" alt="Education" width={448} height={672} decoding="async" />
                  </figure>
                </div>
                <div className="kt-inside-inner-col">
                  <p>To support my professional endeavors, I've pursued targeted education that equips me with the necessary knowledge and skills for effective condominium management.</p>
                  <ul className="wp-block-list">
                    <li><strong>ACMO Program</strong><br /><em>Mohawk College</em><br />This program provided me with a comprehensive understanding of condominium law, financial planning, administration, and physical building management.</li>
                    <li><strong>Accounting Certificate</strong><br /><em>George Brown College</em><br />I gained foundational knowledge in financial accounting, managerial accounting, business law, and taxation, all of which are crucial for the financial aspects of property management.</li>
                    <li><strong>Network Administration Support Certificate</strong><br /><em>George Brown College</em><br />This certification enhanced my technical skills, including computer maintenance and network support, enabling me to effectively manage and troubleshoot building management systems.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section-card scroll-reveal">
              <div className="kt-row-column-wrap kt-has-1-columns">
                <div className="kt-inside-inner-col">
                  <h2 className="wp-block-heading">Portfolio</h2>
                  <figure className="wp-block-gallery has-nested-images columns-default is-cropped wp-block-gallery-2 is-layout-flex wp-block-gallery-is-layout-flex">
                    <figure className="wp-block-image size-large">
                      <span className="portfolio-tile-img"><img src="/assets/livonia.png.webp" alt="Livonia" width="1024" height="470" decoding="async" /></span>
                      <figcaption className="wp-element-caption">Livonia, source Google</figcaption>
                    </figure>
                    <figure className="wp-block-image size-large">
                      <span className="portfolio-tile-img"><OptimizedImage src="/assets/dna3.jpg" alt="Canderel DNA3" width={1024} height={921} decoding="async" /></span>
                      <figcaption className="wp-element-caption">Canderel – DNA3, source Google</figcaption>
                    </figure>
                    <figure className="wp-block-image size-large">
                      <span className="portfolio-tile-img"><OptimizedImage src="/assets/750bay.png" alt="The Penrose, source: baystreetcondos.ca" width={540} height={390} decoding="async" /></span>
                      <figcaption className="wp-element-caption">The Penrose, source: baystreetcondos.ca</figcaption>
                    </figure>
                    <figure className="wp-block-image size-large">
                      <span className="portfolio-tile-img"><img src="/assets/The-Wave.webp" alt="The Wave" width="468" height="673" decoding="async" /></span>
                      <figcaption className="wp-element-caption">The Wave, source own image</figcaption>
                    </figure>
                    <figure className="wp-block-image size-large">
                      <span className="portfolio-tile-img"><img src="/assets/Rivertowne.webp" alt="Rivertowne" width="595" height="428" decoding="async" /></span>
                      <figcaption className="wp-element-caption">Rivertowne, source Google</figcaption>
                    </figure>
                    <figure className="wp-block-image size-large">
                      <span className="portfolio-tile-img"><img src="/assets/1stjohns.webp" alt="1 St Johns" width="640" height="426" decoding="async" /></span>
                      <figcaption className="wp-element-caption">1 St Johns, source own image</figcaption>
                    </figure>
                  </figure>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
