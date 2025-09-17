import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";

export function Crash({ onBack }: { onBack: () => void }) {
  const [gameState, setGameState] = useState<"waiting" | "flying" | "crashed">("waiting");
  const [multiplier, setMultiplier] = useState(1.00);
  const [bet, setBet] = useState([10]);
  const [balance, setBalance] = useState(1000);
  const [cashedOut, setCashedOut] = useState(false);
  const [cashOutAt, setCashOutAt] = useState(0);
  const [gameHistory, setGameHistory] = useState<{ bet: number, multiplier: number, won: number }[]>([]);
  const [autoCashOut, setAutoCashOut] = useState([2]);
  const [hasAutoCashOut, setHasAutoCashOut] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const gameStartTime = useRef<number>(0);

  const startGame = () => {
    if (balance < bet[0]) {
      toast.error("Saldo insuficiente!");
      return;
    }

    setBalance(prev => prev - bet[0]);
    setGameState("flying");
    setMultiplier(1.00);
    setCashedOut(false);
    setCashOutAt(0);
    gameStartTime.current = Date.now();

    // Determinar quando o jogo vai crashar (entre 1.00x e 50x, mais provável nos valores baixos)
    const crashPoint = Math.max(1.01, Math.pow(Math.random(), 2) * 20 + 1);
    
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - gameStartTime.current) / 1000;
      const currentMultiplier = 1 + (elapsed * 0.5); // Cresce 0.5x por segundo
      
      setMultiplier(currentMultiplier);
      
      // Auto cash out
      if (hasAutoCashOut && currentMultiplier >= autoCashOut[0] && !cashedOut) {
        cashOut(currentMultiplier);
        return;
      }
      
      // Verificar crash
      if (currentMultiplier >= crashPoint) {
        crash(currentMultiplier);
      }
    }, 50);
  };

  const cashOut = (currentMultiplier?: number) => {
    if (gameState !== "flying" || cashedOut) return;
    
    const finalMultiplier = currentMultiplier || multiplier;
    const winAmount = Math.floor(bet[0] * finalMultiplier);
    
    setCashedOut(true);
    setCashOutAt(finalMultiplier);
    setBalance(prev => prev + winAmount);
    
    toast.success(`💰 Cash out em ${finalMultiplier.toFixed(2)}x! +R$ ${winAmount}`);
  };

  const crash = (crashMultiplier: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setGameState("crashed");
    setMultiplier(crashMultiplier);
    
    const result = cashedOut 
      ? { bet: bet[0], multiplier: cashOutAt, won: Math.floor(bet[0] * cashOutAt) - bet[0] }
      : { bet: bet[0], multiplier: crashMultiplier, won: -bet[0] };
    
    setGameHistory(prev => [...prev.slice(-9), result]);
    
    if (!cashedOut) {
      toast.error(`💥 Crashed em ${crashMultiplier.toFixed(2)}x!`);
    }
    
    setTimeout(() => {
      setGameState("waiting");
    }, 2000);
  };

  const newRound = () => {
    setGameState("waiting");
    setMultiplier(1.00);
    setCashedOut(false);
    setCashOutAt(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Layout saldo={balance} onHome={onBack}>
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-casino-gold/30">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-casino bg-clip-text text-transparent mb-2">
              🚀 CRASH GAME
            </h1>
            <p className="text-muted-foreground">Saque antes que o foguete exploda!</p>
          </div>

          {/* Display do multiplicador */}
          <div className="text-center mb-8">
            <Card className={`p-8 mx-auto max-w-md ${
              gameState === "flying" ? "bg-gradient-gold animate-pulse-gold" :
              gameState === "crashed" ? "bg-gradient-red" : "bg-gradient-to-br from-card to-muted"
            }`}>
              <div className="text-6xl font-bold text-center">
                {gameState === "flying" ? "🚀" : gameState === "crashed" ? "💥" : "⏳"}
              </div>
              <div className={`text-4xl font-bold mt-4 ${
                gameState === "flying" ? "text-background animate-bounce-casino" :
                gameState === "crashed" ? "text-white" : "text-casino-gold"
              }`}>
                {multiplier.toFixed(2)}x
              </div>
              
              {cashedOut && (
                <div className="text-lg font-bold text-casino-green mt-2 animate-glow">
                  ✅ CASH OUT EM {cashOutAt.toFixed(2)}x
                </div>
              )}
              
              {gameState === "crashed" && !cashedOut && (
                <div className="text-lg font-bold text-white mt-2">
                  PERDEU!
                </div>
              )}
            </Card>
          </div>

          {/* Controles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Aposta */}
            <Card className="p-4">
              <label className="block text-sm font-medium mb-2 text-casino-gold">Aposta</label>
              <Slider
                value={bet}
                onValueChange={setBet}
                max={Math.min(balance, 100)}
                min={1}
                step={1}
                className="mb-2"
                disabled={gameState === "flying"}
              />
              <div className="text-center text-lg font-bold">R$ {bet[0]}</div>
            </Card>

            {/* Auto Cash Out */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <input 
                  type="checkbox" 
                  checked={hasAutoCashOut}
                  onChange={(e) => setHasAutoCashOut(e.target.checked)}
                  disabled={gameState === "flying"}
                  className="rounded"
                />
                <label className="text-sm font-medium text-casino-gold">Auto Cash Out</label>
              </div>
              <Slider
                value={autoCashOut}
                onValueChange={setAutoCashOut}
                max={10}
                min={1.1}
                step={0.1}
                className="mb-2"
                disabled={gameState === "flying" || !hasAutoCashOut}
              />
              <div className="text-center text-lg font-bold">{autoCashOut[0].toFixed(1)}x</div>
            </Card>
          </div>

          {/* Botões de ação */}
          <div className="text-center space-y-4">
            {gameState === "waiting" && (
              <Button 
                onClick={startGame}
                disabled={balance < bet[0]}
                size="lg"
                className="bg-gradient-casino text-white text-xl px-12 py-6 hover:scale-105 transition-transform"
              >
                🚀 COMEÇAR VÔOO
              </Button>
            )}
            
            {gameState === "flying" && !cashedOut && (
              <Button 
                onClick={() => cashOut()}
                size="lg"
                className="bg-gradient-gold text-background text-xl px-12 py-6 animate-pulse-gold hover:scale-105 transition-transform"
              >
                💰 CASH OUT ({multiplier.toFixed(2)}x)
              </Button>
            )}
            
            {gameState === "crashed" && (
              <Button 
                onClick={newRound}
                size="lg"
                className="bg-gradient-casino text-white text-xl px-12 py-6 hover:scale-105 transition-transform"
              >
                🚀 NOVA RODADA
              </Button>
            )}
          </div>

          {/* Informações da aposta atual */}
          {gameState === "flying" && (
            <Card className="p-4 mt-6">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-muted-foreground">Aposta</div>
                  <div className="font-bold text-casino-red">R$ {bet[0]}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Ganho Potencial</div>
                  <div className="font-bold text-casino-gold">R$ {Math.floor(bet[0] * multiplier)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Lucro</div>
                  <div className="font-bold text-casino-green">R$ {Math.floor(bet[0] * multiplier) - bet[0]}</div>
                </div>
              </div>
            </Card>
          )}

          {/* Histórico */}
          {gameHistory.length > 0 && (
            <Card className="p-4 mt-8">
              <h3 className="text-lg font-bold text-casino-gold mb-4">📊 Histórico de Vôos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {gameHistory.slice(-8).map((game, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>{game.multiplier.toFixed(2)}x</span>
                    <span className="text-casino-red">R$ {game.bet}</span>
                    <span className={game.won > 0 ? "text-casino-gold font-bold" : "text-casino-red"}>
                      {game.won > 0 ? `+R$ ${game.won}` : `R$ ${game.won}`}
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