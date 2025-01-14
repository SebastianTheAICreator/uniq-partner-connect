import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActionButton from "@/components/ActionButton";
import { ArrowRight, Users, Heart, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Găsește-ți Comunitatea Ta
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              UniQ este locul unde fiecare persoană își poate găsi comunitatea care o înțelege și o acceptă,
              indiferent de preferințe, orientare sau stil de viață.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <ActionButton 
              variant="primary" 
              className="group"
              onClick={() => navigate('/community')}
            >
              Explorează Comunități
              <Users className="ml-2 h-5 w-5 inline-block transition-transform group-hover:scale-110" />
            </ActionButton>
            <ActionButton variant="secondary" className="group">
              Găsește Conexiuni
              <Heart className="ml-2 h-5 w-5 inline-block transition-transform group-hover:scale-110" />
            </ActionButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-8 rounded-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-4 mb-6">
                <Users className="w-10 h-10 text-primary mx-auto animate-float" />
              </div>
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary via-primary-hover to-primary bg-clip-text text-transparent animate-text-shine">
                Comunități Diverse
              </h3>
              <p className="text-gray-300/80">
                Găsește grupuri care împărtășesc aceleași valori, interese și experiențe ca tine.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-8 rounded-xl hover:border-secondary/30 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg p-4 mb-6">
                <Heart className="w-10 h-10 text-secondary mx-auto animate-float" />
              </div>
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-secondary via-secondary-hover to-secondary bg-clip-text text-transparent animate-text-shine">
                Conexiuni Autentice
              </h3>
              <p className="text-gray-300/80">
                Creează legături profunde cu persoane care te înțeleg cu adevărat.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-8 rounded-xl hover:border-accent/30 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg p-4 mb-6">
                <Shield className="w-10 h-10 text-accent mx-auto animate-float" />
              </div>
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-accent via-accent-hover to-accent bg-clip-text text-transparent animate-text-shine">
                Spațiu Sigur
              </h3>
              <p className="text-gray-300/80">
                Un mediu protejat unde poți fi tu însuți, fără judecată sau discriminare.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-semibold mb-4">Fiecare Poveste Contează</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              La UniQ, credem că fiecare persoană merită să găsească conexiuni autentice și să facă parte 
              dintr-o comunitate care o acceptă și o celebrează exact așa cum este.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
