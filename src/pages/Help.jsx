import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export default function Help() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const faqs = t('help.faqs');
  const faqList = Array.isArray(faqs) && faqs.length > 0 
    ? faqs 
    : (Array.isArray(translations.en?.help?.faqs) ? translations.en.help.faqs : []);

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

      <main className="relative z-10 pt-[72px] pb-16 px-6 sm:px-8 md:px-12 w-full max-w-7xl mx-auto">
        
        {/* Header with Title and the same horizontal line as Versions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[var(--border-subtle)]">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-2">
              {t('help.title', 'Help & Queries')}
            </h1>
            <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
              {t('help.desc', 'Find answers to common technical questions about the spatial engine, localhost runtime, or submit inquiries directly to the team.')}
            </p>
          </div>
        </div>

        {/* FAQs Section - Completely unboxed, hairline dividers */}
        <section className="mb-14 w-full">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium mb-6">
            {t('help.faqTitle', 'Frequently Asked Questions')}
          </h2>

          <div className="space-y-0 w-full divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
            {faqList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="w-full transition-colors">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer group bg-transparent border-none p-0 outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown 
                      size={15} 
                      className={`text-[var(--text-muted)] shrink-0 transition-transform duration-200 group-hover:text-[var(--text-primary)] ${isOpen ? 'rotate-180 text-[var(--accent-color)]' : ''}`} 
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Inquiry Form Section - Completely unboxed */}
        <section className="w-full pt-4">
          <div className="mb-6">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium mb-2">
              {t('help.formTitle', 'Send an Inquiry')}
            </h2>
            <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
              {t('help.formDesc', 'Have a question, feedback, or a technical inquiry? Send a message directly to our team.')}
            </p>
          </div>

          {submitted ? (
            <div className="py-8 text-left space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Check size={16} />
                <h3 className="text-sm font-semibold">
                  {t('help.successTitle', 'Message Dispatched')}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] max-w-md leading-relaxed font-normal">
                {t('help.successDesc', 'Thank you for reaching out. We will review your inquiry shortly.')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] underline cursor-pointer p-0 bg-transparent border-0 outline-none block"
              >
                {t('help.sendAnother', 'Send Another Message')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[var(--text-muted)] text-[11px] font-mono uppercase tracking-wider block">
                    {t('help.nameLabel', 'Name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder={t('help.namePlaceholder', 'Ada Lovelace')}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-[var(--accent-color)] rounded-lg px-3.5 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[var(--text-muted)] text-[11px] font-mono uppercase tracking-wider block">
                    {t('help.emailLabel', 'Email Address')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder={t('help.emailPlaceholder', 'ada@example.com')}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-[var(--accent-color)] rounded-lg px-3.5 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[var(--text-muted)] text-[11px] font-mono uppercase tracking-wider block">
                  {t('help.messageLabel', 'Message')}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder={t('help.messagePlaceholder', 'Describe your query or technical question...')}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-[var(--accent-color)] rounded-lg p-3.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none leading-relaxed resize-none transition-colors text-xs"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-[11px] text-[var(--text-muted)] font-mono">
                  Direct email: <a href="mailto:neuron.spatial.ide@gmail.com" className="hover:text-[var(--text-primary)] underline underline-offset-2 transition-colors">neuron.spatial.ide@gmail.com</a>
                </div>

                <button
                  type="submit"
                  className="h-8 px-4 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold text-xs hover:opacity-90 transition-all inline-flex items-center justify-center cursor-pointer active:scale-[0.98] shadow-sm shrink-0"
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