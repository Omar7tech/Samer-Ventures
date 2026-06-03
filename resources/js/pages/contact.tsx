import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';

const Contact = () => {
    return (
        <MainLayout>
            <Head title="Contact Us" />

            {/* Contact Form Section */}
            <section className="py-16 md:py-24 bg-white font-inter">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-32">
                    
                    {/* Top Tagline */}
                    <div className="mb-2">
                        <p className="text-xs md:text-sm text-primary font-bold tracking-tight">
                            Let's Build Your Next Opportunity
                        </p>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-[76px] font-bold text-primary tracking-tight leading-[1.05] mb-12 md:mb-14">
                        Contact Us
                    </h1>

                    {/* Content Layout - Two Column Flex Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-stretch">
                        
                        {/* Left Column - Contact Form */}
                        <div className="w-full">
                            <form className="space-y-6">
                                
                                {/* Row 1: Name & Position */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="text-base font-bold text-[#8A9499] mb-2.5">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="w-full px-5 py-3.5 rounded-xl bg-[#EBF0F3] border-0 text-gray-900 placeholder:text-[#A3B0B7] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="enter your full name"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="position" className="text-base font-bold text-[#8A9499] mb-2.5">
                                            Position / Role
                                        </label>
                                        <input
                                            type="text"
                                            id="position"
                                            name="position"
                                            className="w-full px-5 py-3.5 rounded-xl bg-[#EBF0F3] border-0 text-gray-900 placeholder:text-[#A3B0B7] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="owner, founder, manager, sales manager, etc."
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Company Name & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                    <div className="flex flex-col">
                                        <label htmlFor="company" className="text-base font-bold text-[#8A9499] mb-2.5">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            className="w-full px-5 py-3.5 rounded-xl bg-[#EBF0F3] border-0 text-gray-900 placeholder:text-[#A3B0B7] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="enter your company name"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="email" className="text-base font-bold text-[#8A9499] mb-2.5">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full px-5 py-3.5 rounded-xl bg-[#EBF0F3] border-0 text-gray-900 placeholder:text-[#A3B0B7] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Phone & Selection dropdown */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                    <div className="flex flex-col">
                                        <label htmlFor="phone" className="text-base font-bold text-[#8A9499] mb-2.5">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="w-full px-5 py-3.5 rounded-xl bg-[#EBF0F3] border-0 text-gray-900 placeholder:text-[#A3B0B7] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="+961 00 000 000"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="help" className="text-base font-bold text-[#8A9499] mb-2.5">
                                            What Can We Help You With?
                                        </label>
                                        <select
                                            id="help"
                                            name="help"
                                            className="w-full px-5 py-3.5 rounded-xl bg-[#EBF0F3] border-0 text-[#A3B0B7] text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238a9499' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                                backgroundPosition: 'right 1.25rem center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '1.25em 1.25em',
                                            }}
                                        >
                                            <option value="">sv services</option>
                                            <option value="sv-growth">SV Growth</option>
                                            <option value="sv-relations">SV Relations</option>
                                            <option value="sv-insights">SV Insights</option>
                                            <option value="sv-connect">SV Connect</option>
                                            <option value="sv-pitch">SV Pitch</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 4: Company Industry & Company Size */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                    <div className="flex flex-col">
                                        <label htmlFor="industry" className="text-base font-bold text-[#8A9499] mb-2.5">
                                            Company Industry
                                        </label>
                                        <select
                                            id="industry"
                                            name="industry"
                                            className="w-full px-5 py-3.5 rounded-xl bg-[#EBF0F3] border-0 text-[#A3B0B7] text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238a9499' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                                backgroundPosition: 'right 1.25rem center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '1.25em 1.25em',
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
                                    <div className="flex flex-col">
                                        <label htmlFor="size" className="text-base font-bold text-[#8A9499] mb-2.5">
                                            Company Size
                                        </label>
                                        <select
                                            id="size"
                                            name="size"
                                            className="w-full px-5 py-3.5 rounded-xl bg-[#EBF0F3] border-0 text-[#A3B0B7] text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238a9499' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                                backgroundPosition: 'right 1.25rem center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '1.25em 1.25em',
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

                                {/* Row 5: Tell Us More Textarea */}
                                <div className="flex flex-col">
                                    <label htmlFor="message" className="text-base font-bold text-[#8A9499] mb-2.5">
                                        Tell Us More About Your Business
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        className="w-full px-5 py-4 rounded-xl bg-[#EBF0F3] border-0 text-gray-900 placeholder:text-[#A3B0B7] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                        placeholder="Message"
                                    />
                                </div>

                                {/* Submit Action Row */}
                                <div className="flex justify-center pt-4">
                                    <button
                                        type="submit"
                                        className="bg-primary text-white font-bold text-xs uppercase tracking-[0.15em] px-12 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow"
                                    >
                                        SUBMIT INQUIRY
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column - Media Showcase Card */}
                        <div className="hidden lg:block w-full">
                            <div className="w-full h-full min-h-[580px] rounded-[32px] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1200&fit=crop"
                                    alt="Professional communication concept"
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