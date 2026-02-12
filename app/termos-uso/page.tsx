import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata = {
    title: "Termos de Uso | Cícero Joias",
    description: "Termos de uso e condições de serviço da Cícero Joias.",
};

export default function TermosUsoPage() {
    return (
        <>
            <Header />
            <main className="flex-1 bg-antique-white pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-philosopher text-4xl mb-8 text-esmeralda-dark">Termos de Uso</h1>

                    <div className="prose prose-stone max-w-none text-gray-700 font-montserrat">
                        <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

                        <p>
                            Bem-vindo à Cícero Joias. Ao acessar nosso site, você concorda com estes termos de serviço,
                            todas as leis e regulamentos aplicáveis, e concorda que é responsável pelo cumprimento de
                            todas as leis locais aplicáveis.
                        </p>

                        <h3>1. Uso de Licença</h3>
                        <p>
                            É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software)
                            no site da Cícero Joias, apenas para visualização transitória pessoal e não comercial.
                        </p>

                        <h3>2. Isenção de responsabilidade</h3>
                        <p>
                            Os materiais no site da Cícero Joias são fornecidos &quot;como estão&quot;. Cícero Joias não oferece garantias,
                            expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo,
                            sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico
                            ou não violação de propriedade intelectual ou outra violação de direitos.
                        </p>

                        <h3>3. Limitações</h3>
                        <p>
                            Em nenhum caso a Cícero Joias ou seus fornecedores serão responsáveis por quaisquer danos
                            (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios)
                            decorrentes do uso ou da incapacidade de usar os materiais em Cícero Joias, mesmo que Cícero Joias
                            ou um representante autorizado da Cícero Joias tenha sido notificado oralmente ou por escrito da
                            possibilidade de tais danos.
                        </p>

                        <h3>4. Precisão dos materiais</h3>
                        <p>
                            Os materiais exibidos no site da Cícero Joias podem incluir erros técnicos, tipográficos ou fotográficos.
                            Cícero Joias não garante que qualquer material em seu site seja preciso, completo ou atual.
                            Cícero Joias pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
