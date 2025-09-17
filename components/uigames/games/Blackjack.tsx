import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";

interface PlayingCard {
  suit: string;
  value: string;
  points: number;
}

const suits = ["♠️", "♥️", "♦️", "♣️"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export function Blackjack({ onBack }: { onBack: () => void }) {
  const [deck, setDeck] = useState<PlayingCard[]>([]);
  const [playerHand, setPlayerHand] = useState<PlayingCard[]>([]);
  const [dealerHand, setDealerHand] = useState<PlayingCard[]>([]);
  const [gameState, setGameState] = useState<"betting" | "playing" | "dealer" | "finished">("betting");
  const [bet, setBet] = useState([10]);
  const [balance, setBalance] = useState(1000);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerHidden, setDealerHidden] = useState(true);
  const [gameResult, setGameResult] = useState<string>("");
  const [gameHistory, setGameHistory] = useState<{ bet: number, result: string, won: number }[]>([]);

  const createDeck = (): PlayingCard[] => {
    const newDeck: PlayingCard[] = [];
    suits.forEach(suit => {
      values.forEach(value => {
        let points = parseInt(value);
        if (value === "A") points = 11;
        else if (["J", "Q", "K"].includes(value)) points = 10;
        
        newDeck.push({ suit, value, points });
      });
    });
    
    // Embaralhar
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    
    return newDeck;
  };

  const calculateScore = (hand: PlayingCard[]): number => {
    let score = 0;
    let aces = 0;
    
    hand.forEach(card => {
      if (card.value === "A") {
        aces++;
        score += 11;
      } else {
        score += card.points;
      }
    });
    
    // Ajustar ases
    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }
    
    return score;
  };

  const startGame = () => {
    if (balance < bet[0]) {
      toast.error("Saldo insuficiente!");
      return;
    }

    const newDeck = createDeck();
    const playerCards = [newDeck.pop()!, newDeck.pop()!];
    const dealerCards = [newDeck.pop()!, newDeck.pop()!];
    
    setDeck(newDeck);
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setPlayerScore(calculateScore(playerCards));
    setDealerScore(calculateScore([dealerCards[0]])); // Só primeira carta
    setDealerHidden(true);
    setGameState("playing");
    setGameResult("");
    setBalance(prev => prev - bet[0]);
    
    // Verificar blackjack natural
    if (calculateScore(playerCards) === 21) {
      if (calculateScore(dealerCards) === 21) {
        endGame("push");
      } else {
        endGame("blackjack");
      }
    }
  };

  const hit = () => {
    if (gameState !== "playing" || deck.length === 0) return;
    
    const newCard = deck.pop()!;
    const newPlayerHand = [...playerHand, newCard];
    const newScore = calculateScore(newPlayerHand);
    
    setPlayerHand(newPlayerHand);
    setPlayerScore(newScore);
    setDeck([...deck]);
    
    if (newScore > 21) {
      endGame("bust");
    }
  };

  const stand = () => {
    setGameState("dealer");
    setDealerHidden(false);
    
    // Dealer joga
    let currentDealerHand = [...dealerHand];
    let currentDeck = [...deck];
    let dealerCurrentScore = calculateScore(currentDealerHand);
    
    while (dealerCurrentScore < 17) {
      const newCard = currentDeck.pop()!;
      currentDealerHand.push(newCard);
      dealerCurrentScore = calculateScore(currentDealerHand);
    }
    
    setDealerHand(currentDealerHand);
    setDealerScore(dealerCurrentScore);
    setDeck(currentDeck);
    
    // Determinar vencedor
    setTimeout(() => {
      if (dealerCurrentScore > 21) {
        endGame("dealer_bust");
      } else if (dealerCurrentScore > playerScore) {
        endGame("dealer_wins");
      } else if (playerScore > dealerCurrentScore) {
        endGame("player_wins");
      } else {
        endGame("push");
      }
    }, 1000);
  };

  const endGame = (result: string) => {
    let winAmount = 0;
    let message = "";
    
    switch (result) {
      case "blackjack":
        winAmount = Math.floor(bet[0] * 2.5);
        message = "🎉 BLACKJACK! Você ganhou!";
        break;
      case "player_wins":
        winAmount = bet[0] * 2;
        message = "🎉 Você venceu!";
        break;
      case "dealer_bust":
        winAmount = bet[0] * 2;
        message = "🎉 Dealer estourou! Você venceu!";
        break;
      case "push":
        winAmount = bet[0];
        message = "🤝 Empate! Aposta devolvida.";
        break;
      case "bust":
        message = "💥 Você estourou! Dealer venceu.";
        break;
      case "dealer_wins":
        message = "😔 Dealer venceu.";
        break;
    }
    
    setBalance(prev => prev + winAmount);
    setGameResult(message);
    setGameState("finished");
    
    setGameHistory(prev => [...prev.slice(-9), {
      bet: bet[0],
      result: message,
      won: winAmount - bet[0]
    }]);
    
    toast(message);
  };

  const newGame = () => {
    setGameState("betting");
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerScore(0);
    setDealerScore(0);
    setGameResult("");
  };

  return (
    <Layout saldo={balance} onHome={onBack}>
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-casino-gold/30">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-casino bg-clip-text text-transparent mb-2">
              🃏 BLACKJACK ROYAL
            </h1>
            <p className="text-muted-foreground">Chegue o mais próximo de 21 sem estourar!</p>
          </div>

          {gameState === "betting" ? (
            /* Tela de apostas */
            <div className="space-y-6">
              <Card className="p-6 max-w-md mx-auto">
                <label className="block text-sm font-medium mb-4 text-casino-gold text-center">
                  Valor da Aposta
                </label>
                <Slider
                  value={bet}
                  onValueChange={setBet}
                  max={Math.min(balance, 100)}
                  min={1}
                  step={1}
                  className="mb-4"
                />
                <div className="text-center text-2xl font-bold text-casino-gold mb-6">
                  R$ {bet[0]}
                </div>
                
                <Button 
                  onClick={startGame}
                  disabled={balance < bet[0]}
                  size="lg"
                  className="w-full bg-gradient-casino text-white hover:scale-105 transition-transform"
                >
                  Iniciar Jogo
                </Button>
              </Card>
            </div>
          ) : (
            /* Tela de jogo */
            <div className="space-y-8">
              {/* Dealer */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-casino-gold mb-4">
                  Dealer {!dealerHidden && `(${dealerScore})`}
                </h3>
                <div className="flex justify-center gap-2 mb-4">
                  {dealerHand.map((card, index) => (
                    <Card 
                      key={index}
                      className={`w-16 h-24 flex flex-col items-center justify-center text-lg font-bold ${
                        index === 1 && dealerHidden 
                          ? 'bg-casino-red text-white' 
                          : 'bg-white text-black border-2 border-casino-gold'
                      }`}
                    >
                      {index === 1 && dealerHidden ? (
                        <div>🂠</div>
                      ) : (
                        <>
                          <div className="text-xs">{card.suit}</div>
                          <div>{card.value}</div>
                        </>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              {/* Player */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-casino-gold mb-4">
                  Você ({playerScore})
                </h3>
                <div className="flex justify-center gap-2 mb-4">
                  {playerHand.map((card, index) => (
                    <Card 
                      key={index}
                      className="w-16 h-24 flex flex-col items-center justify-center text-lg font-bold bg-white text-black border-2 border-casino-gold animate-slide-up"
                    >
                      <div className="text-xs">{card.suit}</div>
                      <div>{card.value}</div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Controles */}
              <div className="flex justify-center gap-4">
                {gameState === "playing" && (
                  <>
                    <Button 
                      onClick={hit}
                      size="lg"
                      className="bg-gradient-gold text-background hover:bg-casino-gold-light"
                    >
                      Pedir Carta
                    </Button>
                    <Button 
                      onClick={stand}
                      size="lg"
                      variant="outline"
                      className="border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-background"
                    >
                      Parar
                    </Button>
                  </>
                )}
                
                {gameState === "finished" && (
                  <div className="text-center space-y-4">
                    <div className="text-2xl font-bold text-casino-gold">
                      {gameResult}
                    </div>
                    <Button 
                      onClick={newGame}
                      size="lg"
                      className="bg-gradient-casino text-white hover:scale-105 transition-transform"
                    >
                      Novo Jogo
                    </Button>
                  </div>
                )}
              </div>

              {/* Informações do jogo */}
              <Card className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="text-muted-foreground">Aposta</div>
                    <div className="font-bold text-casino-red">R$ {bet[0]}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Saldo</div>
                    <div className="font-bold text-casino-gold">R$ {balance}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Cartas no deck</div>
                    <div className="font-bold">{deck.length}</div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Histórico */}
          {gameHistory.length > 0 && (
            <Card className="p-4 mt-8">
              <h3 className="text-lg font-bold text-casino-gold mb-4">📊 Histórico de Jogos</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {gameHistory.slice(-10).reverse().map((game, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                    <span>R$ {game.bet}</span>
                    <span className="text-center flex-1">{game.result}</span>
                    <span className={game.won > 0 ? "text-casino-gold font-bold" : game.won < 0 ? "text-casino-red" : "text-muted-foreground"}>
                      {game.won > 0 ? `+R$ ${game.won}` : game.won < 0 ? `R$ ${game.won}` : "R$ 0"}
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