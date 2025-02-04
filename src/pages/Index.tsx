import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActionButton from "@/components/ActionButton";
import { ArrowRight, Users, Heart, Shield, TrendingUp, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Comunități Active", value: "500+", icon: Users },
    { label: "Membri Conectați", value: "10k+", icon: Heart },
    { label: "Conversații Zilnice", value: "2k+", icon: MessageCircle },
    { label: "Rata de Creștere", value: "+25%", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-32 pb-16 space-y-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-12"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-poppins leading-tight text-gray-900">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-text-shine">
              Găsește-ți Comunitatea Ta
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 font-inter max-w-2xl mx-auto leading-relaxed">
            UniQ este locul unde fiecare persoană își poate găsi comunitatea care o înțelege și o acceptă,
            indiferent de preferințe, orientare sau stil de viață.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <ActionButton 
              variant="primary" 
              className="group w-full sm:w-auto text-lg font-medium px-8 py-4 bg-accent hover:bg-accent-hover transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl"
              onClick={() => navigate('/community')}
            >
              Explorează Comunități
              <Users className="ml-2 h-5 w-5 inline-block transition-transform group-hover:scale-110" />
            </ActionButton>
            <ActionButton 
              variant="secondary"
              className="group w-full sm:w-auto text-lg font-medium px-8 py-4 bg-interactive hover:bg-interactive-hover transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl"
            >
              Găsește Conexiuni
              <Heart className="ml-2 h-5 w-5 inline-block transition-transform group-hover:scale-110" />
            </ActionButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass-card p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/50 backdrop-blur-sm border border-white/20"
            >
              <stat.icon className="w-10 h-10 text-primary mb-4 animate-float" />
              <h3 className="text-3xl font-bold font-poppins text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 font-inter">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-8 rounded-2xl hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm border border-white/20"
          >
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-4 mb-6">
              <Users className="w-10 h-10 text-primary mx-auto animate-float" />
            </div>
            <h3 className="text-xl font-semibold font-poppins mb-4 bg-gradient-to-r from-primary via-primary-hover to-primary bg-clip-text text-transparent">
              Comunități Diverse
            </h3>
            <p className="text-gray-600 font-inter">
              Găsește grupuri care împărtășesc aceleași valori, interese și experiențe ca tine.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-8 rounded-2xl hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm border border-white/20"
          >
            <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl p-4 mb-6">
              <Heart className="w-10 h-10 text-secondary mx-auto animate-float" />
            </div>
            <h3 className="text-xl font-semibold font-poppins mb-4 bg-gradient-to-r from-secondary via-secondary-hover to-secondary bg-clip-text text-transparent">
              Conexiuni Autentice
            </h3>
            <p className="text-gray-600 font-inter">
              Creează legături profunde cu persoane care te înțeleg cu adevărat.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-8 rounded-2xl hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm border border-white/20"
          >
            <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-4 mb-6">
              <Shield className="w-10 h-10 text-accent mx-auto animate-float" />
            </div>
            <h3 className="text-xl font-semibold font-poppins mb-4 bg-gradient-to-r from-accent via-accent-hover to-accent bg-clip-text text-transparent">
              Spațiu Sigur
            </h3>
            <p className="text-gray-600 font-inter">
              Un mediu protejat unde poți fi tu însuți, fără judecată sau discriminare.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto mt-16 p-12 rounded-3xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm border border-white/20"
        >
          <h2 className="text-3xl font-bold font-poppins mb-6 text-center text-gray-900">
            Fiecare Poveste Contează
          </h2>
          <p className="text-xl text-gray-600 font-inter text-center max-w-2xl mx-auto leading-relaxed">
            La UniQ, credem că fiecare persoană merită să găsească conexiuni autentice și să facă parte 
            dintr-o comunitate care o acceptă și o celebrează exact așa cum este.
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;