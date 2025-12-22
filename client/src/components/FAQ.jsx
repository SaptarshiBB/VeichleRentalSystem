import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a car?",
      answer: "Browse our car listings, select your preferred vehicle, choose your pickup and drop-off dates, and complete the booking process. You'll need to create an account and make a payment to confirm your reservation."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept multiple payment methods including PayPal, UPI, and Bank Transfer. All payments are processed securely through our encrypted payment gateway."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made 48 hours or more before your scheduled pickup time are eligible for a full refund. Cancellations made within 48 hours may incur a cancellation fee. Contact our support team for assistance with cancellations."
    },
    {
      question: "What documents do I need to rent a car?",
      answer: "You'll need a valid driver's license, a government-issued ID (Aadhar card, passport, etc.), and proof of address. International customers may need an International Driving Permit (IDP) along with their home country license."
    },
    {
      question: "Is insurance included in the rental price?",
      answer: "Basic insurance coverage is included in all our rental packages. Additional comprehensive insurance options are available at checkout for enhanced protection and peace of mind."
    },
    {
      question: "Can I extend my rental period?",
      answer: "Yes! You can extend your rental period subject to vehicle availability. Contact us at least 24 hours before your scheduled return time to arrange an extension. Additional charges will apply based on the extended duration."
    },
    {
      question: "What if the car breaks down during my rental?",
      answer: "We provide 24/7 roadside assistance for all our vehicles. If you experience any issues, call our emergency helpline immediately at +91 98765 43210. We'll arrange for repairs or a replacement vehicle as quickly as possible."
    },
    {
      question: "Are there any mileage restrictions?",
      answer: "Most of our rentals come with unlimited mileage within the state. For interstate travel, please check the specific terms for your vehicle or contact our support team for details."
    },
    {
      question: "Can someone else drive the rental car?",
      answer: "Additional drivers can be added to your rental agreement at the time of booking or pickup. All drivers must meet our age and license requirements and must be present with valid documentation."
    },
    {
      question: "How do I check real-time car availability?",
      answer: "Our website features real-time availability updates powered by WebSocket technology. Simply browse our car listings to see which vehicles are currently available for your desired dates and location."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FaQuestionCircle className="text-primary-600 text-4xl mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our car rental service
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-primary-600">
                  {openIndex === index ? (
                    <FaChevronUp className="text-xl" />
                  ) : (
                    <FaChevronDown className="text-xl" />
                  )}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 animate-fade-in">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our support team is here to help you 24/7
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
