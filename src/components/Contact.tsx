import { Mail, Phone, Twitter } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto fade-in-up">
          <div className="gradient-primary rounded-3xl p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Classroom?
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-center gap-3 text-white text-xl">
                <Mail className="w-6 h-6" />
                <a href="mailto:inquiry@languagebridge.app" className="hover:underline font-medium">
                  inquiry@languagebridge.app
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-3 text-white text-xl">
                <Phone className="w-6 h-6" />
                <a href="tel:+12168006020" className="hover:underline font-medium">
                  (216) 800-6020
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-3 text-white text-xl">
                <Twitter className="w-6 h-6" />
                <a href="https://twitter.com/_languagebridge" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">
                  @_languagebridge
                </a>
              </div>
            </div>
            
            <p className="text-xl text-white/95 mb-4">
              Reach out today to learn more about our Ohio pilot program or schedule your demonstration.
            </p>
            
            <p className="text-lg text-white/90 font-semibold">
              Office Hours: Monday-Friday, 8am-5pm EST
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
