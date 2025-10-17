#!/bin/bash
# Script para configurar DNS no WSL2
# Execute sempre que iniciar o WSL após reiniciar

echo "🔧 Configurando DNS do WSL2..."
sudo chattr -i /etc/resolv.conf 2>/dev/null || true
echo -e "nameserver 8.8.8.8\nnameserver 8.8.4.4" | sudo tee /etc/resolv.conf > /dev/null
echo "✅ DNS configurado com sucesso!"
echo ""
echo "Testando conectividade..."
if ping -c 1 google.com >/dev/null 2>&1; then
    echo "✅ Conectividade OK!"
else
    echo "❌ Problema de conectividade. Tente reiniciar o WSL."
fi
