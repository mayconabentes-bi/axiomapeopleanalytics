import React, { Component, ErrorInfo, ReactNode } from "react";
import { BotaoAxioma } from "../AxiomaKit";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary Axioma: Captura falhas críticas e convida à recalibração.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Aqui poderíamos enviar para um serviço de logs de elite
    // console.error("Axioma Exception:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-10 text-center">
          <div className="mb-12">
            <div className="w-24 h-24 border border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <span className="text-[#D4AF37] font-serif text-5xl">!</span>
            </div>
            <span className="text-[#D4AF37] font-sans text-xs uppercase tracking-[0.5em] mb-4 block">Inconsistência Axiomática Detetada</span>
            <h1 className="font-serif text-5xl text-white mb-6">Ponto de Inflexão Inesperado</h1>
            <p className="text-zinc-500 max-w-md mx-auto font-sans italic">
              "A complexidade de 2030 exige resiliência. Ocorreu uma divergência nos fluxos de dados, mas o seu progresso estratégico permanece seguro."
            </p>
          </div>
          
          <BotaoAxioma variant="gold" onClick={() => window.location.reload()}>
            Recalibrar Vetor de Produtividade
          </BotaoAxioma>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
