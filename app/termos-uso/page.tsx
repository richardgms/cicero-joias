import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

export const metadata = {
    title: "Termos de Uso | Cícero Joias",
    description: "Termos de uso e condições de serviço da Cícero Joias.",
};

export default function TermosUsoPage() {
    return (
        <Section tone="light" spacing="lg">
            <Container size="md">
                <h1 className="font-heading text-4xl font-bold text-text-primary mb-8">Termos de Uso</h1>

                <div className="space-y-6 font-sans text-text-secondary leading-relaxed [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text-primary [&_h2]:mt-8 [&_h2]:mb-3">
                    <p className="font-numeric">Última atualização: 12/02/2026</p>

                    <p>
                        Bem-vindo à Cícero Joias. Ao acessar nosso site, você concorda com estes termos de serviço,
                        todas as leis e regulamentos aplicáveis, e concorda que é responsável pelo cumprimento de
                        todas as leis locais aplicáveis.
                    </p>

                    <h2>1. Uso de Licença</h2>
                    <p>
                        É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software)
                        no site da Cícero Joias, apenas para visualização transitória pessoal e não comercial.
                    </p>

                    <h2>2. Isenção de responsabilidade</h2>
                    <p>
                        Os materiais no site da Cícero Joias são fornecidos &quot;como estão&quot;. Cícero Joias não oferece garantias,
                        expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo,
                        sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico
                        ou não violação de propriedade intelectual ou outra violação de direitos.
                    </p>

                    <h2>3. Limitações</h2>
                    <p>
                        Em nenhum caso a Cícero Joias ou seus fornecedores serão responsáveis por quaisquer danos
                        (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios)
                        decorrentes do uso ou da incapacidade de usar os materiais em Cícero Joias, mesmo que Cícero Joias
                        ou um representante autorizado da Cícero Joias tenha sido notificado oralmente ou por escrito da
                        possibilidade de tais danos.
                    </p>

                    <h2>4. Precisão dos materiais</h2>
                    <p>
                        Os materiais exibidos no site da Cícero Joias podem incluir erros técnicos, tipográficos ou fotográficos.
                        Cícero Joias não garante que qualquer material em seu site seja preciso, completo ou atual.
                        Cícero Joias pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio.
                    </p>
                </div>
            </Container>
        </Section>
    );
}
