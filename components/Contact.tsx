import React from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import EnquiryForm from "./EnquiryForm";
import { Phone, Mail, MapPin, Sparkles } from "lucide-react";

/* ------------------ INFO CARD ------------------ */

const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-md transition-all">
    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600 font-fredoka mb-1">
        {title}
      </h4>
      <div className="text-gray-800 text-sm leading-relaxed font-sans">{children}</div>
    </div>
  </div>
);

/* ------------------ CONTACT SECTION ------------------ */

const Contact: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/20 to-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* ===== HEADER ===== */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 font-fredoka text-xs font-bold tracking-wide mb-3 border border-orange-200">
            Get In Touch
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-gray-950 mb-3 tracking-tight">
            We’d Love to Hear From You
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-sans">
            Have questions regarding admissions, curriculum, or school visits? Reach out — our friendly staff is always happy to assist.
          </p>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div
          ref={contentRef}
          className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-7xl mx-auto transition-all duration-700 ${
            contentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {/* ===== LEFT : FORM ===== */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-fredoka text-xs font-bold mb-2 tracking-wide">
                Direct Inquiry
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-fredoka text-gray-900">
                Send Us a Message
              </h3>
              <p className="text-gray-500 text-sm mt-1 font-sans">
                Fill out the form below and our team will get back to you shortly.
              </p>
            </div>

            <EnquiryForm />
          </div>

          {/* ===== RIGHT : INFO + MAP ===== */}
          <div className="lg:col-span-5 space-y-4">
            <InfoCard icon={<Phone size={20} />} title="Call Us Directly">
              <a
                href="tel:8009767534"
                className="font-bold font-fredoka text-base text-gray-900 hover:text-orange-600 block"
              >
                +91 8009767534
              </a>
              <span className="text-xs text-gray-500">Mon–Sat • 8:00 AM to 5:00 PM</span>
            </InfoCard>

            <InfoCard icon={<Mail size={20} />} title="Email Us">
              <a
                href="mailto:funshalakindergarten@gmail.com"
                className="font-bold text-gray-900 hover:text-orange-600 block break-all text-sm"
              >
                funshalakindergarten@gmail.com
              </a>
              <span className="text-xs text-gray-500">Quick response within 24 hours</span>
            </InfoCard>

            <InfoCard icon={<MapPin size={20} />} title="Visit Our Campus">
              <p className="text-sm font-medium text-gray-800">
                BM-04 Near New Prayag Hospital, Viswa Bank Colony, ADA Colony, Naini, Prayagraj – 211008
              </p>
            </InfoCard>

            {/* MAP */}
            <div className="rounded-3xl overflow-hidden shadow-md border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.3853149114134!2d81.8803819!3d25.391909700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39854a89d1d9e163%3A0xe9f5fd09729368a7!2sFunshala%20Kindergarten%20Redefining%20Childhood%20-%20Best%20Pre%20School%20in%20Naini%20%7C%20Best%20Play%20School%20in%20Naini!5e0!3m2!1sen!2sin!4v1768621643036!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Funshala Kindergarten Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
