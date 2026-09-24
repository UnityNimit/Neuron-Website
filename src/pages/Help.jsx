import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

export default function Help() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { t, language } = useLanguage();

  const faqs = t('help.faqs');
  const faqList = Array.isArray(faqs) ? faqs : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    
    const subject = encodeURIComponent(`[Neuron Query] From ${formState.name}`);
    const body = encodeURIComponent(formState.message);
    const mailtoUrl = `mailto:neuron.spatial.ide@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-sans relative selection:bg-[#3B82F6]/30 selection:text-white flex flex-col justify-between transition-colors duration-200">

      <main className="relative z-10 pt-[72px] pb-8 px-6 sm:px-8 md:px-12 w-full max-w-7xl mx-auto">
        <div className="text-left mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-2">
            {t('help.title', 'Help & Queries')}
          </h1>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
            {t('help.desc', 'Find answers to common technical questions about the spatial engine, localhost runtime, or submit inquiries directly to the team.')}
          </p>
        </div>

        {/* FAQs Section */}
        <section className="mb-14">
          <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] tracking-tight mb-4">
            {t('help.faqTitle', 'Frequently Asked Questions')}
          </h2>

          <div className="space-y-3">
            {faqList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] rounded-xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-[var(--text-primary)] leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown 
                      size={16} 
                      className={`text-[var(--text-muted)] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#60A5FA]' : ''}`} 
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Enquiry Form Section */}
        <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] tracking-tight mb-2">
              {t('help.formTitle', 'Send an Inquiry')}
            </h2>
            <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed">
              {t('help.formDesc', 'Have a question, feedback, or a technical inquiry? Send a message directly to our team.')}
            </p>
          </div>

          {submitted ? (
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check size={18} />
              </div>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                {t('help.successTitle', 'Message Dispatched')}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                {t('help.successDesc', 'Thank you for reaching out. We will review your inquiry shortly.')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline cursor-pointer"
              >
                {t('help.sendAnother', 'Send Another Message')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[var(--text-secondary)] text-[11px] block font-medium">
                    {t('help.nameLabel', 'Name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder={t('help.namePlaceholder', 'Ada Lovelace')}
                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] focus:border-[var(--accent-color)] rounded-lg px-3.5 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[var(--text-secondary)] text-[11px] block font-medium">
                    {t('help.emailLabel', 'Email Address')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder={t('help.emailPlaceholder', 'ada@example.com')}
                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] focus:border-[var(--accent-color)] rounded-lg px-3.5 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[var(--text-secondary)] text-[11px] block font-medium">
                  {t('help.messageLabel', 'Message')}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder={t('help.messagePlaceholder', 'Describe your query or technical question...')}
                  className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] focus:border-[var(--accent-color)] rounded-lg p-3.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none leading-relaxed resize-none transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-[11px] text-[var(--text-muted)]">
                  Direct email: <a href="mailto:neuron.spatial.ide@gmail.com" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline">neuron.spatial.ide@gmail.com</a>
                </div>

                <button
                  type="submit"
                  className="h-8 px-4 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold text-xs hover:opacity-90 transition-all inline-flex items-center justify-center cursor-pointer active:scale-[0.98]"
                >
                  <span>{t('help.submitBtn', 'Send Message')}</span>
                </button>
              </div>
            </form>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}