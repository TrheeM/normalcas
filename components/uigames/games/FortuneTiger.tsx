import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";

const symbols = ["🐅", "💎", "🍀", "⭐", "💰", "🎰"];
const multipliers = [2, 3, 5, 10, 25, 50];

export function FortuneTiger({ onBack }: { onBack: () => void }) {
  const [reels, setReels] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [bet, setBet] = useState([10]);
  const [balance, setBalance] = useState(1000);
  const [lastWin, setLastWin] = useState(0);
  const [gameHistory, setGameHistory] = useState<{ symbols: number[], win: number, multiplier: number }[]>([]);

  const spin = async () => {
    if (spinning || balance < bet[0]) return;
    
    setSpinning(true);
    setBalance(prev => prev - bet[0]);
    setLastWin(0);

    // Animação dos rolos
    for (let i = 0; i < 20; i++) {
      setReels([
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length)
      ]);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Resultado final
    const finalReels = [
      Math.floor(Math.random() * symbols.length),
      Math.floor(Math.random() * symbols.length),
      Math.floor(Math.random() * symbols.length)
    ];
    
    setReels(finalReels);
    
    // Verificar vitória
    let winAmount = 0;
    let multiplier = 1;
    
    // Três iguais
    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      multiplier = multipliers[finalReels[0]] || 2;
      winAmount = bet[0] * multiplier;
      
      if (finalReels[0] === 0) { // Tigre
        winAmount *= 2; // Bônus do tigre
        toast.success(`🐅 TIGRE FORTUNE! Multiplicador ${multiplier}x2!`);
      } else {
        toast.success(`💎 Três iguais! Multiplicador ${multiplier}x!`);
      }
    }
    // Dois iguais
    else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
      multiplier = Math.floor((multipliers[finalReels[0]] || 2) / 2);
      winAmount = bet[0] * multiplier;
      toast.success(`🎰 Dois iguais! Multiplicador ${multiplier}x!`);
    }

    if (winAmount > 0) {
      setBalance(prev => prev + winAmount);
      setLastWin(winAmount);
    }

    setGameHistory(prev => [...prev.slice(-9), { symbols: finalReels, win: winAmount, multiplier }]);
    setSpinning(false);
  };

  return (
    <Layout saldo={balance} onHome={onBack}>
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-casino-gold/30">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-casino bg-clip-text text-transparent mb-2">
              🐅 FORTUNE TIGER
            </h1>
            <p className="text-muted-foreground">O jogo do tigre da sorte</p>
          </div>

          {/* Slot Machine */}
          <div className="relative mb-8">
            <div className="flex justify-center gap-4 mb-6">
              {reels.map((reel, index) => (
                <Card key={index} className="w-24 h-24 flex items-center justify-center bg-gradient-gold border-casino-gold">
                  <span className={`text-4xl ${spinning ? 'animate-spin-slow' : 'animate-glow'}`}>
                    {symbols[reel]}
                  </span>
                </Card>
              ))}
            </div>

            {lastWin > 0 && (
              <div className="text-center animate-bounce-casino">
                <div className="text-3xl font-bold text-casino-gold">
                  + R$ {lastWin.toLocaleString()}
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-4">
              <label className="block text-sm font-medium mb-2 text-casino-gold">Aposta</label>
              <Slider
                value={bet}
                onValueChange={setBet}
                max={100}
                min={1}
                step={1}
                className="mb-2"
              />
              <div className="text-center text-lg font-bold">R$ {bet[0]}</div>
            </Card>

            <Card className="p-4 flex flex-col items-center justify-center">
              <Button 
                onClick={spin}
                disabled={spinning || balance < bet[0]}
                size="lg"
                className="bg-gradient-casino text-white text-xl px-8 py-4 animate-pulse-gold hover:scale-105 transition-transform"
              >
                {spinning ? "🎰 GIRANDO..." : "🐅 GIRAR"}
              </Button>
            </Card>

            <Card className="p-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Saldo</div>
                <div className="text-2xl font-bold text-casino-gold">R$ {balance.toLocaleString()}</div>
              </div>
            </Card>
          </div>

          {/* Paytable */}
          <Card className="p-4 mb-6">
            <h3 className="text-lg font-bold text-casino-gold mb-4">💰 Tabela de Pagamentos</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              {symbols.map((symbol, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xl">{symbol}</span>
                  <span>3x = {multipliers[index]}x</span>
                  {index === 0 && <span className="text-casino-gold font-bold">(Bônus 2x)</span>}
                </div>
              ))}
            </div>
          </Card>

          {/* Game History */}
          {gameHistory.length > 0 && (
            <Card className="p-4">
              <h3 className="text-lg font-bold text-casino-gold mb-4">📊 Histórico</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                {gameHistory.slice(-6).map((game, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    {game.symbols.map((symbol, i) => (
                      <span key={i} className="text-lg">{symbols[symbol]}</span>
                    ))}
                    <span className={game.win > 0 ? "text-casino-gold font-bold" : "text-muted-foreground"}>
                      {game.win > 0 ? `+R$ ${game.win}` : "R$ 0"}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </Card>
      </div>
    </Layout>
  );
}