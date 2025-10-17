#!/bin/bash
# Script para corrigir problemas de DNS no WSL2

echo "🔧 Corrigindo DNS do WSL2 para Supabase..."
echo ""

# Backup do resolv.conf atual
echo "📋 Fazendo backup do resolv.conf..."
sudo cp /etc/resolv.conf /etc/resolv.conf.backup

# Remover proteção de escrita
sudo chattr -i /etc/resolv.conf 2>/dev/null || true

# Configurar DNS público do Google
echo "🌐 Configurando DNS do Google (8.8.8.8)..."
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf > /dev/null
echo "nameserver 8.8.4.4" | sudo tee -a /etc/resolv.conf > /dev/null

# Testar resolução
echo ""
echo "✅ Testando resolução DNS..."
if getent ahosts db.uyevoypwaauwytxkhuob.supabase.co | grep -v ":" | head -1; then
    echo ""
    echo "🎉 DNS configurado com sucesso!"
    echo ""
    echo "⚠️  IMPORTANTE: Esta configuração é temporária!"
    echo "   Para tornar permanente, crie o arquivo /etc/wsl.conf com:"
    echo ""
    echo "   [network]"
    echo "   generateResolvConf = false"
    echo ""
    echo "   Depois, reinicie o WSL com: wsl --shutdown"
else
    echo ""
    echo "❌ Ainda há problemas com DNS. Tente:"
    echo "   1. Reiniciar WSL: wsl --shutdown (no PowerShell)"
    echo "   2. Verificar firewall do Windows"
    echo "   3. Usar VPN se estiver conectado"
fi
