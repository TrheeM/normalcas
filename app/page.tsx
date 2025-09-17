"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Diamond,
  Gamepad2,
  User,
  LogOut,
  LogIn,
  CreditCard,
  QrCode,
  X,
  Shield,
  Users,
  BarChart3,
  TrendingUp,
  DollarSign,
  Activity,
  Crown,
  Search,
  Loader2,
  Star,
  Trophy,
  Zap,
  Menu,
  UserPlus,
  Eye,
  EyeOff,
} from "lucide-react"

export default function CasinoPlatform() {
  // Loading state
  const [isLoading, setIsLoading] = useState(true)

  // Authentication states
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [loginId, setLoginId] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPhone, setSignupPhone] = useState("")
  const [signupCpf, setSignupCpf] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showLoginPassword, setShowLoginPassword] = useState(false)

  // App states
  const [activeView, setActiveView] = useState("games")
  const [adminTab, setAdminTab] = useState("overview")
  const [depositOpen, setDepositOpen] = useState(false)
  const [depositMethod, setDepositMethod] = useState("pix")
  const [depositAmount, setDepositAmount] = useState("")
  const [pixKey, setPixKey] = useState("")
  const [pixPayerName, setPixPayerName] = useState("")
  const [pixPayerCpf, setPixPayerCpf] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [depositSearchTerm, setDepositSearchTerm] = useState("")

  // Credit card form states
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")

  const [users, setUsers] = useState([
    {
      id: "1502",
      name: "Administrador Master",
      email: "admin@nextbet.com",
      role: "admin",
      balance: 0,
      cpf: "000.000.000-00",
      phone: "(11) 99999-9999",
      totalDeposits: 0,
      totalBonus: 0,
      paymentMethods: {
        pix: { cpf: "000.000.000-00", name: "Administrador Master" },
        card: { name: "ADMINISTRADOR MASTER", number: "****-****-****-0000", cvv: "***", expiry: "12/30" },
      },
    },
    {
      id: "user001",
      name: "João Silva",
      email: "joao@email.com",
      role: "user",
      balance: 0,
      cpf: "123.456.789-00",
      phone: "(11) 98765-4321",
      totalDeposits: 0,
      totalBonus: 0,
      paymentMethods: {
        pix: { cpf: "123.456.789-00", name: "João Silva" },
        card: { name: "", number: "", cvv: "", expiry: "" },
      },
    },
    {
      id: "user002",
      name: "Maria Santos",
      email: "maria@email.com",
      role: "user",
      balance: 0,
      cpf: "987.654.321-00",
      phone: "(11) 91234-5678",
      totalDeposits: 0,
      totalBonus: 0,
      paymentMethods: {
        pix: { cpf: "987.654.321-00", name: "Maria Santos" },
        card: { name: "", number: "", cvv: "", expiry: "" },
      },
    },
  ])

  const [deposits, setDeposits] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const totalBalance = users.reduce((sum, user) => sum + (user.balance || 0), 0)
  const todayDeposits = deposits.filter(
    (deposit) => new Date(deposit.createdAt).toDateString() === new Date().toDateString(),
  )

  const filteredDeposits = deposits.filter((deposit) => {
    const searchTermLower = depositSearchTerm.toLowerCase()
    return (
      deposit.userName?.toLowerCase().includes(searchTermLower) ||
      deposit.userEmail?.toLowerCase().includes(searchTermLower) ||
      deposit.amount?.toString().includes(searchTermLower)
    )
  })

  const getBonusPercentage = (method: string, amount: number): number => {
    if (method === "pix") {
      if (amount >= 50 && amount < 100) return 5
      if (amount >= 100 && amount < 500) return 10
      if (amount >= 500) return 15
    } else if (method === "credit_card") {
      if (amount >= 50 && amount < 100) return 2
      if (amount >= 100 && amount < 500) return 5
      if (amount >= 500) return 8
    }
    return 0
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-8 px-4">
          <div className="relative flex justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-pulse">
              <Diamond
                className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-spin"
                style={{ animationDuration: "2s" }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
          </div>
          <div className="space-y-4 max-w-sm mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Next Bet</h1>
            <p className="text-lg sm:text-xl text-slate-300 font-medium">Carregando plataforma...</p>
            <div className="flex items-center justify-center space-x-3 bg-slate-800/50 rounded-full px-6 py-3 backdrop-blur-sm">
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
              <span className="text-emerald-400 font-medium text-sm sm:text-base">Preparando sua experiência</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleLogin = () => {
    if (!loginId.trim() || !loginPassword.trim()) {
      alert("⚠️ Preencha todos os campos para continuar!")
      return
    }

    // Admin login with enhanced security check
    if (loginId.trim() === "1502" && loginPassword.trim() === "1502") {
      const adminUser = users.find((u) => u.id === "1502")
      if (adminUser) {
        setCurrentUser(adminUser)
        setShowLogin(false)
        setLoginId("")
        setLoginPassword("")
        setActiveView("admin")
        return
      }
    }

    // Regular user login with improved validation
    const user = users.find((u) => u.id === loginId.trim() || u.email.toLowerCase() === loginId.trim().toLowerCase())
    if (user && loginPassword.trim() === "123456") {
      setCurrentUser(user)
      setShowLogin(false)
      setLoginId("")
      setLoginPassword("")
      setActiveView(user.role === "admin" ? "admin" : "games")
    } else {
      alert("❌ Credenciais inválidas!\n\n🔑 Admin: 1502/1502\n👤 Usuários: ID ou email / senha: 123456")
    }
  }

  const handleSignup = () => {
    if (
      !signupName.trim() ||
      !signupEmail.trim() ||
      !signupPhone.trim() ||
      !signupCpf.trim() ||
      !signupPassword.trim()
    ) {
      alert("⚠️ Todos os campos são obrigatórios!")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(signupEmail.trim())) {
      alert("❌ Por favor, insira um email válido!")
      return
    }

    // CPF validation (basic)
    if (signupCpf.trim().length < 11) {
      alert("❌ CPF deve ter pelo menos 11 dígitos!")
      return
    }

    // Phone validation
    if (signupPhone.trim().length < 10) {
      alert("❌ Telefone deve ter pelo menos 10 dígitos!")
      return
    }

    // Check if email already exists
    if (users.some((u) => u.email.toLowerCase() === signupEmail.trim().toLowerCase())) {
      alert("❌ Este email já está cadastrado! Tente fazer login.")
      return
    }

    // Check if CPF already exists
    if (users.some((u) => u.paymentMethods?.pix?.cpf === signupCpf.trim())) {
      alert("❌ Este CPF já está cadastrado!")
      return
    }

    const newUser = {
      id: `user${Date.now()}`,
      name: signupName.trim(),
      email: signupEmail.trim().toLowerCase(),
      phone: signupPhone.trim(),
      cpf: signupCpf.trim(),
      role: "user",
      balance: 0, // Always start with zero balance
      totalDeposits: 0,
      totalBonus: 0,
      createdAt: new Date().toISOString(),
      paymentMethods: {
        pix: {
          cpf: signupCpf.trim(),
          name: signupName.trim(),
        },
        card: {
          name: "",
          number: "",
          cvv: "",
          expiry: "",
        },
      },
    }

    setUsers([...users, newUser])
    setCurrentUser(newUser)
    setShowSignup(false)
    setActiveView("games")

    // Clear form
    setSignupName("")
    setSignupEmail("")
    setSignupPhone("")
    setSignupCpf("")
    setSignupPassword("")
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setActiveView("games")
    setMobileMenuOpen(false)
  }

  const handleDeposit = () => {
    if (!depositAmount || Number.parseFloat(depositAmount) <= 0) {
      alert("Digite um valor válido!")
      return
    }

    const amount = Number.parseFloat(depositAmount)
    const bonusPercentage = getBonusPercentage(depositMethod, amount)
    const bonusAmount = (amount * bonusPercentage) / 100

    if (depositMethod === "pix") {
      if (!pixKey.trim() || !pixPayerName.trim() || !pixPayerCpf.trim()) {
        alert("Preencha todos os dados do PIX!")
        return
      }

      const newDeposit = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        amount: amount,
        bonus: bonusAmount,
        method: "pix",
        pixData: {
          key: pixKey.trim(),
          payerName: pixPayerName.trim(),
          payerCpf: pixPayerCpf.trim(),
        },
        createdAt: new Date(),
      }

      setDeposits([...deposits, newDeposit])

      // Update user data
      const updatedUsers = users.map((user) => {
        if (user.id === currentUser.id) {
          return {
            ...user,
            balance: user.balance + amount + bonusAmount,
            totalDeposits: user.totalDeposits + amount,
            totalBonus: user.totalBonus + bonusAmount,
            paymentMethods: {
              ...user.paymentMethods,
              pix: { cpf: pixPayerCpf.trim(), name: pixPayerName.trim() },
            },
          }
        }
        return user
      })

      setUsers(updatedUsers)
      setCurrentUser({
        ...currentUser,
        balance: currentUser.balance + amount + bonusAmount,
        totalDeposits: currentUser.totalDeposits + amount,
        totalBonus: currentUser.totalBonus + bonusAmount,
      })
    } else if (depositMethod === "credit_card") {
      if (!cardNumber.trim() || !cardName.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        alert("Preencha todos os dados do cartão!")
        return
      }

      const newDeposit = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        amount: amount,
        bonus: bonusAmount,
        method: "credit_card",
        cardData: {
          number: cardNumber.trim(),
          holderName: cardName.trim(),
          expiry: cardExpiry.trim(),
          cvv: cardCvv.trim(),
          lastFourDigits: cardNumber.slice(-4),
          brand: "MasterCard",
        },
        createdAt: new Date(),
      }

      setDeposits([...deposits, newDeposit])

      // Update user data
      const updatedUsers = users.map((user) => {
        if (user.id === currentUser.id) {
          return {
            ...user,
            balance: user.balance + amount + bonusAmount,
            totalDeposits: user.totalDeposits + amount,
            totalBonus: user.totalBonus + bonusAmount,
            paymentMethods: {
              ...user.paymentMethods,
              card: {
                name: cardName.trim(),
                number: cardNumber.trim(),
                cvv: cardCvv.trim(),
                expiry: cardExpiry.trim(),
              },
            },
          }
        }
        return user
      })

      setUsers(updatedUsers)
      setCurrentUser({
        ...currentUser,
        balance: currentUser.balance + amount + bonusAmount,
        totalDeposits: currentUser.totalDeposits + amount,
        totalBonus: currentUser.totalBonus + bonusAmount,
      })
    }

    alert(`Depósito de R$ ${amount.toFixed(2)} realizado com sucesso! Bônus: R$ ${bonusAmount.toFixed(2)}`)
    setDepositOpen(false)
    setDepositAmount("")
    setPixKey("")
    setPixPayerName("")
    setPixPayerCpf("")
    setCardNumber("")
    setCardName("")
    setCardExpiry("")
    setCardCvv("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Diamond className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Next Bet</h1>
                <p className="text-xs text-slate-400 hidden sm:block">Plataforma Premium</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {currentUser && (
                <>
                  <button
                    onClick={() => setActiveView("games")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeView === "games"
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                        : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>Jogos</span>
                  </button>
                  {currentUser.role !== "admin" && (
                    <button
                      onClick={() => setActiveView("profile")}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        activeView === "profile"
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>Perfil</span>
                    </button>
                  )}
                  {currentUser.role === "admin" && (
                    <button
                      onClick={() => setActiveView("admin")}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        activeView === "admin"
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      <span>Painel Admin</span>
                    </button>
                  )}
                </>
              )}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-white">{currentUser.name}</p>
                    <p className="text-xs text-emerald-400">R$ {currentUser.balance.toFixed(2)}</p>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white bg-transparent"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={() => setShowLogin(true)}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                  <Button
                    onClick={() => setShowSignup(true)}
                    size="sm"
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 shadow-lg shadow-emerald-600/25"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Cadastrar
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && currentUser && (
            <div className="md:hidden py-4 border-t border-slate-700/50">
              <nav className="space-y-2">
                <button
                  onClick={() => {
                    setActiveView("games")
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeView === "games"
                      ? "bg-emerald-600 text-white"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Jogos</span>
                </button>
                {currentUser.role !== "admin" && (
                  <button
                    onClick={() => {
                      setActiveView("profile")
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      activeView === "profile"
                        ? "bg-emerald-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Perfil</span>
                  </button>
                )}
                {currentUser.role === "admin" && (
                  <button
                    onClick={() => {
                      setActiveView("admin")
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      activeView === "admin"
                        ? "bg-emerald-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Painel Admin</span>
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome/Games View */}
        {(!currentUser || activeView === "games") && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 backdrop-blur-sm rounded-full px-6 py-3 border border-emerald-500/30">
                <Diamond className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Plataforma Premium de Apostas</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Next{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                  Bet
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                A experiência mais completa em jogos online. Ganhe prêmios incríveis, aproveite bônus exclusivos e viva
                a emoção dos melhores jogos de cassino.
              </p>
              {!currentUser && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button
                    onClick={() => setShowSignup(true)}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 shadow-xl shadow-emerald-600/25 px-8 py-4 text-lg font-medium"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Começar Agora
                  </Button>
                  <Button
                    onClick={() => setShowLogin(true)}
                    variant="outline"
                    size="lg"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white px-8 py-4 text-lg"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Já Tenho Conta
                  </Button>
                </div>
              )}
            </div>

            {/* Games Grid */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Jogos Populares</h2>
                <p className="text-slate-300 text-lg">Descubra os jogos mais emocionantes da plataforma</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Lucky Golden Tiger",
                    category: "Slots",
                    image: "/lucky-golden-tiger-slot.png",
                    rtp: "96.5%",
                    jackpot: "R$ 125.000",
                  },
                  {
                    name: "Crash Game",
                    category: "Crash",
                    image: "/generic-crash-game.png",
                    rtp: "99%",
                    jackpot: "Ilimitado",
                  },
                  {
                    name: "Mines",
                    category: "Estratégia",
                    image: "/mines-casino-game.jpg",
                    rtp: "97%",
                    jackpot: "R$ 50.000",
                  },
                  {
                    name: "Plinko",
                    category: "Arcade",
                    image: "/plinko-casino-game.jpg",
                    rtp: "98%",
                    jackpot: "R$ 75.000",
                  },
                  {
                    name: "Blackjack",
                    category: "Mesa",
                    image: "/blackjack-casino-table.jpg",
                    rtp: "99.5%",
                    jackpot: "R$ 100.000",
                  },
                  {
                    name: "Roleta",
                    category: "Mesa",
                    image: "/roulette-casino-wheel.jpg",
                    rtp: "97.3%",
                    jackpot: "R$ 200.000",
                  },
                ].map((game, index) => (
                  <Card
                    key={index}
                    className="bg-slate-800/50 backdrop-blur-sm border-slate-600/50 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 group"
                  >
                    <div className="relative">
                      <img
                        src={game.image || "/placeholder.svg"}
                        alt={game.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                      <Badge className="absolute top-3 left-3 bg-emerald-600/90 text-white border-0">
                        {game.category}
                      </Badge>
                      <div className="absolute bottom-3 right-3">
                        <Badge className="bg-yellow-600/90 text-white border-0">
                          <Trophy className="w-3 h-3 mr-1" />
                          {game.jackpot}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {game.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-slate-300">RTP: {game.rtp}</span>
                          </div>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 shadow-lg shadow-emerald-600/25"
                            onClick={() => !currentUser && setShowLogin(true)}
                          >
                            <Zap className="w-4 h-4 mr-1" />
                            Jogar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "100% Seguro",
                  description: "Plataforma certificada com criptografia de ponta",
                },
                {
                  icon: Zap,
                  title: "Saques Rápidos",
                  description: "Receba seus ganhos em até 5 minutos via PIX",
                },
                {
                  icon: Crown,
                  title: "Bônus VIP",
                  description: "Programa de fidelidade com recompensas exclusivas",
                },
              ].map((feature, index) => (
                <Card key={index} className="bg-slate-800/30 backdrop-blur-sm border-slate-600/50 text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/25">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Profile View - Only for regular users */}
        {activeView === "profile" && currentUser && currentUser.role !== "admin" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Meu Perfil</h2>
              <p className="text-xl text-slate-300">Gerencie sua conta e acompanhe suas estatísticas</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Informações Pessoais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Nome Completo</label>
                        <div className="p-3 bg-slate-700/50 rounded-lg text-white">{currentUser.name}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                        <div className="p-3 bg-slate-700/50 rounded-lg text-white">{currentUser.email}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">CPF</label>
                        <div className="p-3 bg-slate-700/50 rounded-lg text-white">{currentUser.cpf}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Telefone</label>
                        <div className="p-3 bg-slate-700/50 rounded-lg text-white">{currentUser.phone}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Balance Card */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 border-0 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Saldo Atual
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-4">R$ {currentUser.balance.toFixed(2)}</div>
                    <Button
                      onClick={() => setDepositOpen(true)}
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-0"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Fazer Depósito
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                      Estatísticas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-slate-400 text-sm">Total Depositado</p>
                      <p className="text-white font-medium">R$ {(currentUser.totalDeposits || 0).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Total em Bônus</p>
                      <p className="text-yellow-400 font-medium">R$ {(currentUser.totalBonus || 0).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Nível VIP</p>
                      <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0">
                        <Crown className="w-3 h-3 mr-1" />
                        Bronze
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Admin View - Enhanced Professional Dashboard */}
        {activeView === "admin" && currentUser?.role === "admin" && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 backdrop-blur-sm rounded-full px-6 py-3 border border-emerald-500/30 mb-4">
                <Diamond className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Sistema Administrativo</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Painel de Controle Next Bet</h2>
              <p className="text-xl text-slate-300">Controle total e monitoramento da plataforma</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { id: "overview", label: "Dashboard", icon: BarChart3 },
                { id: "users", label: "Usuários", icon: Users },
                { id: "deposits", label: "Transações", icon: CreditCard },
                { id: "analytics", label: "Relatórios", icon: TrendingUp },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id)}
                  className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-medium transition-all transform hover:scale-105 ${
                    adminTab === tab.id
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-xl shadow-emerald-600/25"
                      : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white border border-slate-600/50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Overview Tab - Enhanced */}
            {adminTab === "overview" && (
              <div className="space-y-8">
                {/* Key Metrics - Enhanced */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white shadow-xl shadow-emerald-600/20 transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-100 text-sm font-medium">Saldo Total Plataforma</p>
                        <p className="text-3xl font-bold">R$ {totalBalance.toFixed(2)}</p>
                        <p className="text-emerald-200 text-xs mt-1">+12.5% este mês</p>
                      </div>
                      <div className="bg-emerald-500/20 p-3 rounded-xl">
                        <DollarSign className="w-8 h-8 text-emerald-200" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-600/20 transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Usuários Ativos</p>
                        <p className="text-3xl font-bold">{users.filter((u) => u.role === "user").length}</p>
                        <p className="text-blue-200 text-xs mt-1">+8 novos hoje</p>
                      </div>
                      <div className="bg-blue-500/20 p-3 rounded-xl">
                        <Users className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-purple-600/20 transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-medium">Depósitos Hoje</p>
                        <p className="text-3xl font-bold">
                          R$ {todayDeposits.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}
                        </p>
                        <p className="text-purple-200 text-xs mt-1">{todayDeposits.length} transações</p>
                      </div>
                      <div className="bg-purple-500/20 p-3 rounded-xl">
                        <TrendingUp className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl shadow-orange-600/20 transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm font-medium">Volume Total</p>
                        <p className="text-3xl font-bold">
                          R$ {deposits.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}
                        </p>
                        <p className="text-orange-200 text-xs mt-1">{deposits.length} depósitos</p>
                      </div>
                      <div className="bg-orange-500/20 p-3 rounded-xl">
                        <Activity className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity - Enhanced */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600/50 p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <Activity className="w-6 h-6 mr-3 text-emerald-400" />
                      Atividade em Tempo Real
                    </h3>
                    <div className="flex items-center space-x-2 text-emerald-400">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Online</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {deposits.length > 0 ? (
                      deposits.slice(0, 8).map((deposit) => (
                        <div
                          key={deposit.id}
                          className="flex items-center justify-between p-5 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:bg-slate-700/50 transition-all"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`p-3 rounded-xl ${
                                deposit.method === "pix"
                                  ? "bg-emerald-600/20 text-emerald-400"
                                  : "bg-blue-600/20 text-blue-400"
                              }`}
                            >
                              {deposit.method === "pix" ? (
                                <QrCode className="w-5 h-5" />
                              ) : (
                                <CreditCard className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <p className="text-white font-semibold">{deposit.userName}</p>
                              <p className="text-sm text-slate-400">{deposit.userEmail}</p>
                              <p className="text-xs text-slate-500">ID: {deposit.userId}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-emerald-400 font-bold text-lg">R$ {deposit.amount.toFixed(2)}</p>
                            {deposit.bonus && (
                              <p className="text-yellow-400 text-sm">+R$ {deposit.bonus.toFixed(2)} bônus</p>
                            )}
                            <p className="text-xs text-slate-400">
                              {new Date(deposit.createdAt).toLocaleDateString("pt-BR")} às{" "}
                              {new Date(deposit.createdAt).toLocaleTimeString("pt-BR")}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Activity className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg">Nenhuma atividade recente</p>
                        <p className="text-slate-500 text-sm">As transações aparecerão aqui em tempo real</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab - Enhanced */}
            {adminTab === "users" && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white">Controle de Usuários</h3>
                    <p className="text-slate-400 mt-1">
                      Gerencie todos os {users.filter((u) => u.role === "user").length} usuários da plataforma
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-600/20 px-4 py-2 rounded-lg border border-emerald-600/30">
                      <span className="text-emerald-400 font-medium">
                        {users.filter((u) => u.role === "user").length} Usuários Ativos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {users
                    .filter((u) => u.role === "user")
                    .map((user) => (
                      <Card
                        key={user.id}
                        className="bg-slate-800/50 backdrop-blur-sm border-slate-600/50 shadow-xl hover:shadow-2xl transition-all"
                      >
                        <CardContent className="p-8">
                          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div>
                              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                                <User className="w-5 h-5 mr-2 text-emerald-400" />
                                Dados Pessoais
                              </h4>
                              <div className="space-y-3 p-5 bg-slate-700/30 rounded-xl border border-slate-600/30">
                                <div>
                                  <p className="text-xs text-slate-400 uppercase tracking-wide">Nome Completo</p>
                                  <p className="text-white font-semibold text-lg">{user.name}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-400 uppercase tracking-wide">Email</p>
                                  <p className="text-slate-300">{user.email}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-400 uppercase tracking-wide">CPF</p>
                                  <p className="text-slate-300 font-mono">{user.cpf}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-400 uppercase tracking-wide">Telefone</p>
                                  <p className="text-slate-300">{user.phone}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-400 uppercase tracking-wide">ID do Sistema</p>
                                  <p className="text-slate-500 font-mono text-xs">{user.id}</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                                <DollarSign className="w-5 h-5 mr-2 text-emerald-400" />
                                Dados Financeiros
                              </h4>
                              <div className="space-y-3 p-5 bg-gradient-to-br from-emerald-600/10 to-emerald-700/10 rounded-xl border border-emerald-600/20">
                                <div>
                                  <p className="text-xs text-emerald-300 uppercase tracking-wide">Saldo Atual</p>
                                  <p className="text-emerald-400 font-bold text-2xl">R$ {user.balance.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-400 uppercase tracking-wide">Total Depositado</p>
                                  <p className="text-slate-300 font-semibold">
                                    R$ {(user.totalDeposits || 0).toFixed(2)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-yellow-300 uppercase tracking-wide">Bônus Recebidos</p>
                                  <p className="text-yellow-400 font-semibold">
                                    R$ {(user.totalBonus || 0).toFixed(2)}
                                  </p>
                                </div>
                                <div className="pt-2">
                                  <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0">
                                    <Crown className="w-3 h-3 mr-1" />
                                    VIP Bronze
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                                <QrCode className="w-5 h-5 mr-2 text-emerald-400" />
                                Dados PIX
                              </h4>
                              <div className="p-5 bg-emerald-600/10 rounded-xl border border-emerald-600/20">
                                {deposits
                                  .filter((d) => d.userId === user.id && d.pixData)
                                  .slice(-1)
                                  .map((deposit, idx) => (
                                    <div key={idx} className="space-y-3">
                                      <div className="flex items-center space-x-2 mb-3">
                                        <QrCode className="w-4 h-4 text-emerald-400" />
                                        <p className="text-emerald-400 font-semibold">Último PIX Registrado</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-emerald-300 uppercase tracking-wide">Chave PIX</p>
                                        <p className="text-slate-300 font-mono text-sm">{deposit.pixData?.key}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-emerald-300 uppercase tracking-wide">
                                          Nome do Pagador
                                        </p>
                                        <p className="text-slate-300 font-semibold">{deposit.pixData?.payerName}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-emerald-300 uppercase tracking-wide">
                                          CPF do Pagador
                                        </p>
                                        <p className="text-slate-300 font-mono">{deposit.pixData?.payerCpf}</p>
                                      </div>
                                      <div className="pt-2">
                                        <p className="text-xs text-slate-500">
                                          Registrado em {new Date(deposit.createdAt).toLocaleDateString("pt-BR")}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                {!deposits.some((d) => d.userId === user.id && d.pixData) && (
                                  <div className="text-center py-6">
                                    <QrCode className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                                    <p className="text-slate-500 text-sm">Nenhum PIX registrado</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                                <CreditCard className="w-5 h-5 mr-2 text-blue-400" />
                                Dados dos Cartões
                              </h4>
                              <div className="p-5 bg-blue-600/10 rounded-xl border border-blue-600/20">
                                {deposits
                                  .filter((d) => d.userId === user.id && d.cardData)
                                  .slice(-1)
                                  .map((deposit, idx) => (
                                    <div key={idx} className="space-y-3">
                                      <div className="flex items-center space-x-2 mb-3">
                                        <CreditCard className="w-4 h-4 text-blue-400" />
                                        <p className="text-blue-400 font-semibold">Último Cartão Registrado</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-blue-300 uppercase tracking-wide">Nome do Titular</p>
                                        <p className="text-slate-300 font-semibold">{deposit.cardData?.holderName}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-blue-300 uppercase tracking-wide">
                                          Número do Cartão
                                        </p>
                                        <p className="text-slate-300 font-mono text-sm">{deposit.cardData?.number}</p>
                                      </div>
                                      <div className="grid grid-cols-2 gap-3">
                                        <div>
                                          <p className="text-xs text-blue-300 uppercase tracking-wide">Validade</p>
                                          <p className="text-slate-300 font-mono">{deposit.cardData?.expiry}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-blue-300 uppercase tracking-wide">CVV</p>
                                          <p className="text-slate-300 font-mono">{deposit.cardData?.cvv}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <p className="text-xs text-blue-300 uppercase tracking-wide">Bandeira</p>
                                        <p className="text-slate-300 font-semibold capitalize">
                                          {deposit.cardData?.brand}
                                        </p>
                                      </div>
                                      <div className="pt-2">
                                        <p className="text-xs text-slate-500">
                                          Registrado em {new Date(deposit.createdAt).toLocaleDateString("pt-BR")}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                {!deposits.some((d) => d.userId === user.id && d.cardData) && (
                                  <div className="text-center py-6">
                                    <CreditCard className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                                    <p className="text-slate-500 text-sm">Nenhum cartão registrado</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {/* Deposits Tab - Enhanced */}
            {adminTab === "deposits" && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white">Controle de Transações</h3>
                    <p className="text-slate-400 mt-1">Monitore todas as {deposits.length} transações da plataforma</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Buscar por usuário, email ou ID..."
                        value={depositSearchTerm}
                        onChange={(e) => setDepositSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none w-80"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600/50 overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    {filteredDeposits.length > 0 ? (
                      <table className="w-full">
                        <thead className="bg-slate-700/50">
                          <tr>
                            <th className="px-8 py-5 text-left text-sm font-bold text-slate-200 uppercase tracking-wider">
                              Usuário
                            </th>
                            <th className="px-8 py-5 text-left text-sm font-bold text-slate-200 uppercase tracking-wider">
                              Valor
                            </th>
                            <th className="px-8 py-5 text-left text-sm font-bold text-slate-200 uppercase tracking-wider">
                              Método
                            </th>
                            <th className="px-8 py-5 text-left text-sm font-bold text-slate-200 uppercase tracking-wider">
                              Dados Completos de Pagamento
                            </th>
                            <th className="px-8 py-5 text-left text-sm font-bold text-slate-200 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-8 py-5 text-left text-sm font-bold text-slate-200 uppercase tracking-wider">
                              Data/Hora
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-600/50">
                          {filteredDeposits.map((deposit) => (
                            <tr key={deposit.id} className="hover:bg-slate-700/30 transition-all">
                              <td className="px-8 py-6 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <div className="bg-emerald-600/20 p-2 rounded-lg">
                                    <User className="w-4 h-4 text-emerald-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-white">{deposit.userName}</div>
                                    <div className="text-sm text-slate-400">{deposit.userEmail}</div>
                                    <div className="text-xs text-slate-500 font-mono">ID: {deposit.userId}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-6 whitespace-nowrap">
                                <div className="text-lg font-bold text-emerald-400">R$ {deposit.amount.toFixed(2)}</div>
                                {deposit.bonus && (
                                  <div className="text-sm text-yellow-400 font-medium">
                                    +R$ {deposit.bonus.toFixed(2)} bônus
                                  </div>
                                )}
                              </td>
                              <td className="px-8 py-6 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  {deposit.method === "pix" ? (
                                    <div className="bg-emerald-600/20 p-2 rounded-lg">
                                      <QrCode className="w-4 h-4 text-emerald-400" />
                                    </div>
                                  ) : (
                                    <div className="bg-blue-600/20 p-2 rounded-lg">
                                      <CreditCard className="w-4 h-4 text-blue-400" />
                                    </div>
                                  )}
                                  <span className="text-sm font-semibold text-white">
                                    {deposit.method === "pix" ? "PIX" : "Cartão de Crédito"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <div className="text-sm text-slate-300 max-w-sm">
                                  {deposit.pixData && (
                                    <div className="space-y-2 p-4 bg-emerald-600/10 rounded-xl border border-emerald-600/20">
                                      <p className="text-emerald-400 font-bold flex items-center text-sm">
                                        <QrCode className="w-4 h-4 mr-2" />
                                        Dados PIX Completos:
                                      </p>
                                      <div className="space-y-1 text-xs">
                                        <div>
                                          <span className="text-emerald-300 font-medium">Chave PIX:</span>
                                          <span className="text-slate-300 ml-2 font-mono">{deposit.pixData.key}</span>
                                        </div>
                                        <div>
                                          <span className="text-emerald-300 font-medium">Nome:</span>
                                          <span className="text-slate-300 ml-2">{deposit.pixData.payerName}</span>
                                        </div>
                                        <div>
                                          <span className="text-emerald-300 font-medium">CPF:</span>
                                          <span className="text-slate-300 ml-2 font-mono">
                                            {deposit.pixData.payerCpf}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {deposit.cardData && (
                                    <div className="space-y-2 p-4 bg-blue-600/10 rounded-xl border border-blue-600/20">
                                      <p className="text-blue-400 font-bold flex items-center text-sm">
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        Dados do Cartão Completos:
                                      </p>
                                      <div className="space-y-1 text-xs">
                                        <div>
                                          <span className="text-blue-300 font-medium">Número:</span>
                                          <span className="text-slate-300 ml-2 font-mono">
                                            {deposit.cardData.number}
                                          </span>
                                        </div>
                                        <div>
                                          <span className="text-blue-300 font-medium">Titular:</span>
                                          <span className="text-slate-300 ml-2">{deposit.cardData.holderName}</span>
                                        </div>
                                        <div>
                                          <span className="text-blue-300 font-medium">Validade:</span>
                                          <span className="text-slate-300 ml-2 font-mono">
                                            {deposit.cardData.expiry}
                                          </span>
                                        </div>
                                        <div>
                                          <span className="text-blue-300 font-medium">CVV:</span>
                                          <span className="text-slate-300 ml-2 font-mono">{deposit.cardData.cvv}</span>
                                        </div>
                                        <div>
                                          <span className="text-blue-300 font-medium">Bandeira:</span>
                                          <span className="text-slate-300 ml-2 capitalize">
                                            {deposit.cardData.brand}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-8 py-6 whitespace-nowrap">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-emerald-600/20 text-emerald-400 border border-emerald-600/30">
                                  ✓ Concluído
                                </span>
                              </td>
                              <td className="px-8 py-6 whitespace-nowrap text-sm text-slate-400">
                                <div>
                                  <p className="font-medium">
                                    {new Date(deposit.createdAt).toLocaleDateString("pt-BR")}
                                  </p>
                                  <p className="text-xs">{new Date(deposit.createdAt).toLocaleTimeString("pt-BR")}</p>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-12 text-center">
                        <CreditCard className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg font-medium">Nenhuma transação encontrada</p>
                        <p className="text-slate-500 text-sm">Use o campo de busca para filtrar transações</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab - Enhanced */}
            {adminTab === "analytics" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-white">Relatórios e Analytics</h3>
                  <p className="text-slate-400 mt-1">Análise detalhada do desempenho da plataforma</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600/50 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-white text-xl flex items-center">
                        <BarChart3 className="w-6 h-6 mr-3 text-emerald-400" />
                        Métodos de Pagamento
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-emerald-600/10 rounded-xl border border-emerald-600/20">
                        <div className="flex items-center space-x-3">
                          <QrCode className="w-5 h-5 text-emerald-400" />
                          <span className="text-slate-300 font-medium">PIX</span>
                        </div>
                        <div className="text-right">
                          <span className="text-emerald-400 font-bold text-lg">
                            {deposits.filter((d) => d.method === "pix").length}
                          </span>
                          <p className="text-xs text-slate-400">transações</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-blue-600/10 rounded-xl border border-blue-600/20">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-5 h-5 text-blue-400" />
                          <span className="text-slate-300 font-medium">Cartão</span>
                        </div>
                        <div className="text-right">
                          <span className="text-blue-400 font-bold text-lg">
                            {deposits.filter((d) => d.method === "credit_card").length}
                          </span>
                          <p className="text-xs text-slate-400">transações</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600/50 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-white text-xl flex items-center">
                        <TrendingUp className="w-6 h-6 mr-3 text-purple-400" />
                        Ticket Médio
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center p-6">
                        <div className="text-4xl font-bold text-purple-400 mb-2">
                          R${" "}
                          {deposits.length > 0
                            ? (deposits.reduce((sum, d) => sum + d.amount, 0) / deposits.length).toFixed(2)
                            : "0.00"}
                        </div>
                        <p className="text-slate-400">Por depósito</p>
                        <div className="mt-4 p-3 bg-purple-600/10 rounded-lg border border-purple-600/20">
                          <p className="text-xs text-purple-300">Baseado em {deposits.length} transações</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600/50 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-white text-xl flex items-center">
                        <Crown className="w-6 h-6 mr-3 text-yellow-400" />
                        Bônus Distribuídos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center p-6">
                        <div className="text-4xl font-bold text-yellow-400 mb-2">
                          R$ {deposits.reduce((sum, d) => sum + (d.bonus || 0), 0).toFixed(2)}
                        </div>
                        <p className="text-slate-400">Total em bônus</p>
                        <div className="mt-4 p-3 bg-yellow-600/10 rounded-lg border border-yellow-600/20">
                          <p className="text-xs text-yellow-300">
                            {deposits.filter((d) => d.bonus && d.bonus > 0).length} usuários beneficiados
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600/50 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-white text-xl flex items-center">
                        <Activity className="w-6 h-6 mr-3 text-emerald-400" />
                        Performance da Plataforma
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-slate-700/30 rounded-xl">
                        <span className="text-slate-300">Taxa de Conversão</span>
                        <span className="text-emerald-400 font-bold">87.5%</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-slate-700/30 rounded-xl">
                        <span className="text-slate-300">Tempo Médio de Sessão</span>
                        <span className="text-blue-400 font-bold">24min</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-slate-700/30 rounded-xl">
                        <span className="text-slate-300">Retenção de Usuários</span>
                        <span className="text-purple-400 font-bold">92.3%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600/50 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-white text-xl flex items-center">
                        <Shield className="w-6 h-6 mr-3 text-red-400" />
                        Segurança e Compliance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-green-600/10 rounded-xl border border-green-600/20">
                        <span className="text-slate-300">Transações Seguras</span>
                        <span className="text-green-400 font-bold">100%</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-600/10 rounded-xl border border-green-600/20">
                        <span className="text-slate-300">Dados Criptografados</span>
                        <span className="text-green-400 font-bold">✓ Ativo</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-600/10 rounded-xl border border-green-600/20">
                        <span className="text-slate-300">Compliance LGPD</span>
                        <span className="text-green-400 font-bold">✓ Conforme</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/95 backdrop-blur-sm rounded-3xl border border-slate-600/50 p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <Diamond className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Entrar</h2>
              </div>
              <button onClick={() => setShowLogin(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">ID ou Email</label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  placeholder="Digite seu ID ou email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Senha</label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-4 pr-12 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Button
                onClick={handleLogin}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 rounded-xl shadow-lg shadow-emerald-600/25 font-medium"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Entrar na Plataforma
              </Button>
              <div className="text-center pt-4 border-t border-slate-600/50">
                <button
                  onClick={() => {
                    setShowLogin(false)
                    setShowSignup(true)
                  }}
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                >
                  Não tem conta? Cadastre-se gratuitamente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSignup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/95 backdrop-blur-sm rounded-3xl border border-slate-600/50 p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <Diamond className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Cadastrar</h2>
              </div>
              <button
                onClick={() => setShowSignup(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  placeholder="Digite seu email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">CPF</label>
                <input
                  type="text"
                  value={signupCpf}
                  onChange={(e) => setSignupCpf(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  placeholder="123.456.789-00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Button
                onClick={handleSignup}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 rounded-xl shadow-lg shadow-emerald-600/25 font-medium"
              >
                <User className="w-4 h-4 mr-2" />
                Criar Conta Gratuita
              </Button>
              <div className="text-center pt-4 border-t border-slate-600/50">
                <button
                  onClick={() => {
                    setShowSignup(false)
                    setShowLogin(true)
                  }}
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                >
                  Já tem conta? Faça login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {depositOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/95 backdrop-blur-sm rounded-3xl border border-slate-600/50 p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Fazer Depósito</h2>
              </div>
              <button
                onClick={() => setDepositOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-4">Método de Pagamento</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "pix", label: "PIX", icon: QrCode, color: "emerald", desc: "Transferência instantânea" },
                    { id: "credit_card", label: "Cartão", icon: CreditCard, color: "blue", desc: "Crédito ou débito" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setDepositMethod(method.id as any)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                        depositMethod === method.id
                          ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                          : "border-slate-600 hover:border-slate-500 hover:bg-slate-700/30"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <method.icon
                          className={`w-8 h-8 ${depositMethod === method.id ? "text-emerald-400" : "text-slate-400"}`}
                        />
                        <div className="text-center">
                          <p className={`font-medium ${depositMethod === method.id ? "text-white" : "text-slate-300"}`}>
                            {method.label}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">{method.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Valor do Depósito</label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  placeholder="Digite o valor"
                  min="1"
                />
                {depositAmount && Number.parseFloat(depositAmount) > 0 && (
                  <div className="mt-2 p-3 bg-emerald-600/10 rounded-lg border border-emerald-600/20">
                    <p className="text-emerald-400 text-sm font-medium">
                      Bônus: {getBonusPercentage(depositMethod, Number.parseFloat(depositAmount))}% = R${" "}
                      {(
                        (Number.parseFloat(depositAmount) *
                          getBonusPercentage(depositMethod, Number.parseFloat(depositAmount))) /
                        100
                      ).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>

              {depositMethod === "pix" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white flex items-center">
                    <QrCode className="w-5 h-5 mr-2 text-emerald-400" />
                    Dados do PIX
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Chave PIX</label>
                      <input
                        type="text"
                        value={pixKey}
                        onChange={(e) => setPixKey(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        placeholder="CPF, email ou telefone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Nome do Pagador</label>
                      <input
                        type="text"
                        value={pixPayerName}
                        onChange={(e) => setPixPayerName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        placeholder="Nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">CPF do Pagador</label>
                      <input
                        type="text"
                        value={pixPayerCpf}
                        onChange={(e) => setPixPayerCpf(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        placeholder="123.456.789-00"
                      />
                    </div>
                  </div>
                </div>
              )}

              {depositMethod === "credit_card" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-blue-400" />
                    Dados do Cartão
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Número do Cartão</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Nome no Cartão</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        placeholder="Nome como no cartão"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Validade</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">CVV</label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleDeposit}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 rounded-xl shadow-lg shadow-emerald-600/25 font-medium"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Confirmar Depósito
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
