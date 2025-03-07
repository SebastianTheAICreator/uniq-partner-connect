
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  Shield, 
  Sparkles, 
  Star, 
  CircleCheck, 
  Building, 
  Brain, 
  Zap, 
  Globe, 
  Wallet, 
  MessageCircle, 
  Lock, 
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Feed Unificat",
      description: "Conectează-te cu comunitatea și conținutul relevant pentru tine, totul într-un feed personalizat.",
      gradient: "from-blue-600 to-emerald-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Ol-yAI Chat",
      description: "AI avansat pentru conversații naturale, sfaturi personalizate și asistență imediată.",
      gradient: "from-purple-600 to-blue-500"
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "UniBanking",
      description: "Servicii financiare integrate cu securitate de top și experiență fluidă.",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "UniVideo",
      description: "Streaming și conținut video de înaltă calitate adaptat preferințelor tale.",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Matches 16+",
      description: "Conectează-te cu persoane care împart aceleași interese într-un mediu sigur.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "UniQ Enterprise",
      description: "Soluții premium pentru companii care doresc să optimizeze operațiunile digitale.",
      gradient: "from-gray-700 to-gray-900"
    }
  ];

  const testimonials = [
    {
      name: "Alexandru Popescu",
      role: "CEO Tech Innovations",
      content: "UniQ a revoluționat modul în care compania noastră operează digital. Integrarea serviciilor într-o singură platformă a crescut eficiența cu 45%.",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Maria Ionescu",
      role: "Content Creator",
      content: "Niciodată nu am avut o experiență atât de fluidă între rețele sociale, banking și creație de conținut. UniQ este viitorul!",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Daniel Marin",
      role: "Antreprenor",
      content: "De când folosesc UniQ, timpul petrecut între aplicații s-a redus cu 60%. Este un instrument esențial pentru orice business modern.",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ];

  const stats = [
    { value: "5M+", label: "Utilizatori Activi", gradient: "from-blue-500 to-emerald-500" },
    { value: "€2B+", label: "Tranzacții Procesate", gradient: "from-purple-500 to-blue-500" },
    { value: "20M+", label: "Interacțiuni AI/Zi", gradient: "from-emerald-500 to-teal-500" },
    { value: "99.99%", label: "Uptime Anual", gradient: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-emerald-900/20 animate-gradient-x"></div>
        
        {/* Particles/dots background effect */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">
                UniQ
              </span>
              <span className="block mt-2 text-4xl md:text-5xl lg:text-6xl">Viitorul Digitalizării</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
            >
              Prima platformă completă care unifică social media, banking, inteligență artificială și comunități interactive într-o experiență digitală revoluționară.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button 
                onClick={() => navigate('/community')}
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 rounded-full group transition-all duration-300 transform hover:-translate-y-1"
              >
                Explorează Platforma
                <Sparkles className="ml-2 w-5 h-5 group-hover:animate-pulse" />
              </Button>
              
              <Button
                variant="outline"
                className="text-lg px-8 py-6 bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 rounded-full group transition-all duration-300 transform hover:-translate-y-1"
              >
                Află Mai Multe
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Floating devices mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 relative max-w-4xl mx-auto"
          >
            <div className="relative z-10 aspect-[16/9] rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 backdrop-blur-sm p-8">
                <div className="h-full w-full rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                      Platforma UniQ
                    </span>
                    <p className="mt-2 text-gray-300">Imagine de prezentare</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut" 
              }}
              className="absolute -bottom-6 -right-12 w-32 h-32 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20 border border-white/10 transform rotate-12"
            >
              <div className="absolute inset-0.5 rounded-xl bg-black/80 flex items-center justify-center">
                <Brain className="w-12 h-12 text-blue-400" />
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.5,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -top-10 -left-14 w-28 h-28 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/20 border border-white/10 transform -rotate-6"
            >
              <div className="absolute inset-0.5 rounded-xl bg-black/80 flex items-center justify-center">
                <Wallet className="w-10 h-10 text-emerald-400" />
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1"
          >
            <motion.div 
              animate={{ height: ["20%", "60%", "20%"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 bg-white/50 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="bg-[#1A1A1A] border border-white/5 p-8 rounded-2xl hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-[#121212]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              O Platformă. Toate Serviciile.
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              UniQ reunește cele mai avansate servicii digitale într-o experiență fluidă și intuitivă.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-8 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-r ${feature.gradient} rounded-xl p-4 inline-block mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Advantages Section */}
      <section className="py-24 bg-gradient-to-b from-[#121212] to-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                De Ce Să Alegi <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">UniQ</span>
              </h2>
              <p className="text-xl text-gray-400 mb-10">
                UniQ redefinește experiența digitală prin unificarea serviciilor esențiale și implementarea tehnologiilor de vârf.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Zap />, title: "Experiență Unificată", text: "Toate serviciile digitale într-o singură aplicație intuitivă." },
                  { icon: <Brain />, title: "Inteligență Artificială Avansată", text: "AI personalizat care învață din preferințele tale." },
                  { icon: <Lock />, title: "Securitate De Top", text: "Criptare de nivel militar și autentificare multi-factor." },
                  { icon: <CircleCheck />, title: "Experiență Personalizată", text: "Conținut și servicii adaptate nevoilor tale specifice." }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-2 rounded-lg mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-[#1A1A1A] border border-white/5 rounded-2xl p-8">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "350+", label: "Funcționalități", icon: <Star className="w-8 h-8 text-yellow-400" /> },
                      { value: "99.9%", label: "Uptime", icon: <Zap className="w-8 h-8 text-emerald-400" /> },
                      { value: "15+", label: "Sectoare Integrate", icon: <Globe className="w-8 h-8 text-blue-400" /> },
                      { value: "24/7", label: "Suport", icon: <MessageCircle className="w-8 h-8 text-purple-400" /> }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className="bg-[#252525] rounded-xl p-6 flex flex-col items-center text-center"
                      >
                        <div className="mb-4">
                          {item.icon}
                        </div>
                        <h4 className="text-2xl font-bold mb-1">{item.value}</h4>
                        <p className="text-gray-400 text-sm">{item.label}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-[#252525] rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Satisfacție Utilizatori</h4>
                      <span className="text-emerald-400 flex items-center">
                        <span className="mr-1">97%</span>
                        <Star className="w-4 h-4 fill-current" />
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#333] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "97%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ce Spun Utilizatorii
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Descoperă experiențele reale ale comunității UniQ.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-8 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">"{testimonial.content}"</p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certification Section */}
      <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-12">Certificări și Parteneriate</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {['ISO 27001', 'GDPR', 'PCI DSS', 'SOC 2'].map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1A1A1A] border border-white/5 p-6 rounded-xl flex flex-col items-center"
                >
                  <Shield className="w-10 h-10 text-emerald-400 mb-4" />
                  <p className="text-gray-300 text-sm">{cert}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-[#121212]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20"></div>
            <div className="relative z-10 p-12 md:p-16 text-center flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Începe Experiența UniQ
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl">
                Alătură-te celor peste 5 milioane de utilizatori care și-au transformat viața digitală cu UniQ.
              </p>
              <Button 
                onClick={() => navigate('/community')}
                className="text-lg px-10 py-6 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 rounded-full group transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-blue-500/20"
              >
                Începe Acum
                <Sparkles className="ml-2 w-5 h-5 group-hover:animate-pulse" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
