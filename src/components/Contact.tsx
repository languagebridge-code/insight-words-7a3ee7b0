import { Mail, Phone, Twitter } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Direct Contact Section */}
          <div className="gradient-primary rounded-3xl p-8 md:p-12 text-center shadow-2xl fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Get in Touch
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center gap-3 text-white text-lg">
                <Mail className="w-5 h-5" />
                <a href="mailto:contact@languagebridge.app" className="hover:underline font-medium">
                  contact@languagebridge.app
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-3 text-white text-lg">
                <Phone className="w-5 h-5" />
                <a href="tel:+12168006020" className="hover:underline font-medium">
                  (216) 800-6020
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-3 text-white text-lg">
                <Twitter className="w-5 h-5" />
                <a href="https://twitter.com/_languagebridge" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">
                  @_languagebridge
                </a>
              </div>
            </div>
            
            <p className="text-lg text-white/90 font-semibold">
              Office Hours: Monday-Friday, 8am-5pm EST
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
