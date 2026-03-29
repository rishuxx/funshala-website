import React from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import EnquiryForm from "./EnquiryForm";

/* ------------------ INFO CARD ------------------ */

const InfoCard: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="relative">
    {/* Dashed Border */}
    <div className="absolute -inset-[2px] border border-dashed border-orange-400/60 rounded-2xl" />

    <div className="relative bg-white rounded-2xl p-6 shadow-md">
      <h4 className="text-sm font-bold uppercase tracking-wide text-orange-600 mb-2">
        {title}
      </h4>
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

/* ------------------ CONTACT SECTION ------------------ */

const Contact: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-28 md:py-36 bg-[#FAFAF7] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* ===== HEADER ===== */}
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-sm">
            Contact Us
          </span>

          <h2 className="text-4xl md:text-5xl font-baloo font-bold text-gray-900 mb-6">
            We’d Love to Hear From You
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions about admissions, programs, or visits? Reach out —
            our team is always happy to help.
          </p>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div
          ref={contentRef}
          className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-1000 ${
            contentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {/* ===== LEFT : FORM ===== */}
          <div className="relative">
            <div className="absolute -inset-[4px] border border-dashed border-orange-400/60 rounded-3xl" />
            <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-baloo font-bold text-gray-900 mb-3">
                Send Us a Message
              </h3>
              <p className="text-gray-600 mb-6">
                Fill out the form and we’ll get back to you shortly.
              </p>

              <EnquiryForm />
            </div>
          </div>

          {/* ===== RIGHT : INFO + MAP ===== */}
          <div className="space-y-8">
            <InfoCard title="Call Us">
              <a
                href="tel:8009767534"
                className="font-semibold text-gray-900 hover:text-orange-600"
              >
                8009767534
              </a>
            </InfoCard>

            <InfoCard title="Email">
              <a
                href="mailto:funshalakindergarten@gmail.com"
                className="font-semibold hover:text-orange-600"
              >
                funshalakindergarten@gmail.com
              </a>
            </InfoCard>

            <InfoCard title="Visit Our Campus">
              <p>
                BM-04 Near New Prayag Hospital, Viswa Bank Colony, ADA Colony,
                Naini, Prayagraj – 211008
              </p>
            </InfoCard>

            {/* MAP */}
            <div className="relative">
              <div className="absolute -inset-[3px] border border-dashed border-orange-400/60 rounded-3xl" />
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.3853149114134!2d81.8803819!3d25.391909700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39854a89d1d9e163%3A0xe9f5fd09729368a7!2sFunshala%20Kindergarten%20Redefining%20Childhood%20-%20Best%20Pre%20School%20in%20Naini%20%7C%20Best%20Play%20School%20in%20Naini!5e0!3m2!1sen!2sin!4v1768621643036!5m2!1sen!2sin"
                  width="100%"
                  height="260"
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
      </div>
    </section>
  );
};

export default Contact;
