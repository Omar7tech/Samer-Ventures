import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';

const Contact = () => {
    return (
        <MainLayout>
            <Head title="Contact Us" />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20 md:py-32">
                <div className="max-w-[1700px] mx-auto px-6 md:px-20 lg:px-24">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                            Let's Talk
                            <br />
                            Business
                        </h1>
                        <p className="text-xl md:text-2xl font-light opacity-90">
                            Ready to transform your business? Get in touch with us today.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 md:py-32 bg-white">
                <div className="max-w-[1700px] mx-auto px-6 md:px-20 lg:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Left Column - Contact Info */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 tracking-tight">
                                Get in Touch
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed">
                                Whether you're looking to scale your business, enhance your sales strategy,
                                or explore new growth opportunities, we're here to help.
                            </p>

                            {/* Contact Methods */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-primary mb-4 uppercase tracking-wider">
                                        Email
                                    </h3>
                                    <a
                                        href="mailto:info@samerventures.com"
                                        className="text-lg text-gray-700 hover:text-primary transition-colors"
                                    >
                                        info@samerventures.com
                                    </a>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-primary mb-4 uppercase tracking-wider">
                                        Phone
                                    </h3>
                                    <a
                                        href="tel:+1234567890"
                                        className="text-lg text-gray-700 hover:text-primary transition-colors"
                                    >
                                        +1 (234) 567-890
                                    </a>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-primary mb-4 uppercase tracking-wider">
                                        Social
                                    </h3>
                                    <div className="flex gap-4">
                                        <a
                                            href="#"
                                            className="text-lg text-gray-700 hover:text-primary transition-colors"
                                        >
                                            LinkedIn
                                        </a>
                                        <span className="text-gray-400">•</span>
                                        <a
                                            href="#"
                                            className="text-lg text-gray-700 hover:text-primary transition-colors"
                                        >
                                            Instagram
                                        </a>
                                        <span className="text-gray-400">•</span>
                                        <a
                                            href="#"
                                            className="text-lg text-gray-700 hover:text-primary transition-colors"
                                        >
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Contact Form */}
                        <div>
                            <form className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider"
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider"
                                    >
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                                        placeholder="john@company.com"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="company"
                                        className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider"
                                    >
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                                        placeholder="Your Company"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="service"
                                        className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider"
                                    >
                                        Service Interested In
                                    </label>
                                    <select
                                        id="service"
                                        name="service"
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                                    >
                                        <option value="">Select a service</option>
                                        <option value="sv-growth">SV Growth</option>
                                        <option value="sv-relations">SV Relations</option>
                                        <option value="sv-insights">SV Insights</option>
                                        <option value="sv-connect">SV Connect</option>
                                        <option value="sv-pitch">SV Pitch</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors resize-none"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white font-bold text-lg uppercase tracking-wider py-5 rounded-2xl hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-white py-20 md:py-24">
                <div className="max-w-[1700px] mx-auto px-6 md:px-20 lg:px-24 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Ready to Grow Your Business?
                    </h2>
                    <p className="text-xl md:text-2xl font-light opacity-90 mb-8">
                        Schedule a free consultation call today.
                    </p>
                    <button className="bg-white text-primary font-bold text-lg uppercase tracking-wider px-12 py-5 rounded-full hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
                        Book Your Call
                    </button>
                </div>
            </section>
        </MainLayout>
    );
};

export default Contact;
