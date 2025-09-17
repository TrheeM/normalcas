import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";

interface ScratchCard {
  id: number;
  price: number;
  theme: string;
  emoji: string;
  maxPrize: number;
  winChance: number;
}

const cardTypes: ScratchCard[] = [
  { id: 1, price: 5, theme: "Tesouro", emoji: "💎", maxPrize: 500, winChance: 0.3 },
  { id: 2, price: 10, theme: "Fortuna", emoji: "🍀", maxPrize: 1000, winChance: 0.25 },
  { id: 3, price: 25, theme: "Jackpot", emoji: "💰", maxPrize: 5000, winChance: 0.2 },
  { id: 4, price: 50, theme: "Royal", emoji: "👑", maxPrize: 10000, winChance: 0.15 },
];

export function Raspadinha({ onBack }: { onBack: () => void }) {
  const [balance, setBalance] = useState(1000);
  const [selectedCard, setSelectedCard] = useState<ScratchCard | null>(null);
  const [scratchedFields, setScratchedFields] = useState<boolean[]>([]);
  const [gameField, setGameField] = useState<number[]>([]);
  const [gameActive, setGameActive] = useState(false);
  const [prize, setPrize] = useState(0);
  const [gameHistory, setGameHistory] = useState<{ card: string, spent: number, won: number }[]>([]);

  const buyCard = (card: ScratchCard) => {
    if (balance < card.price) {
      toast.error("Saldo insuficiente!");
      return;
    }

    setBalance(prev => prev - card.price);
    setSelectedCard(card);
    
    // Gerar campo de jogo (9 campos com números)
    const field = [];
    const winNumber = Math.floor(Math.random() * 9) + 1;
    const shouldWin = Math.random() < card.winChance;
    
    for (let i = 0; i < 9; i++) {
      if (shouldWin && i < 3) {
        field.push(winNumber); // Três números iguais para vitória
      } else {
        field.push(Math.floor(Math.random() * 9) + 1);
      }
    }
    
    // Embaralhar
    for (let i = field.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [field[i], field[j]] = [field[j], field[i]];
    }
    
    setGameField(field);
    setScratchedFields(new Array(9).fill(false));
    setGameActive(true);
    setPrize(0);
    
    toast.success(`Raspadinha ${card.theme} comprada!`);
  };

  const scratchField = (index: number) => {
    if (!gameActive || scratchedFields[index]) return;
    
    const newScratched = [...scratchedFields];
    newScratched[index] = true;
    setScratchedFields(newScratched);

    // Verificar vitória após riscar
    const scratchedNumbers = gameField.filter((_, i) => newScratched[i]);
    const numberCount: { [key: number]: number } = {};
    
    scratchedNumbers.forEach(num => {
      numberCount[num] = (numberCount[num] || 0) + 1;
    });

    // Verificar se tem 3 números iguais
    const hasThreeOfAKind = Object.values(numberCount).some(count => count >= 3);
    
    if (hasThreeOfAKind && selectedCard) {
      const winAmount = Math.floor(selectedCard.maxPrize * (0.1 + Math.random() * 0.9));
      setPrize(winAmount);
      setBalance(prev => prev + winAmount);
      setGameActive(false);
      toast.success(`🎉 Parabéns! Você ganhou R$ ${winAmount}!`);
      
      setGameHistory(prev => [...prev.slice(-9), {
        card: selectedCard.theme,
        spent: selectedCard.price,
        won: winAmount
      }]);
    }
    
    // Se riscou todos os campos e não ganhou
    if (newScratched.every(Boolean) && !hasThreeOfAKind) {
      setGameActive(false);
      toast.error("Não foi dessa vez!");
      
      if (selectedCard) {
        setGameHistory(prev => [...prev.slice(-9), {
          card: selectedCard.theme,
          spent: selectedCard.price,
          won: 0
        }]);
      }
    }
  };

  const resetGame = () => {
    setSelectedCard(null);
    setGameActive(false);
    setScratchedFields([]);
    setGameField([]);
    setPrize(0);
  };

  return (
    <Layout saldo={balance} onHome={onBack}>
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-casino-gold/30">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-casino bg-clip-text text-transparent mb-2">
              🎫 RASPADINHA REAL
            </h1>
            <p className="text-muted-foreground">Escolha sua sorte e rasque para ganhar!</p>
          </div>

          {!selectedCard ? (
            /* Seleção de cartas */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cardTypes.map((card) => (
                <Card 
                  key={card.id}
                  className="p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-gold border-casino-gold/20 hover:border-casino-gold/50"
                  onClick={() => buyCard(card)}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-glow">{card.emoji}</div>
                    <h3 className="text-xl font-bold text-casino-gold mb-2">{card.theme}</h3>
                    <div className="space-y-2 text-sm">
                      <div>Preço: <span className="font-bold text-casino-red">R$ {card.price}</span></div>
                      <div>Prêmio máximo: <span className="font-bold text-casino-gold">R$ {card.maxPrize.toLocaleString()}</span></div>
                      <div>Chance: <span className="font-bold">{(card.winChance * 100).toFixed(0)}%</span></div>
                    </div>
                    <Button 
                      className="mt-4 bg-gradient-gold text-background hover:bg-casino-gold-light"
                      disabled={balance < card.price}
                    >
                      Comprar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* Jogo ativo */
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-casino-gold mb-2">
                  {selectedCard.emoji} Raspadinha {selectedCard.theme}
                </h2>
                <p className="text-muted-foreground">Rasque os campos para encontrar 3 números iguais!</p>
                {prize > 0 && (
                  <div className="text-3xl font-bold text-casino-gold animate-bounce-casino mt-4">
                    🎉 GANHOU R$ {prize.toLocaleString()}! 🎉
                  </div>
                )}
              </div>

              {/* Campo de raspagem */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                {gameField.map((number, index) => (
                  <Card 
                    key={index}
                    className={`aspect-square flex items-center justify-center text-2xl font-bold cursor-pointer transition-all duration-300 ${
                      scratchedFields[index] 
                        ? 'bg-gradient-gold text-background border-casino-gold' 
                        : 'bg-muted hover:bg-muted/80 border-casino-gold/20'
                    }`}
                    onClick={() => scratchField(index)}
                  >
                    {scratchedFields[index] ? number : '?'}
                  </Card>
                ))}
              </div>

              <div className="text-center space-y-4">
                <div className="text-sm text-muted-foreground">
                  Campos riscados: {scratchedFields.filter(Boolean).length}/9
                </div>
                
                <Button 
                  onClick={resetGame}
                  variant="outline"
                  className="border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-background"
                >
                  Nova Raspadinha
                </Button>
              </div>
            </div>
          )}

          {/* Histórico */}
          {gameHistory.length > 0 && (
            <Card className="p-4 mt-8">
              <h3 className="text-lg font-bold text-casino-gold mb-4">📊 Histórico de Jogos</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {gameHistory.slice(-10).reverse().map((game, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                    <span>{game.card}</span>
                    <span className="text-casino-red">-R$ {game.spent}</span>
                    <span className={game.won > 0 ? "text-casino-gold font-bold" : "text-muted-foreground"}>
                      {game.won > 0 ? `+R$ ${game.won}` : "Sem prêmio"}
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