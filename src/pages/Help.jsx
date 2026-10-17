import { useState } from 'react';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { t } = useLanguage();

  const faqs = t('help.faqs');
  const faqList = Array.isArray(faqs) && faqs.length > 0 
    ? faqs 
    : (Array.isArray(translations.en?.help?.faqs) ? translations.en.help.faqs : []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.email || !formState.message || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const web3Key = import.meta.env.VITE_WEB3FORMS_KEY || '';

    try {
      let response;
      if (web3Key) {
        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: formState.name || 'Anonymous Developer',
            email: formState.email,
            message: formState.message,
            subject: `[Neuron Inquiry] From ${formState.name || formState.email}`
          })
        });
      } else {
        const formSubmitToken = import.meta.env.VITE_FORMSUBMIT_TOKEN || '220535c9fb0e026fd61cfc6c1f6feece';
        response = await fetch(`https://formsubmit.co/ajax/${formSubmitToken}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formState.name || 'Anonymous Developer',
            email: formState.email,
            message: formState.message,
            _subject: `[Neuron Inquiry] From ${formState.name || formState.email}`,
            _template: 'table',
            _captcha: 'false'
          })
        });
      }

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        if (data.message && data.message.includes('Activation')) {
          setSubmitError('First-time activation sent to team inbox. Please try again shortly or write to neuron.spatial.ide@gmail.com directly.');
        } else {
          setSubmitError(data.message || 'Unable to dispatch message right now. Please write to neuron.spatial.ide@gmail.com directly.');
        }
      }
    } catch {
      setSubmitError('Network error connecting to form service. Please write to neuron.spatial.ide@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-sans relative selection:bg-[#3B82F6]/30 selection:text-white flex flex-col justify-between transition-colors duration-200">

      <main 
        className="relative z-10 pt-[72px] pb-16 px-4 sm:px-8 md:px-12 w-full max-w-7xl mx-auto flex-1"
        style={{
          paddingLeft: 'max(1rem, env(safe-area-inset-left))',
          paddingRight: 'max(1rem, env(safe-area-inset-right))'
        }}
      >
        
        {/* Header with Title and the same horizontal line as Versions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[var(--border-subtle)]">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              {t('help.title', 'Help & Queries')}
            </h1>
          </div>
        </div>

        {/* FAQs Section - Full width across page, completely unboxed, hairline dividers */}
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

        {/* Inquiry Form Section - Centered and compact */}
        <section className="w-full pt-4 flex flex-col items-center">
          <div className="w-full max-w-xl mx-auto">
            <div className="mb-6 text-center">
              <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium mb-2">
                {t('help.formTitle', 'Send an Inquiry')}
              </h2>
              <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed font-normal">
                {t('help.formDesc', 'Have a question, feedback, or a technical inquiry? Send a message directly to our team.')}
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Check size={16} />
                  <h3 className="text-sm font-semibold">
                    {t('help.successTitle', 'Message Dispatched')}
                  </h3>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
                  {t('help.successDesc', 'Thank you for reaching out. We will review your inquiry shortly.')}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] underline cursor-pointer p-0 bg-transparent border-0 outline-none inline-block mx-auto"
                >
                  {t('help.sendAnother', 'Send Another Message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans w-full">
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

              {submitError && (
                <div className="text-[11px] font-mono text-rose-500 dark:text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                  {submitError}
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-[11px] text-[var(--text-muted)] font-mono break-all sm:break-normal">
                  Direct email: <a href="mailto:neuron.spatial.ide@gmail.com" className="hover:text-[var(--text-primary)] underline underline-offset-2 transition-colors">neuron.spatial.ide@gmail.com</a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-8 px-4 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold text-xs hover:opacity-90 transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shadow-sm shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>{t('help.sending', 'Sending...')}</span>
                    </>
                  ) : (
                    <span>{t('help.submitBtn', 'Send Message')}</span>
                  )}
                </button>
              </div>
            </form>
          )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}