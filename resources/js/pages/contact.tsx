import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';

const Contact = () => {
    return (
        <MainLayout>
            <Head title="Contact Us" />

            {/* Contact Form Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
                    {/* Top Tagline */}
                    <div className="mb-3">
                        <p className="text-sm md:text-base text-primary font-medium">
                            Let's Build Your Next Opportunity
                        </p>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-12 md:mb-16">
                        Contact Us
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-start">
                        {/* Left Column - Contact Form */}
                        <div className="max-w-[600px]">
                            <form className="space-y-5">
                                {/* Row 1: Name & Position */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm text-gray-600 mb-2"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="position"
                                            className="block text-sm text-gray-600 mb-2"
                                        >
                                            Position / Role
                                        </label>
                                        <input
                                            type="text"
                                            id="position"
                                            name="position"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="Cloud / DevOps / Project manager, etc"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Company Name & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            htmlFor="company"
                                            className="block text-sm text-gray-600 mb-2"
                                        >
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="enter your company name"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm text-gray-600 mb-2"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="you@email.com"
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Phone & What Can We Help */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm text-gray-600 mb-2"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="+961 00 000 000"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="help"
                                            className="block text-sm text-gray-600 mb-2"
                                        >
                                            What Can We Help You With?
                                        </label>
                                        <select
                                            id="help"
                                            name="help"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                                backgroundPosition: 'right 0.5rem center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '1.5em 1.5em',
                                            }}
                                        >
                                            <option value="">all services</option>
                                            <option value="sv-growth">SV Growth</option>
                                            <option value="sv-relations">SV Relations</option>
                                            <option value="sv-insights">SV Insights</option>
                                            <option value="sv-connect">SV Connect</option>
                                            <option value="sv-pitch">SV Pitch</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 4: Company Industry & Company Size */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            htmlFor="industry"
                                            className="block text-sm text-gray-600 mb-2"
                                        >
                                            Company Industry
                                        </label>
                                        <select
                                            id="industry"
                                            name="industry"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                                backgroundPosition: 'right 0.5rem center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '1.5em 1.5em',
                                            }}
                                        >
                                            <option value="">industry</option>
                                            <option value="technology">Technology</option>
                                            <option value="finance">Finance</option>
                                            <option value="healthcare">Healthcare</option>
                                            <option value="retail">Retail</option>
                                            <option value="manufacturing">Manufacturing</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="size"
                                            className="block text-sm text-gray-600 mb-2"
                                        >
                                            Company Size
                                        </label>
                                        <select
                                            id="size"
                                            name="size"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                                backgroundPosition: 'right 0.5rem center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '1.5em 1.5em',
                                            }}
                                        >
                                            <option value="">size</option>
                                            <option value="1-10">1-10 employees</option>
                                            <option value="11-50">11-50 employees</option>
                                            <option value="51-200">51-200 employees</option>
                                            <option value="201-500">201-500 employees</option>
                                            <option value="500+">500+ employees</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 5: Tell Us More */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm text-gray-600 mb-2"
                                    >
                                        Tell Us More About Your Business
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                        placeholder="Message"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center pt-4">
                                    <button
                                        type="submit"
                                        className="bg-primary text-white font-bold text-sm uppercase tracking-widest px-12 py-4 rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"
                                    >
                                        SUBMIT INQUIRY
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column - Image */}
                        <div className="hidden lg:block">
                            <div className="w-[280px] h-[500px] rounded-3xl overflow-hidden shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=900&fit=crop"
                                    alt="Professional woman on phone"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Contact;
