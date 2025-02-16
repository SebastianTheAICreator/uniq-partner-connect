import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActionButton from "@/components/ActionButton";
import { ArrowRight, Users, Heart, Shield, TrendingUp, MessageCircle, Activity, Wallet, Bot, Clock, Star, Sparkles, VideoIcon, Building2, Brain, UserPlus, Lock, Smartphone, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const navigate = useNavigate();
  const stats = [{
    label: "Utilizatori Activi",
    value: "1M+",
    icon: Users
  }, {
    label: "Tranzacții UniBanking",
    value: "€500M+",
    icon: Wallet
  }, {
    label: "Interacțiuni AI/Zi",
    value: "5M+",
    icon: Bot
  }, {
    label: "Timp Mediu/Zi",
    value: "45min",
    icon: Clock
  }, {
    label: "Rating App Store",
    value: "4.9★",
    icon: Star
  }];
  const features = [{
    title: "Feed Unificat",
    icon: Activity,
    color: "from-blue-400 to-green-400"
  }, {
    title: "UniVideo",
    icon: VideoIcon,
    color: "from-purple-400 to-pink-400"
  }, {
    title: "UniBanking",
    icon: Building2,
    color: "from-green-400 to-teal-400"
  }, {
    title: "Ol-yAIChat",
    icon: Brain,
    color: "from-blue-400 to-indigo-400"
  }, {
    title: "Matches 16+",
    icon: UserPlus,
    color: "from-pink-400 to-rose-400"
  }, {
    title: "UniQ EnterprisePRO",
    icon: Building2,
    color: "from-gray-400 to-slate-400"
  }];
  const benefits = [{
    title: "Integrare AI Avansată",
    description: "AI personalizat în toate serviciile pentru o experiență unică",
    icon: Brain,
    gradient: "from-blue-400 to-indigo-400"
  }, {
    title: "Securitate Maximă",
    description: "Protecție avansată a datelor și tranzacțiilor",
    icon: Lock,
    gradient: "from-green-400 to-emerald-400"
  }, {
    title: "Multi-Platform",
    description: "Conectivitate perfectă pe toate dispozitivele",
    icon: Smartphone,
    gradient: "from-purple-400 to-pink-400"
  }, {
    title: "Enterprise Ready",
    description: "Soluții complete pentru companii",
    icon: Building2,
    gradient: "from-gray-400 to-slate-400"
  }];
  return <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-900/10 to-emerald-900/10">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-32 pb-16 space-y-24 bg-[#1f272e]/[0.67]">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="max-w-4xl mx-auto text-center space-y-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-poppins leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent animate-text-shine">
              UniQ - Viitorul Conectivității Digitale
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 font-inter max-w-2xl mx-auto leading-relaxed">
            Platformă completă de social networking, banking digital, inteligență artificială și comunități 
            interactive într-o singură experiență revoluționară.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <ActionButton variant="primary" className="group w-full sm:w-auto text-lg font-medium px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl" onClick={() => navigate('/community')}>
              Începe Experiența UniQ
              <Sparkles className="ml-2 h-5 w-5 inline-block transition-transform group-hover:scale-110" />
            </ActionButton>
            <ActionButton variant="secondary" className="group w-full sm:w-auto text-lg font-medium px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl text-white">
              Descoperă Toate Funcțiile
              <ArrowRight className="ml-2 h-5 w-5 inline-block transition-transform group-hover:translate-x-1" />
            </ActionButton>
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => <motion.div key={stat.label} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1 * index
        }} className="glass-card p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/5 backdrop-blur-sm border border-white/10">
              <stat.icon className="w-10 h-10 text-blue-400 mb-4 animate-float" />
              <h3 className="font-bold font-poppins text-white mb-2 text-2xl">
                {stat.value}
              </h3>
              <p className="text-gray-400 font-inter">
                {stat.label}
              </p>
            </motion.div>)}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <motion.div key={feature.title} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2 + index * 0.1
        }} className="glass-card p-8 rounded-xl hover:shadow-xl transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/20 hover:scale-[1.02]">
              <div className={`bg-gradient-to-r ${feature.color} rounded-xl p-4 mb-6 bg-opacity-20`}>
                <feature.icon className="w-10 h-10 text-white mx-auto animate-float" />
              </div>
              <h3 className="text-xl font-semibold font-poppins mb-4 text-white">
                {feature.title}
              </h3>
            </motion.div>)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => <motion.div key={benefit.title} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4 + index * 0.1
        }} className="glass-card p-8 rounded-xl hover:shadow-xl transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:scale-[1.02]">
              <div className={`bg-gradient-to-r ${benefit.gradient} rounded-xl p-4 mb-6 bg-opacity-20`}>
                <benefit.icon className="w-10 h-10 text-white mx-auto animate-float" />
              </div>
              <h3 className="text-xl font-semibold font-poppins mb-4 text-white">
                {benefit.title}
              </h3>
              <p className="text-gray-300 font-inter">
                {benefit.description}
              </p>
            </motion.div>)}
        </div>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.8
      }} className="max-w-4xl mx-auto mt-16 p-12 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h2 className="text-3xl font-bold font-poppins mb-6 text-center text-white">
            Certificări și Parteneriate
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            {['ISO 27001', 'GDPR', 'PCI DSS', 'SOC 2'].map((cert, index) => <div key={cert} className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
                <p className="font-inter text-gray-500">{cert}</p>
              </div>)}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>;
};
export default Index;