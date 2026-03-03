#!/bin/bash

# Configurações
SERVER_IP="192.168.68.59"
SERVER_USER="homeserver"
SERVER_PASS="kiwifree0("
REMOTE_PATH="/home/homeserver/projects/securefill-ai"

echo "🚀 Iniciando deploy do SecureFill AI..."

# 1. Build da aplicação
echo "📦 Gerando build standalone..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build. Abortando deploy."
    exit 1
fi

# 2. Verificação do sshpass
if ! command -v sshpass &> /dev/null; then
    echo "⚠️  sshpass não encontrado. Por favor, instale com: sudo apt install sshpass"
    exit 1
fi

# 3. Preparação remota
echo "📂 Criando diretórios no servidor..."
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "mkdir -p $REMOTE_PATH"

# 4. Transferência de arquivos
echo "📤 Transferindo servidor standalone..."
# Usando o ponto (.) para copiar arquivos ocultos e normais
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no -r .next/standalone/. "$SERVER_USER@$SERVER_IP:$REMOTE_PATH/"

echo "📤 Transferindo arquivos estáticos..."
# O Next.js standalone precisa que .next/static e public estejam na raiz do projeto
# mas no standalone a pasta .next já foi copiada pelo comando acima (contendo server/)
# Precisamos garantir que .next/static e public estejam lá
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "mkdir -p $REMOTE_PATH/.next/static"
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no -r .next/static/* "$SERVER_USER@$SERVER_IP:$REMOTE_PATH/.next/static/"
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no -r public "$SERVER_USER@$SERVER_IP:$REMOTE_PATH/"

# 5. Reinicialização do PM2
echo "🔄 Reiniciando aplicação com PM2..."
NVM_BIN="/home/homeserver/.nvm/versions/node/v22.22.0/bin"

sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "export PATH=$NVM_BIN:\$PATH && cd $REMOTE_PATH && pm2 delete securefill-ai || true && PORT=3000 pm2 start server.js --name securefill-ai"

echo "✅ Deploy concluído com sucesso!"
echo "🔗 Acesse em: http://$SERVER_IP:3000"
