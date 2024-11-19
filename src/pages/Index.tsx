import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActionButton from "@/components/ActionButton";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-bold">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Găsește-ți Sufletul Pereche
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            UniQ combină puterea compatibilității cu magia comunității pentru a-ți găsi 
            persoanele care rezonează cu adevărat cu tine.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-scale-in">
            <ActionButton variant="primary">
              Începe să Explorezi
              <ArrowRight className="ml-2 h-5 w-5 inline-block" />
            </ActionButton>
            <ActionButton variant="secondary">
              Descoperă Comunitatea
            </ActionButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 rounded-xl bg-white/80 backdrop-blur shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary">Compatibilitate Unică</h3>
              <p className="text-gray-600">Algoritm avansat care găsește persoane cu adevărat compatibile cu tine.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/80 backdrop-blur shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-secondary">Comunitate Vibrantă</h3>
              <p className="text-gray-600">Forum activ unde poți împărtăși experiențe și găsi sfaturi valoroase.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/80 backdrop-blur shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-accent">100% Securizat</h3>
              <p className="text-gray-600">Datele tale sunt protejate cu cele mai avansate tehnologii de securitate.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;