import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata = {
    title: "Política de Privacidade | Cícero Joias",
    description: "Política de privacidade e proteção de dados da Cícero Joias.",
};

export default function PoliticaPrivacidadePage() {
    return (
        <>
            <Header />
            <main className="flex-1 bg-antique-white pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-philosopher text-4xl mb-8 text-esmeralda-dark">Política de Privacidade</h1>

                    <div className="prose prose-stone max-w-none text-gray-700 font-montserrat">
                        <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

                        <p>
                            A sua privacidade é importante para nós. É política da Cícero Joias respeitar a sua privacidade
                            em relação a qualquer informação sua que possamos coletar no site Cícero Joias, e outros sites que possuímos e operamos.
                        </p>

                        <h3>1. Coleta de Informações</h3>
                        <p>
                            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço.
                            Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.
                            Também informamos por que estamos coletando e como será usado.
                        </p>

                        <h3>2. Retenção de Dados</h3>
                        <p>
                            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado.
                            Quando armazenamos dados, protegem-nos dentro de meios comercialmente aceitáveis para evitar perdas e roubos,
                            bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                        </p>

                        <h3>3. Compartilhamento de Dados</h3>
                        <p>
                            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                        </p>

                        <h3>4. Cookies</h3>
                        <p>
                            Nosso site usa cookies para melhorar a experiência do usuário. Ao continuar navegando, você concorda com o uso de cookies.
                        </p>

                        <h3>5. Compromisso do Usuário</h3>
                        <p>
                            O usuário se compromete a fazer uso adequado dos conteúdos e da informação que a Cícero Joias oferece no site e com caráter enunciativo, mas não limitativo:
                        </p>
                        <ul>
                            <li>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
                            <li>B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
                            <li>C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) da Cícero Joias, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
