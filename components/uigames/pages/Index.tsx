import { useState } from "react";
import { GameCard } from "@/components/GameCard";
import { Layout } from "@/components/Layout";
import { FortuneTiger } from "@/games/FortuneTiger";
import { Raspadinha } from "@/games/Raspadinha";
import { Blackjack } from "@/games/Blackjack";
import { Crash } from "@/games/Crash";

type GameType = "home" | "tiger" | "scratch" | "blackjack" | "crash";

const Index = () => {
  const [currentGame, setCurrentGame] = useState<GameType>("home");

  if (currentGame === "tiger") return <FortuneTiger onBack={() => setCurrentGame("home")} />;
  if (currentGame === "scratch") return <Raspadinha onBack={() => setCurrentGame("home")} />;
  if (currentGame === "blackjack") return <Blackjack onBack={() => setCurrentGame("home")} />;
  if (currentGame === "crash") return <Crash onBack={() => setCurrentGame("home")} />;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-6xl font-bold bg-gradient-casino bg-clip-text text-transparent mb-4 animate-glow">
            🎰 CASSINO ROYAL
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Os melhores jogos de cassino com prêmios incríveis!
          </p>
          <div className="flex justify-center gap-4 text-sm text-casino-gold">
            <span>🔥 Jogos em tempo real</span>
            <span>💰 Prêmios instantâneos</span>
            <span>🎯 100% profissional</span>
          </div>
        </div>

        {/* Featured Games */}
        <section>
          <h2 className="text-3xl font-bold text-casino-gold mb-6 text-center">🌟 Jogos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GameCard
              title="Fortune Tiger"
              description="O jogo do tigrinho da sorte com multiplicadores incríveis!"
              icon="🐅"
              onClick={() => setCurrentGame("tiger")}
              featured={true}
            />
            
            <GameCard
              title="Raspadinha Real"
              description="Raspe e ganhe prêmios instantâneos de até R$ 10.000!"
              icon="🎫"
              onClick={() => setCurrentGame("scratch")}
              featured={true}
            />
            
            <GameCard
              title="Blackjack Royal"
              description="O clássico 21 com as melhores chances de vitória!"
              icon="🃏"
              onClick={() => setCurrentGame("blackjack")}
            />
            
            <GameCard
              title="Crash Game"
              description="Saque antes do foguete explodir e multiplique seus ganhos!"
              icon="🚀"
              onClick={() => setCurrentGame("crash")}
            />
          </div>
        </section>

        {/* Slots Section */}
        <section>
          <h2 className="text-3xl font-bold text-casino-gold mb-6 text-center">🎰 Slots & Caça-Níqueis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GameCard
              title="Mines"
              description="Campo minado com multiplicadores de até 100x!"
              icon="💣"
              onClick={() => {}} // Em breve
            />
            
            <GameCard
              title="Aviator"
              description="O jogo do aviãozinho mais emocionante!"
              icon="✈️"
              onClick={() => {}} // Em breve
            />
            
            <GameCard
              title="Roleta Europea"
              description="A roleta clássica com as melhores odds!"
              icon="🎡"
              onClick={() => {}} // Em breve
            />
            
            <GameCard
              title="Mega Slots"
              description="Slots temáticos com jackpots progressivos!"
              icon="🎊"
              onClick={() => {}} // Em breve
            />
          </div>
        </section>

        {/* Promoções */}
        <section className="bg-gradient-casino p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-white mb-4">🎁 Promoções Especiais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div>
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="text-xl font-bold mb-2">Bônus de Boas-vindas</h3>
              <p>100% no primeiro depósito até R$ 1.000</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🔥</div>
              <h3 className="text-xl font-bold mb-2">Giros Grátis</h3>
              <p>50 giros grátis no Fortune Tiger</p>
            </div>
            <div>
              <div className="text-4xl mb-2">💎</div>
              <h3 className="text-xl font-bold mb-2">VIP Club</h3>
              <p>Cashback exclusivo e prêmios VIP</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;