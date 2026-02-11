import ContactForm from './components/ContactForm';

export function Contact() {
  return (
    <div className="page page--contact">
      <main className="main-content main-content--contact">
        <section className="contact-hero">
          <h1 className="contact-title">Contact</h1>
          <p className="contact-lead">
            Have a question or want to explore working together?
          </p>
          <p className="contact-lead">I’d be glad to hear from you.</p>
          <hr className="contact-divider" />
          <h2 className="contact-reasons-title">Common reasons to get in touch:</h2>
          <ul className="contact-reasons-list">
            <li>General inquiry or introduction</li>
            <li>Hiring or job opportunity</li>
            <li>Property management or condo-board related questions</li>
          </ul>
        </section>
        <section className="contact-card-wrap">
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
